<template>
  <div class="layout">
    <layout>
      <!-- 头部 start -->
      <Header theme="dark" class="title">
        <Row>
          <Col span="8">
            <h1>应用管理后台</h1>
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
                  {{responseSider.data.data[1].name}}
                </template>
                <a href="./instanceList.html" style="color: #333"><MenuItem name="1-1" v-html='responseSider.data.data[1].child[0].name'></MenuItem></a>
                <a href="./auditList.html" style="color: #333"><MenuItem name="1-2" v-html='responseSider.data.data[1].child[1].name'></MenuItem></a>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  Codis
                </template>
                <MenuItem name="2-1">2-1</MenuItem>
                <MenuItem name="2-2">2-2</MenuItem>
                <MenuItem name="2-3">2-3</MenuItem>
                <MenuItem name="2-4">2-4</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  gateway
                </template>
                <MenuItem name="3-1">3-1</MenuItem>
                <MenuItem name="3-2">3-2</MenuItem>
                <MenuItem name="3-3">3-3</MenuItem>
                <MenuItem name="3-4">3-4</MenuItem>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  用来测试的
                </template>
                <a href="./instanceList.html">
                  <MenuItem name="4-1">实例列表</MenuItem>
                </a>
                <a href="./alertList.html">
                  <MenuItem name="4-2">告警策略</MenuItem>
                </a>
                <a href="#">
                  <MenuItem name="4-3">性能监控</MenuItem>
                </a>
              </Submenu>
            </Menu>
        </Sider>
        <!-- <sidervue :curSelectedNav="curSelectedNav"></sidervue> -->
        <!-- 导航 end -->
        <!-- main start -->
        <Layout :style="{padding: '10px 24px 24px'}">
          <!-- <router-view> -->
            <!-- <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                Content
            </Content> -->
          <!-- </router-view> -->
          <!-- 加载相应的组件 start -->
          <!-- <managevue v-if="nav === 'manage'"></managevue> -->
          <tabvue v-if="nav === 'appManage'"></tabvue>
          <tabvue v-if="nav === 'compOverview'"></tabvue>
          <!-- 加载相应的组件 end -->
        </Layout>
        <!-- main end -->
      </layout>
    </layout>
    </div>
</template>
<script>
// import sidervue from './sidervue.vue'
// import managevue from './managevue.vue'
import tabvue from './tabvue.vue'
export default {
  name: 'layoutvue',
  props: ['nav'],
  data: function () {
    return {
      imgUrl: './static/images/food.jpg',
      curPage: '',
      responseSider: {
        data: {
          data: [
            {
              name: ''
            },
            {
              name: '',
              child: [
                {
                  name: ''
                },
                {
                  name: ''
                }
              ]
            }
          ],
          message: '',
          status: ''
        },
        status: ''
      }
    }
  },
  components: {
    // sidervue,
    // managevue,
    tabvue
    // instanceDetail,
    // moniter,
    // instanceList,
    // auditList,
    // auditvue,
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
        // console.log(response)
        // console.log(this)
        // this.userInfo = response.data.data
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
        // console.log(response)
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
