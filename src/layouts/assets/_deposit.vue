<template>
  <div class="assets-deposit">
    <div class="assets-form">
      <div class="address-box">
        <label class="address-label" v-text="$t('assets.deposit.deposit_address')"/>
        <div class="address-form">
          <input type="text" :value="deposit_address" readonly>
          <a @click="copyAddress()" v-text="$t('assets.deposit.copy')"/>
          <a
            @click="qrcode_show = true"
            v-click-outside:mousedown.capture="showQRCode"
            v-click-outside.capture="showQRCode"
          >
            <span v-text="$t('assets.deposit.qr_code')"/>
            <div class="show-qrcode" :class="{ active: qrcode_show }">
              <qrcode :value="deposit_address" :size="110" level="L" background="transparent"/>
            </div>
          </a>
        </div>
      </div>
      <a
        class="block-address"
        v-if="currencyArray.type === 'coin'"
        :href="currencyArray.explorer_address.replace('#{address}', deposit_address)"
        target="_blank"
      >{{$t('assets.deposit.browser')}}</a>
    </div>
    <div class="assets-note">
      <h3 v-text="$t('assets.instructions')"/>
      <i18n
        tag="p"
        class="desc"
        path="assets.deposit.note"
        :places="{ currency: currencyArray.id.toUpperCase(), min_deposit_amount: currencyArray.min_deposit_amount, min_confirmations: currencyArray.min_confirmations }"
      >
        <br>
      </i18n>
    </div>
  </div>
</template>

<script>
import { runMessage } from "@/helpers";
import qrcode from "@/components/qrcode";

export default {
  props: ["deposit_address", "currencyArray"],
  data: () => ({
    qrcode_show: false
  }),
  methods: {
    copyAddress() {
      var el = document.createElement("textarea");
      el.value = this.deposit_address;
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      runMessage("success", "Copy success");
    },
    showQRCode() {
      this.qrcode_show = false;
    }
  },
  components: {
    qrcode
  }
};
</script>