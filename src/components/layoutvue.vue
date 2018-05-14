<template>
  <div class="layout" ref="layoutabs">
    <layout>
      <!-- 头部 start -->
      <Header theme="dark" class="title">
        <Row>
          <Col span="8">
            <a :href="indexHref" v-if="responseSider.data.data.nav === '应用管理'" style="color: #fff">
              <h1 v-html="responseSider.data.data.nav"></h1>
            </a>
            <a :href="indexHref" v-if="responseSider.data.data.nav === '组件概览'" style="color: #fff">
              <h1 v-html="responseSider.data.data.nav"></h1>
            </a>
          </Col>
          <Col span="8" offset='8' class="userbox">
            <img :src="imgUrl" alt="头像" class="headPhoto" @click="updateDateTime">
            <Dropdown style="margin-left: 20px" placement="bottom-end" class="user">
                <a href="#" style="color: #fff">
                    <!-- 姓名 -->
                    {{userInfo.name}}
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <a href="http://api.service.100tal.com/sso/logout?path=https://service.100tal.com/sso/login/324899092">
                    <DropdownItem>退出</DropdownItem>
                  </a>
                </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <!-- 头部 end -->

      <layout>
        <!-- 导航 start -->
        <Sider :style="{height: '100vh', left: 0, overflow: 'auto', background: '#fff'}" class="aside">
          <Menu v-if="getResponseSider.data.data.menu.length" :active-name="activeMenuItem()" :open-names="[getResponseSider.data.data.menu[0].name]">
            <!-- <Submenu v-for="(item, index) in getResponseSider.data.data.menu" :key="index" :name="index"> -->
            <Submenu v-for="(item, index) in getResponseSider.data.data.menu" :key="item.id" :name="item.name">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                <span v-html="item.name"></span>
              </template>
              <a :href="navHref(subItem)" style="color: #333;" v-for="(subItem, subIndex) in item.child" :key="subItem.id">
                <MenuItem :name="menuItemName(index, subIndex)" v-html="subItem.name"></MenuItem>
              </a>
            </Submenu>
            <!-- </Submenu> -->
          </Menu>
        </Sider>
        <!-- 导航 end -->
        <!-- main start -->
        <Layout :style="{padding: '10px 24px 24px'}">
          <!-- 加载相应的组件 start -->
          <!-- <managevue v-if="nav === 'manage'"></managevue> -->
          <tabvue v-if="nav === 'appManageAndOverview'"></tabvue>
          <appinstancelistvue v-if="nav === 'appInstanceList'"></appinstancelistvue>
          <appinstance v-if="nav === 'appInstance'"></appinstance>
          <appalertlist v-if="nav === 'appAlertList'"></appalertlist>
          <appalertedit v-if="nav === 'appAlertEdit'"></appalertedit>
          <appdetail v-if="nav === 'appDetail'"></appdetail>
          <!-- <tabvue v-if="nav === 'compOverview'"></tabvue> -->
          <compinstancelist v-if="nav === 'compInstanceList'"></compinstancelist>
          <compinstance v-if="nav === 'compInstance'"></compinstance>
          <compalertlist v-if="nav === 'compAlertList'"></compalertlist>
          <compalertedit v-if="nav === 'compAlertEdit'"></compalertedit>
          <compbackupslist v-if="nav === 'compBackupsList'"></compbackupslist>
          <compbackupsedit v-if="nav === 'compBackupsEdit'"></compbackupsedit>
          <compbackups v-if="nav === 'compBackups'"></compbackups>
          <comprecovelist v-if="nav === 'compRecoverList'"></comprecovelist>
          <compauditlist v-if="nav === 'compAuditList'"></compauditlist>
          <!-- 加载相应的组件 end -->
        </Layout>
        <!-- main end -->
      </layout>
    </layout>
    </div>
