<template>
  <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type">
    <input
      @input="$emit('input', $event.target.value)"
      class="ivu-input ivu-input-default"
      :class="className"
      autocomplete="off"
      spellcheck="false"
      ref="input"
      :type="getType"
      :name="name"
      :maxlength="maxlength"
      @keypress="onlyNumberInput"
      :value="value"
      :disabled="disabled"
    >
    <label :class="labelClass" @click="onLabelClick" ref="label">
      {{ placeholder }}
      <span v-if="labelNeed" class="need">*</span>
      <span v-else class="optional">(optional)</span>
    </label>
    <div v-if="enableVaild" class="berror">{{ errorText }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: {
      type: String,
      required: false,
      default: ""
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    className: {
      type: Object,
      required: false
    },
    labelClass: {
      type: Object,
      required: false
    },
    placeholder: String,
    labelNeed: {
      type: Boolean,
      required: false,
      default: false
    },
    enableVaild: Boolean,
    errorText: String,
    maxlength: {
      required: false,
      default: false
    },
    disabled: {
      required: false,
      default: false
    }
  },
  computed: {
    getType() {
      const { type } = this;
      if (type === "number") {
        return "text";
      } else {
        return type;
      }
    }
  },
  methods: {
    onlyNumberInput($event) {
      if (this.type === "number") {
        const charCode = ($event.which) ? $event.which : $event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) return $event.preventDefault();
      }
    },
    addError(text) {
      this.$refs.input.classList.add("ierror");
      this.$refs.label.classList.add("berror");
    },
    removeError() {
      this.$refs.input.classList.remove("ierror");
      this.$refs.label.classList.remove("berror");
    },
    onLabelClick() {
      this.$nextTick(() => this.$refs.input.focus());
    },
    clear() {
      this.$refs.input.value = "";
    }
  }
};
</script>