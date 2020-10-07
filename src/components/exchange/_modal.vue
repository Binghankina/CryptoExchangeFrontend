<template>
  <div class="modal-exchange" :class="background">
    <div>
      <router-link class="ivu-btn" tag="button" type="button" to="/signin">{{ $t("header.login") }}</router-link>
      <router-link
        class="ivu-btn"
        tag="button"
        type="button"
        to="/signup"
      >{{ $t("header.register") }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["background"]
};
</script>