<template>
    <div id="tv_chart_container" v-show="showing" />
</template>

<script>
import CSSJSON from "@/assets/js/cssjson.js";
import night_theme from "@/assets/css/tradingview/night";
import {
  getOverrides,
  getStudiesOverrides,
  isBidSymbol,
  isAskSymbol
} from "@/helpers";
import Datafeed from './tradingview.js'

export default {
  props: ["showing"],
  data() {
    return {
      startInterval: null,
      widgetOptions: {
        debug: false,
        symbol: `${isAskSymbol().toUpperCase()}/${isBidSymbol().toUpperCase()}`,
        datafeed: Datafeed,
        interval: localStorage.getItem("tradingview.resolution") || "15",
        container_id: "tv_chart_container",
        library_path: "/charting_library/",
        locale: "en",
        timezone: "Asia/Shanghai",
        disabled_features: [
          "symbol_search_hot_key",
          "compare_symbol",
          "display_market_status",
          "go_to_date",
          "header_saveload",
          "header_chart_type",
          "header_compare",
          "header_indicators",
          "header_toolbar_save_load",
          "header_interval_dialog_button",
          "header_resolutions",
          "header_screenshot",
          "header_symbol_search",
          "header_undo_redo",
          "legend_context_menu",
          "show_hide_button_in_legend",
          "show_interval_dialog_on_key_press",
          "snapshot_trading_drawings",
          "symbol_info",
          "timeframes_toolbar",
          "use_localstorage_for_settings",
          "volume_force_overlay"
        ],
        // enabled_features: [
        //
        // ],
        charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        toolbar_bg: "transparent",
        fullscreen: false,
        autosize: true,
        studies_overrides: getStudiesOverrides(
          this.$store.state.exchange.theme
        ),
        overrides: getOverrides(this.$store.state.exchange.theme),
        loading_screen: {
          foregroundColor: "transparent"  //    加载图标颜色
        }
      },
      studies: [],
      tvWidget: null
    };
  },
  mounted() {
    this.checkTradingview();
    if (this.ISPC) {
      this.widgetOptions.enabled_features = [
        "dont_show_boolean_study_arguments",
        "hide_last_na_study_output",
        "move_logo_to_main_pane",
        //"side_toolbar_in_fullscreen_mode",
        //"keep_left_toolbar_visible_on_small_screens",
        "disable_resolution_rebuild"
      ]
    }
  },
  beforeDestroy() {
    if (this.tvWidget !== null && $(this.tvWidget._id).length) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
  methods: {
    checkTradingview() {
      this.startInterval = setInterval(() => {
        if (TradingView != null) {
          this.renderChart();
          this.stopInterval();
        }
      }, 100);
    },
    stopInterval() {
      clearInterval(this.startInterval);
    },
    renderChart() {
      let interval = localStorage.getItem("tradingview.resolution") || "15";
      let chartType =
        (localStorage.getItem("tradingview.chartType") || "1") * 1;
      const buttons = [
        { title: "Realtime", resolution: "1", chartType: 3 },
        { title: "1min", resolution: "1", chartType: 1 },
        { title: "5min", resolution: "5", chartType: 1 },
        { title: "15min", resolution: "15", chartType: 1 },
        { title: "30min", resolution: "30", chartType: 1 },
        { title: "1hour", resolution: "60", chartType: 1 },
        { title: "1day", resolution: "1D", chartType: 1 },
        { title: "1week", resolution: "1W", chartType: 1 }
      ];
      var tvWidget = (window.tvWidget = new TradingView.widget(this.widgetOptions));
      this.tvWidget = tvWidget;
      tvWidget.onChartReady(() => {
        if (!this.tvWidget) return;
        const iframe = $("#tv_chart_container iframe")[0];
        createButton(buttons);
        createStudy();
        tvWidget.chart().setChartType(chartType);
        toggleStudy(chartType);
        iframe.contentWindow.onOkay();
      });

      if (this.tvWidget) {
        const css = new CSSJSON().toCSS(night_theme);
        const ApplyStyle = () => {
          const changeStyle = $("#tv_chart_container iframe")[0].contentWindow
            .changeStyle;
          if (typeof changeStyle === "function") {
            changeStyle(css);
          } else {
            setTimeout(() => {
              ApplyStyle();
            }, 10);
          }
        };
        ApplyStyle();
      }

      this.$EventBus.$on("readyTradingView", () => {
        const iframe = $("#tv_chart_container iframe")[0];
        iframe.contentWindow.hideLoading();
      });
      this.$EventBus.$on("rendingChart", () => {
        const iframe = $("#tv_chart_container iframe")[0];
        iframe.contentWindow.showLoading();
      });
      const createButton = buttons => {
        for (const button of buttons) {
          tvWidget
            .createButton()
            .attr("title", button.title)
            .text(button.title)
            .on("click", function() {
              console.log(this.parentNode.className)
              if (this.parentNode.className.search("active") > -1) {
                return false;
              }
              localStorage.setItem("tradingview.resolution", button.resolution);
              localStorage.setItem("tradingview.chartType", button.chartType);
              tvWidget.chart().setResolution(button.resolution);
              const iframe = $("#tv_chart_container iframe")[0];
              iframe.contentWindow.FClass(); // remove active Class
              this.parentNode.className += " actived";
              console.log(1)
              if (button.chartType != tvWidget.chart().chartType()) {
                tvWidget.chart().setChartType(button.chartType);
                toggleStudy(button.chartType);
              }
            })
            .parent()
            .addClass(
              button.resolution === interval && button.chartType == chartType
                ? "actived"
                : ""
            );
        }
      };

      const createStudy = () => {
        var id = tvWidget
          .chart()
          .createStudy("Moving Average", false, false, [5], null, {
            "Plot.color": "rgb(150, 95, 196)"
          });
        this.studies.push(id);
        id = tvWidget
          .chart()
          .createStudy("Moving Average", false, false, [10], null, {
            "Plot.color": "rgb(132, 170, 213)"
          });
        this.studies.push(id);
        id = tvWidget
          .chart()
          .createStudy("Moving Average", false, false, [30], null, {
            "plot.color": "rgb(85, 178, 99)"
          });
        this.studies.push(id);
        id = tvWidget
          .chart()
          .createStudy("Moving Average", false, false, [60], null, {
            "plot.color": "rgb(183, 36, 138)"
          });
        this.studies.push(id);
      };

      const toggleStudy = chartType => {
        var state = chartType == 3 ? 0 : 1;
        for (var i = 0; i < this.studies.length; i++) {
          tvWidget
            .chart()
            .getStudyById(this.studies[i])
            .setVisible(state);
        }
      };
    }
  }
};
</script>

