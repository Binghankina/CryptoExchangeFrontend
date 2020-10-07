<template>
   <div class="app">
      <div class="img">
        <img src="@/assets/img/logo.png">
      </div>
      <a target="_blank" href="https://s3.ap-east-1.amazonaws.com/www.gih.com/gih/GIH_v1.2.2.apk" class="icon">GIH APP 下载</a>
      <div class="text">
        <li>如使用微信,请在右上角点击在浏览器打开</li>
        <li>否则，将会被微信屏蔽</li>
      </div>
    </div>      
</template>

<script>
export default {
  data() {
    return this.$config.footer;
  }
};
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.app
  padding-top: 40%
  text-align: center
  min-height: 100vh
  font-size: px2rem(30px)
  background-color: #ffffff
  color: #333
  .text
    padding-top: px2rem(15px)
    font-size: px2rem(15px)
</style>
