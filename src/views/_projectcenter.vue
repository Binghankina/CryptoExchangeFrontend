<template lang="html">
  <Content class="projectcenter-page-auto">
    <div class="auto-box">
      <div class="top-body">
        <div class="banner">
          <p class="title">火币区块链项目展示中心</p>
          <p class="desc">公开、及时、透明</p>
          <div class="button-list-div">
            <el-button type="primary">申请入口</el-button>
            <el-button type="info">默认按钮</el-button>
          </div>
        </div>
        <div class="project-notice">
          <div class="section">
            <div class="col">
              <div class="hd">
                <p class="title">重要公告</p>
                <a href="#" class="more">更多</a>
              </div>
              <ul class="list">
                <li>
                  <a href="#">有关火币全球站执行部分通证“ST”的名单公告</a>
                  <span>2019-01-15 14:51</span>
                </li>
                <li>
                  <a href="#">有关火币全球站执行部分通证“ST”的名单公告</a>
                  <span>2019-01-15 14:51</span>
                </li>
                <li>
                  <a href="#">有关火币全球站执行部分通证“ST”的名单公告</a>
                  <span>2019-01-15 14:51</span>
                </li>
              </ul>
            </div>
            <div class="col">
              <div class="hd">
                <p class="title">项目动态</p>
                <a href="#" class="more">更多</a>
              </div>
              <ul class="list">
                <li>
                  <a href="#">有关火币全球站执行部分通证“ST”的名单公告</a>
                  <span>2019-01-15 14:51</span>
                </li>
                <li>
                  <a href="#">有关火币全球站执行部分通证“ST”的名单公告</a>
                  <span>2019-01-15 14:51</span>
                </li>
                <li>
                  <a href="#">有关火币全球站执行部分通证“ST”的名单公告</a>
                  <span>2019-01-15 14:51</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-body">
        <div class="opular-project">
          <p class="title">热门项目</p>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <img src="@/assets/img/btb.jpg" alt="">
                <div class="info-div">
                  <div class="project-title">
                    HT
                  </div>
                  <div class="desc">HT（火币全球通用积分）是基于区块链发行和管理的积分系统，为火币官方发行的唯一积分。</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <img src="@/assets/img/btb.jpg" alt="">
                <div class="info-div">
                  <div class="project-title">
                    HT
                  </div>
                  <div class="desc">HT（火币全球通用积分）是基于区块链发行和管理的积分系统，为火币官方发行的唯一积分。</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <img src="@/assets/img/btb.jpg" alt="">
                <div class="info-div">
                  <div class="project-title">
                    HT
                  </div>
                  <div class="desc">HT（火币全球通用积分）是基于区块链发行和管理的积分系统，为火币官方发行的唯一积分。</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="all-project">
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              label="全部项目"
              width="80">
              <template slot-scope="scope">
                <img class="img" src="@/assets/img/btb.jpg" alt="">
              </template>
            </el-table-column>
            <el-table-column
              label=""
              width="">
              <template slot-scope="scope">
                <span class="title">{{scope.row.info.name}}</span>
                <p class="desc">{{scope.row.info.desc}}</p>
                <template v-for="i in scope.row.info.labels">
                  <el-tag color="#fff" type="info">{{i}}</el-tag>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import { Card, Row, Col, Table, TableColumn, Tag, Button } from 'element-ui'
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Button)
export default {
  data () {
    return {
      tableData: [{
        img: '',
        info: {
          name: 'BAR',
          desc: ' Balance Accounted Receipt，简称BAR，中文意为分布式记录账本，是由新加坡数字商会基金会发行的完全去中心化的独立公链。BAR公链基于DPOS共识机制，完全不依靠任何人为管理，自动运行，公链上所有交易的资产/产品可以由任何人创建并交易。 ',
          labels: ['标签一', '标签二', '标签三']
        }
      }, {
        img: '',
        info: {
          name: 'VS',
          desc: ' VERSUSPK是一个开放的、可扩展的开发平台，允许并鼓励开发者开发各类链上游戏。VERSUSPK提供了完整的SDK，标准化的API和通用的数据传输协议。开发者可以快速、便捷地发行游戏，并实现交易、存储、宣发、传播等功能，极大地解决了游戏开发团队研发成本高、发行难、获客难、盈利难的问题。 ',
          labels: ['标签一', '标签二']
        }
      }, {
        img: '',
        info: {
          name: 'AO',
          desc: ' OW旨在开发出区块链顶端支付系统，打造一个分布式支付网络，用于支持多生态系统支付通证。该通证的愿景是拓展 OWpay的使用范围，远远超出加密数字资产的应用，在跨境支付、物联网支付、媒体支付等支付服务领域都有优质的支付服务和产品落地。 ',
          labels: ['标签一', '标签二']
        }
      }, {
        img: '',
        info: {
          name: 'DCC',
          desc: ' AurumOx通过采用DDPOS共识协议，结合市场上先进的开源Graphene方案和分片技术，在实际运行环境中TPS最高达到了39523，是目前DPOS公链的10倍多。AurumOx高速公链作为基于区块链4.0的资产交易协议，未来将打造涵盖“黄金稳定币(GGEC)+去中心化交易平台(GGE)+全球区块链银行(GBB)+全球房地产交易所(GREE）”的区块链全领域生态。 ',
          labels: ['标签一', '标签二']
        }
      }]
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      return 'row';
    }
  }
}
</script>

