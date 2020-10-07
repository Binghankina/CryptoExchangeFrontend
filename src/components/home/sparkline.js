export default {
  render(createElement) {
    return createElement(
      "div",
      {
        class: "svg-box",
        ref: "svg"
      },
      []
    );
  },
  props: ["data"],
  mounted() {
    $(this.$refs["svg"]).sparkline(this.data, {
      type: "line",
      width: "100%",
      height: "100%",
      spotRadius: "0",
      lineColor: "#2d3b5f",
      disableHighlight: true,
      disableInteraction: true,
      fillColor: "#202d4c",
      disableTooltips: true
    });
  }
};
