import { translation } from "@/helpers";
import _AuthInput from "@/components/custom/_AuthInput.vue";
import _need_security from "@/layouts/account/_need_security.vue";
import qrcode from "@/components/qrcode";

export default {
  data: () => ({
    modal: {
      enabled: false,
      loading_button: false
    }
  }),
  methods: {
    render() {
      this.modal.enabled = true;
    },
    remove() {
      this.modal.enabled = false;
    },
    onChangeShow() {
      if (!this.modal.enabled) this.resetInput();
    },
    resetStep() {
      this.step = 1;
    },
    translation: (message, data = {}) => translation("modal." + message, data),
    changeModal(modal) {
      this.$emit("changeModal", modal);
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
  },
  components: {
    qrcode,
    "auth-input": _AuthInput,
    "need-security": _need_security
  }
};
