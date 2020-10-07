export default {
  mounted() {
  },
  methods: {
    onClick(runner) {
      for (var i in this.$refs) {
        this.$refs[i].remove();
      }
      this.$refs[runner].render();
    },
    // checkAssetsPasswordInfo () {
    //   if (this.GLOBAL.AssetsPasswordInfo.uid === undefined) {
    //     this.GLOBAL.getAssetsPasswordState().then((res) => {
    //       this.GLOBAL.AssetsPasswordInfo = res.data
    //       this.oC2cTradingInfo = this.GLOBAL.AssetsPasswordInfo
    //     })
    //   } else {
    //     this.oC2cTradingInfo = this.GLOBAL.AssetsPasswordInfo
    //   }
    // }
  }
};
