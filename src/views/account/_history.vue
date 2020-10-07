<template>
  <div class="setting-main history">
    <div class="setting-head">{{ $t("usercenter.login_history.title") }}</div>
    <div class="setting-body">
      <table class="table table-head">
        <thead>
          <th class="text-left" v-text="$t('table.date')"/>
          <th class="text-center" v-text="$t('table.ip_address')"/>
          <th class="text-right" v-text="$t('table.status')"/>
        </thead>
      </table>
      <div class="table-content">
        <table class="table">
          <tbody>
            <tr
              v-for="(data, index) in activity.array"
              :key="index"
              class="history-row"
            >
              <td class="text-left" v-html="getDate(data.created_at)"/>
              <td class="text-center" v-html="data.user_ip"/>
              <td
                class="text-right"
              >{{ $t(`history.${data.action}`) }} {{ $t(`history.${data.result}`) }}</td>
            </tr>
          </tbody>
        </table>
        <Spin size="large" fix v-if="activity.loading"/>
      </div>
      <Page
        v-if="activity.max > 25"
        :total="activity.max"
        :page-size="25"
        :current="activity.page"
        size="small"
        @on-change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDate } from "@/helpers";

export default {
  computed: mapState('user', ['activity']),
  mounted() {
    const { activity } = this;
    if (!activity.array.length)
      this.$store.dispatch("user/GET_ACTIVITY", {
        limit: 25,
        page: 1,
        topic: "session",
        action: "login"
      });
  },
  methods: {
    onPageChange($page) {
      this.$store.dispatch("user/GET_ACTIVITY", {
        page: $page,
        limit: 25,
        topic: "session",
        action: "login"
      });
    },
    getDate: date => getDate(date, true)
  }
};
</script>