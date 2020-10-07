<template lang="html">
  <Content class="c2c-page-auto">
    <div class="auto-box">
      <div class="bottom-div">
        <div class="table-header">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('usercenter.c2c.sell')" name="sell">
              <el-table
                :data="sellTableData"
                style="width: 100%">
                <el-table-column
                  :label="$t('usercenter.c2c.advertiser')"
                  width="140">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                      <div class="" style="border-bottom: 1px solid #EBEEF5;padding: 8px 10px;">
                        <p>{{ scope.row.user.uid }}</p>
                      </div>
                      <div class="" style="padding: 8px 10px;">
                        <p>手机已认证<i class="el-icon-success" style="margin-left: 8px"></i></p>
                        <p>身份已认证<i class="el-icon-success" style="margin-left: 8px"></i></p>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        {{ scope.row.user.uid }}
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="payment_method"
                  :label="$t('usercenter.c2c.payment')"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="price"
                  :label="$t('usercenter.c2c.price')">
                </el-table-column>
                <el-table-column
                  :label="$t('usercenter.c2c.limit')">
                  <template slot-scope="scope">
                    {{ scope.row.min_count }} ~ {{ scope.row.max_count }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('usercenter.c2c.action')">
                  <template slot-scope="scope">
                    <!-- <router-link :to="{ name: 'C2CBuy', params: {oData: scope.row} }"> -->
                    <router-link :to="{ path: 'c2cbuy/' + scope.row.ad_number }">
                      <el-button type="primary" size="mini">{{$t('usercenter.c2c.purchase')}} {{scope.row.token_type}}</el-button>
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="1"
                :total="nSellTablePageNumber">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane :label="$t('usercenter.c2c.buy')" name="buy">
              <el-table
                :data="buyTableData"
                style="width: 100%">
                <el-table-column
                  :label="$t('usercenter.c2c.advertiser')"
                  width="140">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="right">
                      <div class="" style="border-bottom: 1px solid #EBEEF5;padding: 8px 10px;">
                        <p>{{ scope.row.user.uid }}</p>
                        <p style="text-transform:capitalize;">{{ scope.row.country }}</p>
                      </div>
                      <div class="" style="padding: 8px 10px;">
                        <p>手机已认证<i class="el-icon-success" style="margin-left: 8px"></i></p>
                        <p>身份已认证<i class="el-icon-success" style="margin-left: 8px"></i></p>
                      </div>
                      <div slot="reference" class="name-wrapper">
                        {{ scope.row.user.uid }}
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="price"
                  :label="$t('usercenter.c2c.price')">
                </el-table-column>
                <el-table-column
                  prop="expected_count"
                  :label="$t('usercenter.c2c.amount')">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  :label="$t('usercenter.c2c.contact')">
                </el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="1"
                :total="nBuyTablePageNumber">
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
          <div class="operation-div">
            </el-select>
            <router-link :to="{ name: 'C2CCreate', params: {} }">
              <el-button type="text">{{$t('usercenter.c2c.publish')}}</el-button>
            </router-link>
            <router-link :to="{ name: 'C2COrder', params: {} }">
              <el-button type="text" icon="el-icon-tickets">{{$t('usercenter.c2c.management')}}</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn, Button, Pagination, Tabs, TabPane, Select, Option, Popover } from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Select)
Vue.use(Option)
Vue.use(Popover)
export default {
  data () {
    return {
      activeName: 'sell',
      nSellTablePageNumber: 1,
      nBuyTablePageNumber: 1,
      nPerPage:10,
      aCountriesValue: [],
      aCountriesOptions: [{
        value: '选项1',
        label: '中国'
      },{
        value: '选项2',
        label: '美国'
      }],
      sellTableData: [],
      buyTableData: []
    }
  },
  watch: {
    activeName (n, o) {
      this.getC2cList(1)
    }
  },
  mounted () {
    this.getC2cList(1)
  },
  methods: {
    handleClick (e) {
      window.console.log(e)
    },
    getC2cList (page) {
      new ApiClient("auth")
        .get(
          "identity/users/tx/ad", {
            ad_type: this.activeName,
            page: page,
            limit: this.nPerPage
          }
        )
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            var data = res.data.data
            this.page_num = res.total_page
            if (this.activeName === 'sell') {
              this.sellTableData = data
              this.nSellTablePageNumber = res.data.total_page*this.nPerPage
            } else if (this.activeName === 'buy') {
              this.buyTableData = data,
              this.nBuyTablePageNumber = res.data.total_page*this.nPerPage
            }
          }
       })
    },
    handleCurrentChange (e) {
      this.getC2cList(e)
    }
  }
}
</script>

<style lang="sass">
  .c2c-page-auto
    .top-body
      height: 280px
      background-color: #0E435B
      .title
        padding-top: 80px
        font-size: 34px
        text-align: center
        color: #fff
      .desc
        font-size: 24px
        text-align: center
        color: #6eafda
    .bottom-div
      min-height: 700px
      background-color: #fff
      max-width: 1200px
      padding: 8px 30px
      margin: 20px auto 30px auto
      .table-header
        position: relative
        .operation-div
          position: absolute
          right: 0
          top: 0
          .el-button
            padding: 20px 10px
      .el-tabs
        .el-tabs__item
          font-size: 16px
          height: 60px
          line-height: 60px
      .el-button--mini, .el-button--mini.is-round
        padding: 4px 13px
      .el-pagination
        text-align: right
      .el-tabs__item.is-active, .el-button--text
        color: #0095D8
      .el-tabs__active-bar, .el-button--primary
        background-color: #0095D8
        border: none
</style>