</template>
<script>
import tabvue from './tabvue.vue'
import appdetail from './appManitor/appDetail.vue'
import appinstancelistvue from './appManitor/appInstanceListCont.vue'
import appalertlist from './appManitor/appAlertList.vue'
import appalertedit from './appManitor/appAlertEdit.vue'
import appinstance from './appManitor/appInstance.vue'
import compinstancelist from './compOverview/compInstanceList.vue'
import compinstance from './compOverview/compInstance.vue'
import compalertlist from './compOverview/compAlertList.vue'
import compalertedit from './compOverview/compAlertEdit.vue'
import compbackupslist from './compOverview/compBackupsList.vue'
import compbackupsedit from './compOverview/compBackupsEdit.vue'
import compbackups from './compOverview/compBackups.vue'
import comprecovelist from './compOverview/compRecoverList.vue'
import compauditlist from './compOverview/compAuditList.vue'
export default {
  name: 'layoutvue',
  props: ['nav'],
  data: function () {
    return {
      // nav: '',
      imgUrl: './static/images/food.jpg',
      curPage: '',
      responseSider: {
        data: {
          data: {
            menu: [],
            nav: ''
          },
          status: ''
        }
      }
    }
  },
  components: {
    tabvue,
    appdetail,
    appinstancelistvue,
    appalertlist,
    appalertedit,
    appinstance,
    compinstancelist,
    compinstance,
    compalertlist,
    compalertedit,
    compbackupslist,
    compbackupsedit,
    compbackups,
    comprecovelist
  },
  computed: {
    indexHref () {
      return `./index.html?token=${this.$store.getters.getUserInfo.token}`
    },
    getResponseSider: {
      set () {},
      get () {
        // console.log(this.responseSider)
        // if (!this.responseSider.data.data.menu.length) {
        //   return this.responseSider
        // } else {
        // }
        return this.responseSider
      }
    },
    /* 用户信息 start */
    userInfo: function () {
      var a = this.$store.getters.getUserInfo
      // console.log(a)
      return a
    },
    /* 用户信息 end */
    curSelectedNav: function () {
      // 其实用不到这个函数。nav 就可以指定当前页面
      switch (this.nav) {
        case 'appManageAndOverview':
        case 'appDetail':
        default:
          return '1'
        case 'appInstanceList':
        case 'appInstance':
        case 'compInstanceList':
        case 'compInstance':
          return '1-1'
        case 'appAlertList':
        case 'appAlertEdit':
        case 'compAlertlist':
        case 'compAlertEdit':
          return '1-2'
        case 'compBackupsList':
        case 'compBackups':
          return '1-3'
        case 'compRecoverList':
          return '1-4'
      }
    },
    openSider () {
      var href = this.getPosition()
      switch (href) {
        case 'appInstanceList':
        case 'appInstance':
        case 'appAlertList':
        case 'appAlertEdit':
        case 'appDetail':
        default:
          return ['1']
      }
    }
  },
  methods: {
    updateDateTime () {
      console.log(new Date())
    },
    getPosition () {
      var position = window.location.href
      // console.log(position)
      var reg = /\/(\w*)\.html/
      reg.test(position)
      var $1 = RegExp.$1
      return $1
    },
    menuItemName (index, subIndex) {
      var str = index + '-' + subIndex
      return str
    },
    activeMenuItem () {
      var href = this.getPosition()
      switch (href) {
        case 'appInstanceList':
        case 'appInstance':
        case 'appDetail':
          return '0-0'
        case 'appAlertList':
        case 'appAlertEdit':
          return '0-1'
        case 'compInstanceList':
        case 'compInstance':
          return '0-0'
        case 'compAlertList':
        case 'compAlertEdit':
          return '0-1'
        case 'compBackupsList':
        case 'compBackups':
          return '0-3'
        case 'compRecoverList':
          return '0-4'
        default:
          return ''
      }
    },
    navHref (subItem) {
      var role = this.$store.getters.getUserInfo.role
      if (role === 2) {
        switch (subItem.name) {
          case '实例列表':
            return './appInstanceList.html?token=' + this.$store.getters.getUserInfo.token
            // return './appInstanceList.html'
          case '告警策略':
            return './appAlertList.html?token=' + this.$store.getters.getUserInfo.token
          case '性能监控':
            return '#'
        }
      }
      if (role === 1) {
        var user = this.$store.getters.getUserInfo
        switch (subItem.name) {
          case '实例列表':
            return './compInstanceList.html?token=' + this.$store.getters.getUserInfo.token
          case '告警策略':
            return './compAlertList.html?token=' + this.$store.getters.getUserInfo.token
          case '性能监控':
            return '#'
          case '备份':
            return './compBackupsList.html?token=' + this.$store.getters.getUserInfo.token
          case '恢复':
            return './compRecoverList.html?token=' + this.$store.getters.getUserInfo.token
        }
      }
    },
    // 请求用户信息
    // 再根据用户信息，请求导航信息
    requestUserInfo () {
      /* 当没有用户信息时，强制跳转到扫码页 start */
      // if (!this.$store.getters.getUserInfo.tokenStatus) {
      //   this.$axios({
      //     url: 'http://infra.xesv5.com/api/user/token',
      //     method: 'post',
      //     data: this.qs.stringify({
      //       uid: this.$store.getters.getUserInfo.uid
      //     })
      //   }).then(response => {
      //     this.setToken(response.data.data.token)
      //     console.log(this.$store.getters.getUserInfo.token)
      //     // window.location.href = 'https://service.100tal.com/sso/login/324899092'
      //   })
      // }
      var token = this.getRequest().token ? this.getRequest().token : this.$store.getters.getUserInfo.token
      if (!token) {
        // this.gotoSweep()
        window.location.href = 'https://service.100tal.com/sso/login/324899092'
      }
      /* 当没有用户信息时，强制跳转到扫码页 end */
      this.$axios({
        // method: 'post',
        method: 'get',
        // url: 'http://infra.xesv5.com/api/user&token=' + this.getRequest().token
        // url: 'http://infra.xesv5.com/api/user&token=qwerty'
        // url: 'http://infra.xesv5.com/api/user'
        // url: 'http://dev.infra.console.com/api/user'
        url: 'http://infra.xesv5.com/api/user?token=' + token
        // data: this.qs.stringify({
        //   token: this.getRequest().token
        // })
      }).then(response => {
        this.$store.dispatch('setUser', response.data.data)
        // console.log('token', token)
        this.setToken(token)
        // console.log('token', this.$store.getters.getUserInfo.token)
        this.requestNav()
        // console.log('token', this.$store.getters.getUserInfo.token)
        /* 当用户输入url中无token时 start */
        // var a = this.getRequest().token
        // if (!a) {
        //   this.$axios({
        //     url: 'http://infra.xesv5.com/api/user/token?token=' + this.$store.getters.getUserInfo.token,
        //     method: 'post',
        //     data: this.qs.stringify({
        //       uid: this.$store.getters.getUserInfo.uid
        //     })
        //   }).then(response => {
        //     var domain = this.getDomain
        //     this.setToken(response.data.data.token)
        //     var href = domain + '?token=' + this.$store.getters.getUserInfo.token
        //     console.log(href)
        //     window.location.href = href
        //   })
        // }
        /* 当用户输入url中无token时 end */
        /* 在扫码进入系统后首页url里一定有token时 start */
        // this.setToken()// set
        /* 在扫码进入系统后首页url里一定有token时 end */
        // 前端存储token数据
        // this.saveDataAtFront()
        // this.getDataAtFront()
        // this.gotoSweep()
        // if (this.$store.getters.getUserInfo.tokenStatus) {
        // }
        // token机制记得开发
        // this.judgeToken()
      }).catch(error => {
        console.log(error)
        window.location.href = 'https://service.100tal.com/sso/login/324899092'
      })
    },
    // 请求导航的数据
    requestNav () {
      this.$axios({
        method: 'get',
        url: 'http://infra.xesv5.com/api/menus?token=' + this.$store.getters.getUserInfo.token
      }).then(response => {
        console.log(response)
        this.responseSider = response
      })
    },
    judgeToken () {
      // var token = this.getDataAtFront()[0].token
      // if (!token) { // 不存在
      //   // var domain = this.get
      //   // this.refreshCurPage()
      //   // 取新token并刷新
      //   this.getNewTokenAndRefresh()
      // } else { // 存在
      //   // var
      // }
      // 指定过期时间
      var staleTime = 2 * 60 * 60 * 60// 2h 单位ms
      var token = this.$store.getters.getUserInfo.token ? this.$store.getters.getUserInfo.token : this.getRequest().token
      console.log('staleTime', staleTime)
      console.log('token', token)
      // 是否有值
      if (!token) {
        // console.log(this.$store.getters.getUserInfo.token)
        // window.location.href = 'https://service.100tal.com/sso/login/324899092'
        this.gotoSweep()
      } else {
        this.setToken()
        var tokenTime = this.$store.getters.getUserInfo.tokenTime
        var curDate = new Date().getTime()
        console.log('tokenTime', tokenTime)
        console.log('curDate', curDate)
        // tokenTime是否有值
        if (tokenTime) {
          // 是否过期
          if (curDate - tokenTime - staleTime < 0) { // 未过期
            console.log('未过期')
            // this.requestUserInfo()
            // token是否正确
            this.$axios({
              method: 'get',
              url: 'http://infra.xesv5.com/api/user?token=' + token
            }).then(response => {
              console.log(response)
              // this.$store.dispatch('setUser', response.data.data)
            }).catch(error => {
              console.log(error)
            })
          } else {
            // this.$axios({
            //   method: 'get',
            //   url: 'http://infra.xesv5.com/api/user?token=' + token
            // })
            this.gotoSweep()
          }
        } else {

        }
      }
    },
    // 取新token并刷新
    getNewTokenAndRefresh () {
      this.$axios({
        url: 'http://infra.xesv5.com/api/user/token?token=' + this.getRequest().token,
        // url: 'http://infra.xesv5.com?g=Web&c=Mock&o=simple&projectID=2&uri=/api/user/token'
        method: 'post',
        data: this.qs.stringify({
          uid: this.$store.getters.getUserInfo.uid
        })
      }).then(response => {
        // 保存新token
        // var obj = {
        //   token: response.data.data.token,
        //   tokenTime: new Date().getTime()
        // }
        // this.$store.commit('setToken', obj)
        this.setToken()
        var domain = this.getDomain()
        var href = domain + '/?token=' + this.$store.getters.getUserInfo.token
        window.location.href = href
      })
    },
    setToken (toke) {
      var obj = {
        // token: this.getRequest().token,
        token: toke,
        tokenTime: new Date().getTime()
      }
      // console.log('obj', obj)
      this.$store.dispatch('setToken', obj)
    },
    getNewToken () {
      this.$axios({
        url: 'http://infra.xesv5.com/api/user/token?token=' + this.$store.getters.getUserInfo.token,
        method: 'post',
        data: this.qs.stringify({
          uid: this.$store.getters.getUserInfo.uid
        })
      }).then(response => {
        // this.setToken
      })
    },
    getRequest () {
      var url = window.location.href // 获取url中"?"符后的字串
      var index = url.indexOf('?')
      var theRequest = {}
      var trail = url.slice(-2, url.length)
      if (trail === '#/') {
        url = url.slice(0, url.length - 2)
      }
      if (index !== -1) {
        var requestStr = url.slice(index, url.length)
        requestStr = requestStr.slice(1, requestStr.length)
        var requestArr = requestStr.split('&')
        for (var i = 0, iLen = requestArr.length; i < iLen; i++) {
          theRequest[requestArr[i].split('=')[0]] = requestArr[i].split('=')[1]
        }
      }
      // console.log(theRequest)
      return theRequest
    },
    // 前端存储token数据
    saveDataAtFront () {
      // var date = new Date()
      // var data = [
      //   {
      //     'token': this.getRequest().token ? this.getRequest().token : '',
      //     'dateTime': new Date().getTime()
      //   }
      // ]
      // console.log(data)
      // window.localStorage.token = JSON.stringify(data)

    },
    getDataAtFront () {
      var obj = JSON.parse(window.localStorage.token)
      // console.log(obj)
      return obj
    },
    gotoSweep () {
      window.location.href = 'https://service.100tal.com/sso/login/324899092'
    },
    // refreshDate () {
    //   var obj = this.getDataAtFront()
    //   // console.log(obj)
    //   obj[0].dateTime = new Date().getTime()
    //   window.localStorage.token = JSON.stringify(obj)
    //   // test
    //   // console.log(this.getDataAtFront())
    // },
    getDomain () {
      var url = window.location.href
      var index = url.indexOf('/?')
      if (index === -1) {
        return url
      } else {
        var domain = url.slice(0, index)
        console.log(domain)
        return domain
      }
    },
    refreshCurPage () {
      // var url = window.location.href
      // var index = url.indexOf('?')
      // var domain = url.slice(0, index)
      // console.log(domain)
      var domain = this.getDomain()
      var href = domain + '/?token=' + this.getDataAtFront()[0].token
      console.log(href)
      window.location.href = href
    }
  },
  // mounted () {
  mounted () {
    // 判断token
    // this.judgeToken()
    // 请求用户信息和导航信息
    this.requestUserInfo()
    // 刷新用户操作的时间
    // this.box = this.$refs.layoutabs
    // this.box.addEventListener('click', () => {
    //   this.refreshDate()
    // }, false)
  }
}

</script>
<style lang="scss" scoped>
.title {
  text-align: left;
  color: #eee;
  h1 {
    display: inline;
  }
  .userbox {
    text-align: right;
    font-size: 16px;
    .headPhoto {
      width: 50px;
      height: 50px;
      border-radius: 26px;
      margin: 5px;
      vertical-align: middle;
    }
    .user {
      vertical-align: middle;
    }
  }
}
</style>
