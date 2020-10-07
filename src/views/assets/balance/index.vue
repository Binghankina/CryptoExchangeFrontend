<template>
  <div class="assets-main balance" v-if="$store.getters['user/getBalance'].length">
    <div class="assets-head">
      <div class="assets-finder">
        <Checkbox v-model="hidesmall">
          {{ $t("assets.hidesmall") }}
          <Tooltip content="<1" placement="right" theme="light">
            <Icon type="ios-information-circle"/>
          </Tooltip>
        </Checkbox>
        <div class="search">
          <input :placeholder="$t('table.search')" maxlength="9" type="text" v-model="search">
          <i class="ivu-icon ivu-icon-ios-search-outline"/>
        </div>
      </div>
    </div>
    <div class="assets-body">
      <div class="table-content">
        <dl class="head">
          <span class="coin" v-text="$t('table.coin')"/>
          <span class="name" v-text="$t('table.name')"/>
          <span class="total" v-text="$t('table.total')"/>
          <span class="available" v-text="$t('table.available')"/>
          <span class="locked" v-text="$t('table.locked')"/>
          <span class="text-center action" v-text="$t('table.action')"/>
        </dl>
        <dd v-if="this.$store.getters['user/getBalance'].length">
          <dl
            v-for="(data, index) in getAllCurrencies"
            :key="index"
            :class="{ selected: select.id === data.id }"
          >
            <span class="coin">{{ data.id.toUpperCase() }}</span>
            <span class="name">{{ data.name }}</span>
            <span class="total">{{ getTotal(data.id) }}</span>
            <span class="available">{{ getAvailable(data.id) }}</span>
            <span class="locked">{{ getLocked(data.id) }}</span>
            <span class="text-center action">
              <a
                href="javascript:void(0)"
                @click="changeAssets(data.id, 'deposit')"
                :class="{ selected: select.id === data.id && select.type === 'deposit' }"
                v-text="$t('action.deposit')"
              />
              <a
                href="javascript:void(0)"
                @click="changeAssets(data.id, 'withdraw')"
                :class="{ selected: select.id === data.id && select.type === 'withdraw' }"
                v-text="$t('action.withdrawal')"
              />
              <Dropdown trigger="click" @on-click="changeMarket">
                <a href="javascript:void(0)" v-text="$t('action.exchange')"/>
                <DropdownMenu slot="list">
                  <DropdownItem
                    v-for="(m, index) in getAllMarket(data.id)"
                    :key="index"
                    :name="m.name"
                  >{{ m.name }}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
            <div v-if="select.id === data.id" class="action-box">
              <deposit-box
                v-if="select.type === 'deposit'"
                :deposit_address="select.deposit_address || 'ERROR'"
                :currencyArray="data"
              />
              <withdraw-box
                v-if="select.type === 'withdraw'"
                :balance="getAvailable(data.id)"
                :currencyArray="data"
              />
              <Spin size="large" fix v-if="loading"/>
            </div>
          </dl>
        </dd>
        <Spin size="large" fix v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import Helpers from "@/views/assets/balance/helpers";

export default {
  mixins: [Helpers]
}
</script>
