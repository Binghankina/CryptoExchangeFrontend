<template lang="html">
  <Content class="aboutus-page-auto">
    <div class="auto-box">
      <div class="top-div">
        <p>{{$t('aboutus.aboutus')}}</p>
      </div>
      <div class="bottom-div">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('aboutus.aboutus')" name="aboutus">
            <p class="title">{{$t('aboutus.aboutGIH')}}</p>
            <p class="desc">{{$t('message.aboutus.aboutGIH')}}</p>
            <p class="title">{{$t('aboutus.features')}}</p>
            <div class="features-list">
              <div class="features-item">
                <i class="el-icon-coin"></i>
                <p class="title-p">{{$t('message.aboutus.p1')}}</p>
                <p class="desc-p">{{$t('message.aboutus.p1_1')}}</p>
              </div>
              <div class="features-item">
                <i class="el-icon-cpu"></i>
                <p class="title-p">{{$t('message.aboutus.p2')}}</p>
                <p class="desc-p">{{$t('message.aboutus.p2_1')}}</p>
              </div>
              <div class="features-item">
                <i class="el-icon-chat-dot-square"></i>
                <p class="title-p">{{$t('message.aboutus.p3')}}</p>
                <p class="desc-p">{{$t('message.aboutus.p3_1')}}</p>
              </div>
              <div class="features-item">
                <i class="el-icon-guide"></i>
                <p class="title-p">{{$t('message.aboutus.p4')}}</p>
                <p class="desc-p">{{$t('message.aboutus.p4_1')}}</p>
              </div>
              <div class="features-item">
                <i class="el-icon-star-off"></i>
                <p class="title-p">{{$t('message.aboutus.p5')}}</p>
                <p class="desc-p">{{$t('message.aboutus.p5_1')}}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('aboutus.privacy')" name="user_privacy">
            <p class="title">{{$t('aboutus.privacy_statement')}}</p>
            <div class="desc-div">
              <p>{{$t('message.user_privacy.t1')}}</p>
              <p>{{$t('message.user_privacy.p1')}}</p>
              <p>{{$t('message.user_privacy.p1_1')}}</p>
              <p>{{$t('message.user_privacy.p1_2')}}</p>
              <p>{{$t('message.user_privacy.p2')}}</p>
              <p>{{$t('message.user_privacy.p2_1')}}</p>
              <p>{{$t('message.user_privacy.p2_2')}}</p>
              <p>{{$t('message.user_privacy.p3')}}</p>
              <p>{{$t('message.user_privacy.p3_1')}}</p>
              <p>{{$t('message.user_privacy.p3_2')}}</p>
              <p>{{$t('message.user_privacy.p3_3')}}</p>
              <p>{{$t('message.user_privacy.p3_4')}}</p>
              <p>{{$t('message.user_privacy.p3_5')}}</p>
              <p>{{$t('message.user_privacy.p4')}}</p>
              <p>{{$t('message.user_privacy.p4_1')}}</p>
              <p>{{$t('message.user_privacy.p5')}}</p>
              <p>{{$t('message.user_privacy.p5_1')}}</p>
              <p>{{$t('message.user_privacy.p6')}}</p>
              <p>{{$t('message.user_privacy.p6_1')}}</p>
              <p>{{$t('message.user_privacy.p6_2')}}</p>
              <p>{{$t('message.user_privacy.p6_3')}}</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import { Tabs, TabPane } from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)
export default {
  data() {
    return {
      activeName: 'aboutus'
    }
  },
  methods: {
    handleClick(tab, event) {
      window.console.log(tab, event)
    }
  },
  mounted () {
    $('body,html').animate({scrollTop: 0}, 500)
  }
}
</script>

<style lang="sass">
  .aboutus-page-auto
    position: relative
    width: 100%
    min-height: 100%
    .top-div
      height: 260px
      background-image: url('../assets/img/announcement-background.jpg')
      background-repeat: no-repeat
      background-size: auto 100%
      background-position: center center
      p
        font-size: 36px
        text-align: center
        color: #fff
        line-height: 260px
    .bottom-div
      padding-bottom: 80px
      .el-tabs__nav-scroll
        text-align: center
      .el-tabs__item
        color: #fff
      .el-tabs__item.is-active
        color: #0095D8
      .el-tabs__nav
        float: none
        padding: 10px 0
      .el-tabs__active-bar
        background-color: transparent
      .title
        font-size: 26px
        text-align: center
        font-weight: bold
        margin-top: 30px
      .desc
        font-size: 14px
        margin-top: 20px
        padding: 0 100px
        text-indent: 2em
        line-height: 24px
      .desc-div
        font-size: 14px
        margin-top: 20px
        padding: 0 100px
        text-indent: 2em
        line-height: 24px
      .features-list
        display: flex
        flex-wrap: wrap
        justify-content: center
        .features-item
          width: 30%
          text-align: center
          line-height: 2
          margin-top: 40px
          i
            font-size: 50px
          .title-p
            font-size: 14px
            margin-top: 20px
          .desc-p
            font-size: 12px
</style>
