import colors from "@/colors";
import Vue from "vue";
export const getOverrides = theme => {
  var themes = {
    light: {
      up: colors["up-color"],
      down: colors["down-color"],
      bg: colors["bg-card-color"],
      grid: "#f7f8fa",
      cross: "#23283D",
      border: "#9194a4",
      text: "#9194a4",
      areatop: "rgba(71, 78, 112, 0.1)",
      areadown: "rgba(71, 78, 112, 0.02)",
      line: "#737375"
    },
    night: {
      up: colors["up-color"],
      down: colors["down-color"],
      bg: colors["bg-card-color"],
      grid: "#272c48",
      cross: "#9194A3",
      border: "#4e5b85",
      text: colors["color-gray"],
      areatop: "rgba(122, 152, 247, .1)",
      areadown: "rgba(122, 152, 247, .02)",
      line: "#737375"
    }
  };
  console.log(Vue.prototype.ISPC)
  if (!Vue.prototype.ISPC) {
    themes.night.bg = "#0f0f10"
  }
  var t = themes[theme];
  return {
    volumePaneSize: "medium",
    "scalesProperties.lineColor": t.text,
    "scalesProperties.textColor": t.text,
    "paneProperties.background": t.bg,
    "paneProperties.vertGridProperties.color": t.grid,
    "paneProperties.horzGridProperties.color": t.grid,
    "paneProperties.crossHairProperties.color": t.cross,
    "paneProperties.legendProperties.showLegend": !t.showLegend,
    "paneProperties.legendProperties.showStudyArguments": !1,
    "paneProperties.legendProperties.showStudyTitles": !1,
    "paneProperties.legendProperties.showStudyValues": !1,
    "paneProperties.legendProperties.showSeriesTitle": !1,
    "paneProperties.legendProperties.showSeriesOHLC": !0,
    "mainSeriesProperties.candleStyle.upColor": t.up,
    "mainSeriesProperties.candleStyle.downColor": t.down,
    "mainSeriesProperties.candleStyle.drawWick": !1,
    "mainSeriesProperties.candleStyle.drawBorder": !1,
    "mainSeriesProperties.candleStyle.borderColor": t.border,
    "mainSeriesProperties.candleStyle.borderUpColor": t.up,
    "mainSeriesProperties.candleStyle.borderDownColor": t.down,
    "mainSeriesProperties.candleStyle.wickUpColor": t.up,
    "mainSeriesProperties.candleStyle.wickDownColor": t.down,
    "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !0,
    "mainSeriesProperties.hollowCandleStyle.upColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.downColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
    "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
    "mainSeriesProperties.hollowCandleStyle.borderColor": t.border,
    "mainSeriesProperties.hollowCandleStyle.borderUpColor": t.up,
    "mainSeriesProperties.hollowCandleStyle.borderDownColor": t.down,
    "mainSeriesProperties.hollowCandleStyle.wickColor": t.line,
    "mainSeriesProperties.haStyle.upColor": t.up,
    "mainSeriesProperties.haStyle.downColor": t.down,
    "mainSeriesProperties.haStyle.drawWick": !0,
    "mainSeriesProperties.haStyle.drawBorder": !0,
    "mainSeriesProperties.haStyle.borderColor": t.border,
    "mainSeriesProperties.haStyle.borderUpColor": t.up,
    "mainSeriesProperties.haStyle.borderDownColor": t.down,
    "mainSeriesProperties.haStyle.wickColor": t.border,
    "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.upColor": t.up,
    "mainSeriesProperties.barStyle.downColor": t.down,
    "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
    "mainSeriesProperties.barStyle.dontDrawOpen": !1,
    "mainSeriesProperties.lineStyle.color": t.border,
    "mainSeriesProperties.lineStyle.linewidth": 1,
    "mainSeriesProperties.lineStyle.priceSource": "close",
    "mainSeriesProperties.areaStyle.color1": t.areatop,
    "mainSeriesProperties.areaStyle.color2": t.areadown,
    "mainSeriesProperties.areaStyle.linecolor": t.border,
    "mainSeriesProperties.areaStyle.linewidth": 1,
    "mainSeriesProperties.areaStyle.priceSource": "close"
  };
};
