<template>
  <div class="assets-withdraw">
    <div class="assets-form">
      <div class="form-row">
        <label class="form-label">{{ $t("assets.address") }}</label>
        <div class="form-control">
          <input type="text" autocomplete="off" v-model="address">
        </div>
      </div>
      <div class="form-row">
        <label class="form-label">
          {{ $t("assets.withdraw.amount") }}
          <p class="label-right">
            <span>
              {{ $t("assets.withdraw.available") }}
              <a
                href="javascript:;"
                v-text="balance"
                @click="amount = balance"
              />
            </span>
          </p>
        </label>
        <div class="form-control">
          <input type="text" autocomplete="off" maxlength="16" v-model="amount">
          <span class="form-tag" v-text="currencyArray.id.toUpperCase()"/>
        </div>
      </div>
      <div class="form-row-container">
        <div class="form-row">
          <label class="form-label">{{ $t("assets.withdraw.fee") }}</label>
          <div class="form-control">
            <input type="text" disabled :value="Number(currencyArray.withdraw_fee).toFixed(8)">
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">{{ $t("assets.withdraw.receive_amount") }}</label>
          <div class="form-control">
            <input
              type="text"
              disabled
              :value="Number((amount || 0) - currencyArray.withdraw_fee).toFixed(8)"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="assets-action">
      <div class="assets-note">
        <h3 v-text="$t('assets.instructions')"/>
        <i18n
          tag="p"
          class="desc"
          path="assets.withdraw.note"
          :places="{ currency: currencyArray.id.toUpperCase(), min_withdraw_amount: currencyArray.min_withdraw_amount }"
        >
          <br>
        </i18n>
      </div>
      <div class="action">
        <button
          type="submit"
          @click="onClick('modal')"
          :disabled="!address || amount <= 0 || amount > balance"
          v-text="$t('assets.withdraw.submit')"
        />
      </div>
    </div>
    <modal-withdraw :rid="address" :currency="currencyArray.id" ref="modal" :amount="amount"  />
  </div>
</template>

<script>
import _modal_withdraw from "@/components/assets/_modal_withdraw.vue";
import { inputOnlyNumber } from "@/helpers";
export default {
  props: ["currencyArray", "balance"],
  data: () => ({
    address: "",
    amount: "",
    otp: ""
  }),
  watch: {
    amount() {
      this.amount = inputOnlyNumber(this.amount, 8);
    }
  },
  methods: {
    onClick(runner) {
      for (var i in this.$refs) {
        this.$refs[i].remove();
      }
      this.$refs[runner].render();
    }
  },
  components: {
    "modal-withdraw": _modal_withdraw
  }
};
</script>