import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faTelegramPlane,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFacebookF);
library.add(faTelegramPlane);
library.add(faTwitter);
Vue.component("icon-font", FontAwesomeIcon);
