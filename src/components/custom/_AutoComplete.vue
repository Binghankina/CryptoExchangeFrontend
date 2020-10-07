<template>
  <div class="autocomplete" :class="[{ selected }, type]">
    <div class="mask" v-if="selected" @click="selected = !selected"/>
    <div class="select-con" @click="selected = !selected">
      <div class="con" >{{ show_value }}</div>
      <div class="more">
        <Icon type="md-arrow-dropdown" />
      </div>
    </div>
    <ul class="list">
      <li v-for="(data, index) in rows" :key="index" v-text="show_data(data)" @click="changeSelect(data)"/>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    "rows",
    "width",
    "default_value",
    "event",
    "type"
  ],
  data() {
    return {
      selected: false,
      value: this.default_value
    };
  },
  computed: {
    show_value() {
      if (this.value.type && this.value.type === "certificate") return this.value.name;
      if (this.event === "region" || this.event === "market") return this.value.name;
      else return this.value;
    }
  },
  methods: {
    show_data(data) {
      if (data.type && data.type === "certificate") return data.name;
      if (this.event === "region" || this.event === "market") return data.name;
      else return data;
    },
    changeSelect(data) {
      this.value = data;
      if (data.type && data.type === "certificate") {
        data = data.code;
      }
      this.$EventBus.$emit(this.event, data);
      this.selected = !this.selected;
    }
  }
};
</script>
