// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import instanceList from './instanceList.vue'
import router from '../../../router/index.js'
import axios from 'axios'
import iView from 'iView'
import qs from 'qs'
import statusManitor from '../../../vuex/statusManitor.js'
import 'iview/dist/styles/iview.css'

Vue.prototype.$axios = axios
Vue.prototype.qs = qs
Vue.config.productionTip = false

Vue.use(router)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#instanceList',
  router,
  store: statusManitor,
  render: h => h(instanceList)
})
