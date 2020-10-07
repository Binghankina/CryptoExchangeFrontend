<template>
  <div id="depth_chart" v-show="showing" v-resize="onResize"/>
</template>

<script>
import {
  isAskSymbol,
  isBidSymbol,
  amountPrecision,
  pricePrecision
} from "@/helpers";
import colors from "@/colors";
import Highcharts from "highcharts";
import Boost from "highcharts/modules/boost";
import resize from "vue-resize-directive";

Boost(Highcharts);

export default {
  props: ["showing"],
  data() {
    return {
      ready: true,
      chart: null
    };
  },
  directives: {
    resize
  },
  beforeDestroy() {
    this.ready = false;
  },
  mounted() {
    window.Highcharts = Highcharts;
    this.$EventBus.$on("UpdateDepth", payload => {
      if (this.ready) {
        this.updateDepth(payload.bids, payload.asks);
      }
      return;
    });
    this.chart = Highcharts.chart(this.$el, {
      chart: {
        type: "area",
        backgroundColor: "transparent"
      },

      boost: {
        enabled: true,
        useGPUTranslations: true
      },

      title: {
        text: ""
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: true
      },

      xAxis: {
        tickLength: 5,
        minPadding: 0,
        maxPadding: 0,
        labels: {
          style: { color: "#fff" },
          formatter() {
            return this.value.toFixed(pricePrecision());
          }
        }
      },

      yAxis: [
        {
          labels: {
            enabled: true,
            align: "right",
            zIndex: 7,
            x: -10,
            style: { color: "#fff" }
          },
          gridLineColor: "transparent",
          gridLineDashStyle: "Solid",
          tickLength: 5,
          title: {
            text: ""
          }
        }
      ],

      plotOptions: {
        area: {
          fillOpacity: 0.2,
          lineWidth: 1
        },
        series: {
          softThreshold: true,
          marker: { radius: 0 },
          states: {
            hover: {
              enabled: true,
              strokeWidth: 0.1
            },
            inactive: {
              opacity: 1
            }
          },
          threshold: null
        }
      },

      tooltip: {
        enabled: true,
        useHTML: true,
        shared: true,
        borderRadius: 0,
        borderWidth: 0,
        valueDecimals: 2,
        borderColor: "#000000",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        headerFormat: "<div>",
        footerFormat: "</div>"
      },

      series: [
        {
          name: "Buy orders",
          type: "area",
          color: colors["up-color"],
          strokeWidth: 0.1,
          animation: {
            duration: 100
          },
          tooltip: {
            pointFormat: `
              <div>
                <span>Price:</span>
                <span style="text-align: right;">{point.x} <span style="font-weight: bold;">${isBidSymbol().toUpperCase()}</span></span>
              </div>
              <div>
                <span>Buy orders:</span>
                <span style="text-align: right;">{point.y}</span>
              </div>`
          }
        },
        {
          name: "Sell orders",
          type: "area",
          animation: {
            duration: 100
          },
          color: colors["down-color"],
          strokeWidth: 0.1,
          tooltip: {
            pointFormat: `
              <p>
                <span>Price:</span>
                <span style="text-align: right;">{point.x} <span style="font-weight: bold;">${isBidSymbol().toUpperCase()}</span></span>
              </p>
              <p>
                <span>Sell orders:</span>
                <span style="text-align: right;">{point.y}</span>
              </p>`
          }
        }
      ]
    });
  },
  methods: {
    onResize() {
      this.chart.setSize($(this.$el).width()), $(this.$el).height() * 0.92;
    },
    updateDepth(bids, asks) {
      let data_asks = [];
      let data_bids = [];
      let volume = 0;
      asks.forEach(ask => {
        volume += ask[1] * 1;
        data_asks.push([ask[0] * 1, volume]);
      });
      volume = 0;
      bids.forEach(bid => {
        volume += bid[1] * 1;
        data_bids.push([bid[0] * 1, volume]);
      });
      data_bids.sort((a, b) => a[0] - b[0]);
      data_asks.sort((a, b) => a[0] - b[0]);
      this.chart.series[0].setData(data_bids, false);
      this.chart.series[1].setData(data_asks, false);
      this.chart.redraw();
    }
  }
};
</script>
