<template>
  <div class="layout">
    <layout>
      <!-- 头部 start -->
      <Header theme="dark" class="title">
        <Row>
          <Col span="8">
            <h1 v-html="responseSider.data.data.nav"></h1>
          </Col>
          <Col span="8" offset='8' class="userbox">
            <img :src="imgUrl" alt="头像" class="headPhoto">
            <Dropdown style="margin-left: 20px" placement="bottom-end" class="user">
                <a href="javascript:void(0)" style="color: #fff">
                    <!-- 姓名 -->
                    {{userInfo.name}}
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <!-- 头部 end -->

      <layout>
        <!-- 导航 start -->
        <Sider :style="{height: '100vh', left: 0, overflow: 'auto', background: '#fff'}" class="aside">
            <!-- <Menu :active-name="curSelectedNav" theme="light" width="auto" :open-names="openSider"> -->
            <Menu :active-name="1-1" theme="light" width="auto" :open-names="openSider">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  {{responseSider.data.data.menu[0].name}}
                </template>
                <a href="./appInstanceList.html" style="color: #333">
                  <MenuItem name="1-1" v-html="responseSider.data.data.menu[0].child[0].name"></MenuItem>
                </a>
                <a href="./appAlertList.html" style="color: #333">
                  <MenuItem name="1-2" v-html="responseSider.data.data.menu[0].child[1].name"></MenuItem>
                </a>
                <a href="#" style="color: #333">
                  <MenuItem name="1-3" v-html="responseSider.data.data.menu[0].child[2].name"></MenuItem>
                </a>
                <a href="./compBackupsList.html" style="color: #333">
                  <MenuItem name="1-4" v-html="responseSider.data.data.menu[0].child[3].name"></MenuItem>
                </a>
                <a href="./compRecoverList.html" style="color: #333">
                  <MenuItem name="1-5" v-html="responseSider.data.data.menu[0].child[4].name"></MenuItem>
                </a>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  <span v-html="responseSider.data.data.menu[1].name"></span>
                </template>
                <a href="#" style="color: #333">
                  <MenuItem name="2-1" v-html="responseSider.data.data.menu[1].child[0].name"></MenuItem>
                </a>
                <a href="#" style="color: #333">
                  <MenuItem name="2-2" v-html="responseSider.data.data.menu[1].child[1].name"></MenuItem>
                </a>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  <span v-html="responseSider.data.data.menu[2].name"></span>
                </template>
                <a href="#" style="color: #333">
                  <MenuItem name="3-1" v-html="responseSider.data.data.menu[2].child[0].name"></MenuItem>
                </a>
                <a href="#" style="color: #333">
                  <MenuItem name="3-2" v-html="responseSider.data.data.menu[2].child[1].name"></MenuItem>
                </a>
              </Submenu>
            </Menu>
        </Sider>
        <!-- 导航 end -->
        <!-- main start -->
        <Layout :style="{padding: '10px 24px 24px'}">
          <!-- 加载相应的组件 start -->
          <!-- <managevue v-if="nav === 'manage'"></managevue> -->
          <tabvue v-if="nav === 'appManage'"></tabvue>
          <tabvue v-if="nav === 'appInstanceList'"></tabvue>
          <tabvue v-if="nav === 'appInstance'"></tabvue>
          <tabvue v-if="nav === 'appAlertList'"></tabvue>
          <tabvue v-if="nav === 'appAlertEdit'"></tabvue>
          <tabvue v-if="nav === 'appDetail'"></tabvue>
          <tabvue v-if="nav === 'compOverview'"></tabvue>
          <tabvue v-if="nav === 'compInstanceList'"></tabvue>
          <tabvue v-if="nav === 'compInstance'"></tabvue>
          <tabvue v-if="nav === 'compAlertList'"></tabvue>
          <tabvue v-if="nav === 'compAlertEdit'"></tabvue>
          <tabvue v-if="nav === 'compBackupsList'"></tabvue>
          <tabvue v-if="nav === 'compBackups'"></tabvue>
          <tabvue v-if="nav === 'compRecoverList'"></tabvue>
          <!-- 加载相应的组件 end -->
        </Layout>
        <!-- main end -->
      </layout>
    </layout>
    </div>
</template>
<script>
import tabvue from './tabvue.vue'
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
            menu: [
              {
                child: [
                  {
                    id: 34,
                    pid: 1,
                    name: 'name',
                    sort: 3
                  },
                  {
                    id: 34,
                    pid: 1,
                    name: 'name',
                    sort: 3
                  },
                  {
                    id: 34,
                    pid: 1,
                    name: 'name',
                    sort: 3
                  },
                  {
                    id: 34,
                    pid: 1,
                    name: '',
                    sort: 3
                  },
                  {
                    id: 34,
                    pid: 1,
                    name: 'name',
                    sort: 3
                  }
                ],
                id: 1,
                name: '',
                pid: 0,
                sort: 1
              },
              {
                child: [
                  {
                    id: 34,
                    pid: 1,
                    name: '',
                    sort: 3
                  },
                  {
                    id: 34,
                    pid: 1,
                    name: '',
                    sort: 3
                  }
                ],
                id: 1,
                name: '',
                pid: 0,
                sort: 1
              },
              {
                child: [
                  {
                    id: 34,
                    pid: 1,
                    name: '',
                    sort: 3
                  },
                  {
                    id: 34,
                    pid: 1,
                    name: '',
                    sort: 3
                  }
                ],
                id: 1,
                name: '',
                pid: 0,
                sort: 1
              }
            ],
            nav: ''
          },
          status: ''
        }
      }
    }
  },
  components: {
    // sidervue,
    // managevue,
    tabvue
  },
  computed: {
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
        case 'manage':
        case 'appDetail':
        case 'instanceDetail':
        case 'moniter':
          return '1-1'
        case 'instanceList':
          return '2-1'
        case 'auditList':
        case 'audit':
          return '2-2'
        default:
          //
          break
      }
    },
    openSider () {
      var position = window.location.href
      // console.log(position)
      var reg = /\/(\w*)\.html/
      reg.test(position)
      var $1 = RegExp.$1
      // console.log($1)
      switch ($1) {
        case 'appDetail':
        case 'auditList':
        case 'instanceList':
          return ['2']
        default:
          return ['1']
      }
    }
  },
  methods: {
    // 请求用户信息
    // 再根据用户信息，请求导航信息
    requestUserInfo () {
      this.$axios({
        method: 'post',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/user'
      }).then(response => {
        this.$store.dispatch('setUser', response.data.data)
        this.requestNav()
      }).catch(error => {
        console.log(error)
      })
    },
    // 请求导航的数据
    requestNav () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/menus'
      }).then(response => {
        console.log(response)
        this.responseSider = response
      })
    }
  },
  mounted () {
    this.requestUserInfo()
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
