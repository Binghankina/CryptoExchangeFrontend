<template>
  <Content class="page-home">
    <preview/>
    <!-- <feature-market class="container"/> -->
    <market-list class="container"/>
    <!-- <advantages class="container"/> -->
  </Content>
</template>

<script>
import _preview from "@/layouts/home/_preview.vue";
import _market_list from "@/layouts/home/_market_list.vue";
import _feature_market from "@/layouts/home/_feature_market.vue";
import _advantages from "@/layouts/home/_advantages.vue";

export default {
  components: {
    "preview": _preview,
    "market-list": _market_list,
    "feature-market": _feature_market,
    "advantages": _advantages
  },
  created() {
    if (localStorage.getItem("favorites") === null)
      localStorage.setItem("favorites", "");
  },
};
</script>
