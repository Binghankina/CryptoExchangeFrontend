<template lang="html">
  <div class="announcement-body">
    <div class="top-div">
      <img @click="clickCloseImg" src="@/assets/img/m/back.png" alt="">
      <span>公告中心</span>
    </div>
    <div v-show="bShowAnnouncementList" class="announcement-list-div">
      <p class="title-p">公告列表</p>
      <ul>
        <li @click="clickAnnouncementLi">
          <p>关于平台系统升级部分功能及展示啊啊啊啊啊啊</p>
          <p>2019-09-19</p>
        </li>
        <li @click="clickAnnouncementLi">
          <p>关于果链关于果链关于果链关于果链关</p>
          <p>2019-09-19</p>
        </li>
        <li @click="clickAnnouncementLi">
          <p>关于果链关于果链关于果链关于果链关</p>
          <p>2019-09-19</p>
        </li>
      </ul>
    </div>
    <div v-show="!bShowAnnouncementList" class="announcement-detail">
      <p class="navigation-p">
        <router-link :to="{ name: '/m/', params: {} }">
          <span>首页</span>
        </router-link> >
        <span @click="bShowAnnouncementList = true">公告中心</span> >
        <span>title</span>
      </p>
      <p class="title-p">
        关于平台系统升级部分功能及展示受限通告
      </p>
      <p class="time-p">时间：2019-05-06 07:26:23</p>
      <div class="main-body-div">
        <p>尊敬的LEXB平台用户</p>
        <p>因平台系统升级部分功能及展示可能受限（如K线及成交不能完全展示）但不影响正常交易，敬请知悉</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      bShowAnnouncementList: false
    }
  },
  methods: {
    clickCloseImg () {
      this.$router.push({path: '/m/'})
    },
    clickAnnouncementLi () {
      this.bShowAnnouncementList = false
    }
  },
  mounted () {
    this.$emit('changeAppFooterStatus', false)
  }
}
</script>

<style lang="sass">
@function px2rem($px)
  $rem : 37.5px
  @return ($px / $rem) + rem
.announcement-body
  position: absolute
  min-height: 100vh
  background-color: #fff
  width: 100%
  color: #333
  .top-div
    position: relative
    text-align: center
    font-size: px2rem(20px)
    line-height: px2rem(50px)
    border-bottom: 1px solid #ccc
    img
      position: absolute
      top: px2rem(10px)
      left: px2rem(10px)
      width: px2rem(28px)
  .announcement-list-div
    padding: 0 px2rem(20px)
    .title-p
      font-size: px2rem(16px)
      padding: px2rem(15px) px2rem(10px)
      background-color: #f5f5f5
    li
      border-bottom: 1px solid #ddd
      list-style-type: none
      p
        overflow: hidden
        text-overflow: ellipsis
        font-size: px2rem(12px)
        white-space: nowrap
        display: inline-block
        color: #666
      p:first-child
        width: 68%
      p:last-child
        width: 28%
  .announcement-detail
    padding: 0 px2rem(20px)
    .navigation-p
      font-size: px2rem(12px)
      padding: px2rem(10px) 0
      span
        color: #115ae3
        padding: 0 px2rem(4px)
    .title-p
      font-size: px2rem(26px)
      line-height: px2rem(30px)
      font-weight: 600
    .time-p
      font-size: px2rem(14px)
      padding: px2rem(4px) 0 px2rem(16px) 0
    .main-body-div
      p
        font-size: px2rem(14px)
</style>
