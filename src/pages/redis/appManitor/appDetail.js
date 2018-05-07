// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import appDetail from './appDetail.vue'
import router from '../../../router/index.js'
import axios from 'axios'
import iView from 'iView'
import statusManitor from '../../../vuex/statusManitor.js'
import 'iview/dist/styles/iview.css'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(router)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#appDetail',
  router,
  store: statusManitor,
  render: h => h(appDetail)
})
