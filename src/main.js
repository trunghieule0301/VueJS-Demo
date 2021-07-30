import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./filters/format-date";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.directive('rainbow', {
  bind(el, binding, vnode) {
    el.style.color = "#" + Math.random().toString().slice(2, 8);
    el.style.fontSize = "28px";
  }
})
Vue.directive('theme', {
  bind: function (el, binding, vnode) {
    if (binding.value == 'light') {
      el.style.backgroundColor = "white";
    }
    else if (binding.value == 'dark') {
      el.style.backgroundColor = "rgb(36, 36, 36)";
      el.style.color = "white";
    }
  },
  update: function (newValue, oldValue) {
    if (oldValue.value == 'light') {
      newValue.style.background = "white";
      newValue.style.color = "black";
    }
    else if (oldValue.value == 'dark') {
      newValue.style.background = "rgb(36, 36, 36)";
      newValue.style.color = "white";
    }
  }
})
Vue.use(VueMoment, {
  moment,
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
