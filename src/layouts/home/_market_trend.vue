<template>
  <sparkline :indicatorStyles="false" height="30" width="168">
    <sparklineLine :data="getSparkline()" :limit="getSparkline().length" :styles="{ stroke: color }"/>
  </sparkline>
</template>

<script>
import colors from "@/colors";

export default {
  props: ['ticker', 'trend'],
  computed: {
    color() {
      return this.trend === 'text-up' ? colors["color-up"] : colors["color-down"];
    }
  },
  methods: {
    getSparkline() {
      return this.$store.state.public.sparklines[this.ticker];
    }
  }
};
</script>