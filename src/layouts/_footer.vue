<template>
  <Footer class="layout-footer-center">
    <div class="menu-footer">
      <ul>
        <li class="title">
          <img src="@/assets/img/logo.png">
          <span>GIH</span>
        </li>
        <!-- <li class="m">
          <a target="_blank" href="#" class="icon"><icon-font :icon="['fab', 'facebook-f']"/></a>
          <a target="_blank" href="#" class="icon"><icon-font :icon="['fab', 'telegram-plane']"/></a>
        </li> -->
      </ul>
      <ul>
        <li class="title">{{$t('footer.about_us')}}</li>
        <li class="m">
          <router-link :to="{ name: 'Aboutus', params: {type: 'aboutus'} }">
            {{$t('footer.about_us')}}
          </router-link>
        </li>
        <li class="m">
          <router-link :to="{ name: 'Aboutus', params: {type: 'user_privacy'} }">
            {{$t('footer.user_privacy')}}
          </router-link>
        </li>
      </ul>
      <ul class="contact">
        <li class="title">{{$t('footer.title')}}</li>
        <li class="m">{{$t('footer.service')}}: {{ contactus.service }}</li>
        <li class="m">{{$t('footer.business')}}: {{ contactus.business }}</li>
      </ul>
      <ul>
        <li class="title">{{$t('footer.download_the_app')}}</li>
        <img src="@/assets/img/qrcode.png">
      </ul>
    </div>
    <div class="bottom-footer">&copy; 2019 <a :href="copyright.link" target="_blank" v-html="copyright.name"/>. All rights reserved.</div>
  </Footer>
</template>

<script>
export default {
  data() {
    return this.$config.footer;
  }
};
</script>
