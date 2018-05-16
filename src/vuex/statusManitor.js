import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      uid: '',
      name: '',
      role: '',
      token: '',
      tokenTime: '',
      // department_name: 'development',
      // department_name: 'maintenance',
      userStatus: false, // 表示是否等到用户信息
      tokenStatus: false// 表示保存token信息
    },
    pageInfo: {
      appInstanceList: {
        curTab: '',
        searchTextMyApp: '',
        searchTextElseApp: ''
      },
      appInstance: {}
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
    },
    getPageInfo: function (state) {
      return state.pageInfo
    },
    getPageInfoAIL: function (state) {
      return state.pageInfo.appInstanceList
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
      // console.log('mutations setToken')
      state.userInfo.token = payload.token
      state.userInfo.tokenTime = payload.tokenTime
      state.userInfo.tokenStatus = true
      // console.log(state.userInfo)
      // console.log(state.userInfo.token)
    },
    setPageInfo: function (state, payload) {
      // console.log(payload)
      state.pageInfo = payload
      // console.log(state.pageInfo)
    },
    setPageInfoAIL: function (state, payload) {
      state.pageInfo.appInstanceList.curTab = payload.curTab
      state.pageInfo.appInstanceList.searchTextMyApp = payload.searchTextMyApp
      state.pageInfo.appInstanceList.searchTextElseApp = payload.searchTextElseApp
      // console.log(state.pageInfo.appInstanceList)
    },
    setPageInfoAILCurTab: function (state, payload) {
      state.pageInfo.appInstanceList.curTab = payload.curTab
      // console.log(state.pageInfo.appInstanceList)
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
      // console.log('actions setToken')
      commit('setToken', payload)
    },
    setPageInfo: function ({commit}, payload) {
      commit('setPageInfo', payload)
    },
    setPageInfoAIL: function ({commit}, payload) {
      commit('setPageInfoAIL', payload)
    },
    setPageInfoAILCurTab: function ({commit}, payload) {
      commit('setPageInfoAILCurTab', payload)
    }
  }
})
export default store
