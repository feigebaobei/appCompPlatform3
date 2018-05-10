import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      uid: '',
      name: '',
      role: 1,
      token: '',
      tokenTime: '',
      // department_name: 'development',
      // department_name: 'maintenance',
      userStatus: false, // 表示是否等到用户信息
      tokenStatus: false// 表示保存token信息
    }
  },
  getters: {
    getUid: function (state) {
      return state.userInfo.uid
    },
    getName: function (state) {
      return state.userInfo.name
    },
    getUserInfo: function (state) {
      // console.log(state.userInfo)
      return state.userInfo
    }
  },
  mutations: {
    addUid: function (state, payload) {
      // console.log(payload)
      state.userInfo.uid += payload.num
    },
    setUser: function (state, payload) {
      // console.log(payload)
      state.userInfo.uid = payload.uid
      state.userInfo.name = payload.name
      state.userInfo.role = payload.role
      state.userInfo.userStatus = true
      state.userInfo.token = payload.token
      state.userInfo.tokenTime = payload.tokenTime
      state.userInfo.tokenStatus = true
    },
    setToken: function (state, payload) {
      state.userInfo.token = payload.token
      state.userInfo.tokenTime = payload.tokenTime
    }
  },
  actions: {
    addUid: function ({commit}, payload) {
      commit('addUid', payload)
    },
    setUser: function ({commit}, payload) {
      commit('setUser', payload)
    },
    setToken: function ({commit}, payload) {
      commit('setToken', payload)
    }
  }
})
export default store
