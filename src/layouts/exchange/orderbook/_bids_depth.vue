<template>
  <div
    style="position: absolute;width: 100%;top: 0;"
  >
    <p
      v-for="data in depthBids"
      :key="data[0]"
      class="order"
      v-bind:style="{ backgroundSize:  (getAmount(data[1]) / maxSum[side] * 100).toFixed(0) + '% 100%' }"
      @click="onRowClicked(side, data)"
    >
      <span class="text-left text-up" v-text="getPrice(data[0])" />
      <span class="text-right" v-text="getAmount(data[1])" />
      <span class="text-right" v-text="getVolume(data[1], data[0])" />
    </p>
  </div>
</template>

<script>
import Helpers from "./helpers";

export default {
  mixins: [Helpers],
  data: () => ({
    side: "bids"
  })
};
</script>