<style lang="sass">
  .projectcenter-page-auto
    // background-color: #f4f4f4
    min-width: 1200px
    .top-body
      .banner
        position: relative
        height: 280px
        background-color: #0E435B
        border-bottom: 1px solid #EBEEF5
        .title
          padding-top: 80px
          font-size: 34px
          text-align: center
          color: #fff
        .desc
          font-size: 24px
          text-align: center
          color: #6eafda
        .button-list-div
          position: absolute
          bottom: 40px
          left: 12%
          .el-button
            background: transparent
      .project-notice
        min-height: 133px
        // background-color: #003E5A
        text-align: center
        .section
          width: 1200px
          margin: 0 auto
          position: relative
          z-index: 3
          .col
            text-align: left
            float: left
            width: 540px
            .hd
              height: 34px
              line-height: 34px
              padding-top: 9px
              .title
                float: left
                color: #fff
              .more
                float: right
                font-size: 12px
                text-decoration: none
                color: #357ce1
                cursor: pointer
            .list
              max-height: 71px
              overflow: hidden
              list-style: none
              width: 540px
              li
                line-height: 24px
                height: 24px!important
                font-size: 12px
                a
                  color: #EBEEF5
                  display: inline-block
                  white-space: nowrap
                  overflow: hidden
                  -o-text-overflow: ellipsis
                  text-overflow: ellipsis
                  width: 400px
                  float: left
                a::before
                  content: ""
                  display: inline-block
                  width: 5px
                  height: 5px
                  border-radius: 5px
                  background-color: #357ce1
                  vertical-align: top
                  margin: 6px 7px 0 0
                span
                  float: right
                  color: #b0b8db
        .section:after
          display: block
          visibility: hidden
          height: 0
          clear: both
          content: ""
      .project-notice .col:last-child
          float: right
      .project-notice::before
        content: ""
        height: 56px
        display: inline-block
        border-left: 1px dashed #EBEEF5
        position: absolute
        margin-top: 44px
    .bottom-body
      padding: 0 24px
      background-color: #fff
      max-width: 1200px
      margin: 20px auto
      border-radius: 2px
      .opular-project
        padding: 20px 0
        background-color: #fff
        .title
          border-bottom: 1px solid #EBEEF5
          color: #222c38
          font-size: 18px
          padding: 12px 0 12px 2px
          line-height: 23px
          font-weight: bold
          margin-bottom: 12px
        .el-card__body
          overflow: hidden
          img
            width: 62px
            height: 62px
            float: left
          .info-div
            width: 260px
            float: right
            .project-title
              font-size: 18px
              font-weight: 400
              padding-bottom: 6px
            .desc
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              overflow: hidden
              color: #5a626d
              font-weight: 400
              max-height: 60px
              line-height: 20px
              font-size: 14px
      .all-project
        padding-bottom: 32px
      .el-table th>.cell
        color: #222c38
        font-size: 18px
        padding-left: 2px
        padding-right: 0
      .row
        .img
          width: 60px
          border-radius: 8px
        .title
          font-size: 18px
          font-weight: 400
        .desc
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          margin-top: 2px
        .el-tag
          margin-right: 4px
          height: 26px
          line-height: 24px
</style>
