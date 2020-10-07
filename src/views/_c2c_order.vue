<template lang="html">
  <Content class="c2corder-page-auto">
    <div class="auto-box">
      <el-row :gutter="10">
        <el-col :span="4"  class="menu-list">
          <el-menu
            :default-active="sDefaultActive"
            @select="handleSelect"
            class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <span slot="title">我的卖单</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">我的买单</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">我的广告</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <div v-show="sDefaultActive === '1' || sDefaultActive === '2'">
            <el-tabs v-model="activeName">
              <el-tab-pane label="未付款" name="first"></el-tab-pane>
              <el-tab-pane label="已付款" name="second"></el-tab-pane>
              <el-tab-pane label="已完成" name="third"></el-tab-pane>
              <el-tab-pane label="已取消" name="fourth"></el-tab-pane>
              <el-tab-pane label="申诉中" name="fifth"></el-tab-pane>
            </el-tabs>
          </div>
          <div v-show="sDefaultActive === '3'">
            <el-tabs v-model="myAdManageActiveName">
              <el-tab-pane label="售出广告" name="first"></el-tab-pane>
              <el-tab-pane label="求购广告" name="second"></el-tab-pane>
            </el-tabs>
          </div>
          <!-- 我的卖单 未付款 -->
          <div v-show="sDefaultActive === '1' && activeName === 'first'" class="">
            <template v-for="item in aSellUnpaidList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.token_type}}</b> 卖出 | 订单号：{{item.advertisement.ad_number}}</span>
                  <span class="time-desc">30分钟之后买家未付款，订单将超时关闭</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号</p>
                      <!--<p class="important-color">{{item.advertisement.payment_method}}：Name|xxxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <span class="desc">等待买家付款</span>
                </div>
              </el-card>
            </template>

          </div>
          <!-- 我的卖单 已付款 -->
          <div v-show="sDefaultActive === '1' && activeName === 'second'" class="">
            <template v-for="item in aSellPaidList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.token_type}}</b> 卖出 | 订单号：{{item.advertisement.ad_number}}</span>
                  <span class="time-desc">30分钟之后买家未付款，订单将超时关闭</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号</p>
                      <!--<p class="important-color">{{item.advertisement.payment_method}}：Name|xxxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <el-button @click="sellPutCoinOrder(item.order_id)" type="primary" class="button">打币</el-button>
                  <el-button @click="appealOrder([item.order_id, item.order_number])" type="primary" class="button">申诉</el-button>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的卖单 已完成 -->
          <div v-show="sDefaultActive === '1' && activeName === 'third'" class="">
            <template v-for="item in aSellFinishList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="clearfix">
                  <span><b>{{item.advertisement.token_type}}</b> 卖出 | 订单号：{{item.advertisement.ad_number}}</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号</p>
                      <!--<p class="important-color">{{item.advertisement.payment_method}}：Name|xxxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <div v-if="sDefaultActive === '1' && activeName === 'first'" class="desc">
                    <span class="desc">等待买家付款</span>
                  </div>
                  <div v-else-if="sDefaultActive === '1' && activeName === 'second'">
                    <el-button @click="sellPutCoinOrder(item.order_id)" type="primary" class="button">打币</el-button>
                    <el-button @click="appealOrder([item.order_id, item.order_number])" type="primary" class="button">申诉</el-button>
                  </div>
                  <div v-else-if="sDefaultActive === '1' && activeName === 'third'">
                    <el-button @click="appealOrder([item.order_id, item.order_number])" type="primary" class="button">申诉</el-button>
                    <span class="desc">交易完成</span>
                  </div>
                  <div v-else-if="sDefaultActive === '1' && activeName === 'fourth'">
                    <span class="desc">已取消</span>
                  </div>
                   <div v-else-if="sDefaultActive === '1' && activeName === 'fifth'">
                    <span class="desc">申诉中</span>
                  </div>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的卖单 已取消 -->
          <div v-show="sDefaultActive === '1' && activeName === 'fourth'" class="">
            <template v-for="item in aSellCancelList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.token_type}}</b> 卖出 | 订单号：{{item.advertisement.ad_number}}</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号</p>
                      <!--<p class="important-color">{{item.advertisement.payment_method}}：Name|xxxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <span class="desc">已取消</span>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的卖单 申诉中 -->
          <div v-show="sDefaultActive === '1' && activeName === 'fifth'" class="">
            <template v-for="item in aSellAppealList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.token_type}}</b> 卖出 | 订单号：{{item.advertisement.ad_number}}</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号</p>
                      <!--<p class="important-color">{{item.advertisement.payment_method}}：Name|xxxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <span class="desc">申诉中</span>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的买单 未付款 -->
          <div v-show="sDefaultActive === '2' && activeName === 'first'" class="">
            <template v-for="item in aBuyUnpaidList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.currency_type}}</b> 买入 | 订单号：{{item.order_number}}</span>
                  <span class="time-desc">请在30:00分钟内完成付款，否则订单将超时关闭</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号（卖家 {{item.advertisement.user.uid}}）</p>
                      <!--<p class="important-color">{{item.payment_method}}：Name|xxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                      <p>联系方式：{{item.advertisement.user.mobile}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <el-button @click="cancelOrder(item.order_id)" type="text" class="button">取消订单</el-button>
                  <el-button @click="buyConfirmOrder(item.order_id)" type="primary" class="button">确认支付</el-button>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的买单 已付款 -->
          <div v-show="sDefaultActive === '2' && activeName === 'second'" class="">
            <template v-for="item in aBuyPaidList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.currency_type}}</b> 买入 | 订单号：{{item.order_number}}</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号（卖家 {{item.advertisement.user.uid}}）</p>
                      <p>联系方式：{{item.advertisement.user.mobile}}</p>
                      <!--<p class="important-color">{{item.payment_method}}：Name|xxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <el-button @click="appealOrder([item.order_id, item.order_number])" type="primary" class="button">申诉</el-button>
                  <span class="desc">等待卖家打币</span>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的买单 已完成 -->
          <div v-show="sDefaultActive === '2' && activeName === 'third'" class="">
            <template v-for="item in aBuyFinishList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.currency_type}}</b> 买入 | 订单号：{{item.order_number}}</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号（卖家 {{item.advertisement.user.uid}}）</p>
                      <p>联系方式：{{item.advertisement.user.mobile}}</p>
                      <!--<p class="important-color">{{item.payment_method}}：Name|xxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <el-button @click="appealOrder([item.order_id, item.order_number])" type="primary" class="button">申诉</el-button>
                  <span class="desc">已完成</span>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的买单 已取消 -->
          <div v-show="sDefaultActive === '2' && activeName === 'fourth'" class="">
            <template v-for="item in aBuyCancelList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.currency_type}}</b> 买入 | 订单号：{{item.order_number}}</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号（卖家 {{item.advertisement.uid}}）</p>
                      <p>联系方式：{{item.advertisement.user.mobile}}</p>
                      <!--<p class="important-color">{{item.advertisement.payment_method}}：Name|xxxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <el-button @click="appealOrder([item.order_id, item.order_number])" type="primary" class="button">申诉</el-button>
                  <span class="desc">已取消</span>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的买单 申诉中 -->
          <div v-show="sDefaultActive === '2' && activeName === 'fifth'" class="">
            <template v-for="item in aBuyAppealList">
              <el-card shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>{{item.advertisement.currency_type}}</b> 买入 | 订单号：{{item.order_number}}</span>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>交易时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p>收款账号（卖家 {{item.advertisement.uid}}）</p>
                      <p>联系方式：{{item.advertisement.user.mobile}}</p>
                      <!--<p class="important-color">{{item.advertisement.payment_method}}：Name|xxxxxxxxx</p>-->
                      <p class="important-color">付款码：{{item.code}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>交易价格</p>
                      <p>{{item.advertisement.price}} {{item.advertisement.currency_type}}/{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>数量</p>
                      <p>{{item.amount}}{{item.advertisement.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>金额</p>
                      <p class="bold">{{item.advertisement.price * item.amount}} {{item.advertisement.token_type}}</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="bottom clearfix">
                  <span>备注：{{item.advertisement.remark}}</span>
                  <span class="desc">申诉中</span>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的广告 售出广告 -->
          <div v-show="sDefaultActive === '3' && myAdManageActiveName === 'first'" class="">
            <template v-for="item in aSellAd">
              <el-card v-if="item.ad_type === 'sell'" shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>卖{{item.token_type}}</b>&#12288;|&#12288;广告编号：{{item.ad_number}}</span>
                  <div class="left">
                    <!-- <el-button type="text">编辑</el-button> -->
                    <el-button @click="clickDelButton" type="text">删除</el-button>
                  </div>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>创建时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>预计购买</p>
                      <p>{{item.expected_count}} {{item.currency_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>期望价格</p>
                      <p class="bold">{{item.price}} {{item.currency_type}}/{{item.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>备注：</p>
                      <p class="bold">{{item.remark}}</p>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </template>
          </div>
          <!-- 我的广告 求购广告 -->
          <div v-show="sDefaultActive === '3' && myAdManageActiveName === 'second'" class="">
            <template v-for="item in aBuyAd">
              <el-card v-if="item.ad_type === 'buy'" shadow="hover" style="margin-top: 4px;">
                <div slot="header" class="header clearfix">
                  <span><b>买{{item.token_type}}</b>&#12288;|&#12288; 广告编号：{{item.ad_number}}</span>
                  <div class="left">
                    <!-- <el-button type="text">编辑</el-button> -->
                    <el-button @click="clickDelButton" type="text">删除</el-button>
                  </div>
                </div>
                <div class="">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <p>创建时间</p>
                      <p>{{item.created_at}}</p>
                    </el-col>
                    <el-col :span="4">
                      <p>预计购买</p>
                      <p>{{item.expected_count}} {{item.currency_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>期望价格</p>
                      <p class="bold">{{item.price}} {{item.currency_type}}/{{item.token_type}}</p>
                    </el-col>
                    <el-col :span="5">
                      <p>备注：</p>
                      <p class="bold">{{item.remark}}</p>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import { Menu, MenuItem, Row, Col, Tabs, TabPane, Card, Button, Submenu } from 'element-ui'
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Card);
Vue.use(Button);
Vue.use(Submenu);
export default {
  data () {
    return {
      sDefaultActive: '1',
      activeName: 'first',
      myAdManageActiveName: 'first',
      aSellUnpaidList: [],
      aSellPaidList: [],
      aSellFinishList: [],
      aSellCancelList: [],
      aSellAppealList: [],
      aBuyUnpaidList: [],
      aBuyPaidList: [],
      aBuyFinishList: [],
      aBuyCancelList: [],
      aBuyAppealList: [],
      aSellAd: [],
      aBuyAd: []
    }
  },
  watch: {
    activeName (n, o) {
      console.log(n)
      this.getOrderInfo(this.sDefaultActive)
    },
    myAdManageActiveName (n, o) {
      this.getAdList()
    }
  },
  mounted () {
    this.getSellOrderList()
  },
  methods: {
    handleSelect(key, keyPath) {
      this.sDefaultActive = keyPath[0]
      console.log(key, keyPath)
      this.getOrderInfo(keyPath[0])
    },
    getOrderInfo (e) {
      if (e === '1') {
        this.getSellOrderList()
      } else if (e === '2') {
        this.getBuyOrderList()
      } else if (e === '3') {
        this.getAdList()
      }
    },
    getSellOrderList () {
      var type = ''
      if (this.activeName === 'first') {
        type = 'unpaid'
      } else if (this.activeName === 'second') {
        type = 'paid'
      } else if (this.activeName === 'third') {
        type = 'finish'
      } else if (this.activeName === 'fourth') {
        type = "cancel"
      } else if (this.activeName === 'fifth') {
        type = 'appeal'
      }
      new ApiClient("auth")
        .get(
          "resource/users/tx/order/dealer", {
            state: type,
            page: 1,
            limit: '100'
          }
        ).then((res) => {
          console.log(res)
          if (res.status === 200) {
            if (type === 'unpaid') {
              this.aSellUnpaidList = res.data.data
            } else if (type === 'paid') {
              this.aSellPaidList = res.data.data
            } else if (type === 'finish') {
              this.aSellFinishList = res.data.data
            } else if (type === "cancel") {
              this.aSellCancelList = res.data.data
            } else if (type === 'appeal') {
              this.aSellAppealList = res.data.data
            }
          }
        })
    },
    getBuyOrderList () {
      var type = ''
      if (this.activeName === 'first') {
        type = 'unpaid'
      } else if (this.activeName === 'second') {
        type = 'paid'
      } else if (this.activeName === 'third') {
        type = 'finish'
      } else if (this.activeName === 'fourth') {
        type = "cancel"
      } else if (this.activeName === 'fifth') {
        type = 'appeal'
      }
      new ApiClient("auth")
        .get(
          "resource/users/tx/order/consumer", {
            state: type,
            page: 1,
            limit: '100'
          }
        ).then((res) => {
          //console.log(res)
          if (res.status === 200) {
            if (type === 'unpaid') {
              this.aBuyUnpaidList = res.data.data
            } else if (type === 'paid') {
              this.aBuyPaidList = res.data.data
            } else if (type === 'finish') {
              this.aBuyFinishList = res.data.data
            } else if (type === "cancel") {
              this.aBuyCancelList = res.data.data
            } else if (type === 'appeal') {
              this.aBuyAppealList = res.data.data
            }
          }

        })
    },
    getAdList () {
      var type = ''
      if (this.myAdManageActiveName === 'first') {
        type = 'sell'
      } else if (this.myAdManageActiveName === 'second') {
        type = 'buy'
      }
      new ApiClient("auth")
        .get(
          "resource/users/tx/ad/me", {
            ad_type: type,
            page: 1,
            limit: '100'
          }
        ).then((res) => {
          console.log(res)
          if (res.status === 200) {
            if (type === 'sell') {
              this.aSellAd = res.data.data
            } else if (type === 'buy') {
              this.aBuyAd = res.data.data
            }
          }
        })
    },
    cancelOrder (e) {
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        new ApiClient("auth")
          .post(
            "resource/users/tx/order/cancel", {
              order_id: e,
              tx_pw: value
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$Message.success('确认成功');
              this.getOrderInfo(this.sDefaultActive);
            }
          })
      }).catch(() => {

      });
    },
    //  买家付款接口
    buyConfirmOrder (e) {
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        new ApiClient("auth")
          .post(
            "resource/users/tx/order/confirm/consumer", {
              order_id: e,
              tx_pw: value
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$Message.success('确认成功');
              this.getOrderInfo(this.sDefaultActive);
            }
          })
      }).catch(() => {

      });
    },
    //  卖家打币接口
    sellPutCoinOrder (e) {
      this.$prompt('请输入资金密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: "password",
      }).then(({ value }) => {
        new ApiClient("auth")
          .post(
            "resource/users/tx/order/confirm/dealer", {
              order_id: e,
              tx_pw: value
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$Message.success('打币成功');
              this.getOrderInfo(this.sDefaultActive);
            }
          })
      }).catch(() => {

      });
    },
    appealOrder (a) {
      this.$router.push({path: '/c2cappeal?id=' + a[0] + '&number=' + a[1]})
    },
    clickDelButton () {
      this.$confirm('是否删除此广告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new ApiClient("auth")
          .get(
            "resource/users/tx/ad/cancel", {
              ad_id: '',
            }
          ).then((res) => {
            console.log(res)
            if (res.status === 200) {

            }
          })
      }).catch(() => {
      });

    }
  }
}
</script>

<style lang="sass">
.c2corder-page-auto
  .auto-box
    width: 1000px
    margin: 0 auto
    padding-top: 20px
    .el-row
      background-color: #fff
      border-radius: 2px
      .menu-list
        .el-menu
          padding-top: 20px
          min-height: 700px
          border-right: 1px solid #003E5A
          .el-menu-item
            text-align: center
            font-weight: bold
          .el-menu-item.is-active
            background-color: #EBF5FE
      .el-tabs
        padding-top: 12px
        padding-left: 4px
        .el-tabs__item
          font-size: 16px
          font-weight: 400
          // padding: 0 30px
      .el-card
        .header
          .time-desc
            float: right
          .left
            float: right
            .el-button
              padding: 0
        .bottom
          height: 40px
          line-height: 40px
          padding-top: 16px
          .desc
            float: right
          .button
            float: right
            margin-left: 10px
        .bold
          font-weight: 700
        .important-color
          color: #19be6b
</style>
