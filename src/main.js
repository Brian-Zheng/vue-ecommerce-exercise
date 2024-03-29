// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import "./vee-validate";

import App from './App'
import router from './router'
import './bus';
import currencyFilter from './filters/currency'

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
axios.defaults.withCredentials = true;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  console.log('to:', to);

  if (to.meta.requiresAuth) {
    // console.log('required auth');
    const api = `${process.env.API_PATH}/api/user/check`;
    // const vm = this;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        // vm.$router.push('/');
        next();
      } else {
        next({
          path: '/login'
        });
      }
    })
  } else {
    next();
  }
});
