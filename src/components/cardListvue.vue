<template>
  <div>
    <!-- <slot name='addApp'></slot> -->
    <Row>
      <Col span="12" v-if="tab === '我的应用'">
        <Row :gutter="15">
          <Col span="16">
            <Input type="text" v-model="searchText" placeholder="可以搜索应用名称/应用id"></Input>
          </Col>
          <Col span="8">
            <Button type="primary" @click="selectMyAppListData(searchText)">检索</Button>
          </Col>
        </Row>
      </Col>
      <Col span="12" v-if="tab === '其它应用'">
        <Row :gutter="15">
          <Col span="16">
            <Input type="text" v-model="searchText" placeholder="可以搜索应用名称/应用id"></Input>
          </Col>
          <Col span="8">
            <Button type="primary" @click="selectElseListData(searchText)">检索</Button>
          </Col>
        </Row>
      </Col>
      <!-- 第一期不做概览 -->
      <!-- <Col span="12" v-if="tab === '概览'">
        <Row :gutter="15">
          <Col span="16">
            <Input type="text" v-model="searchText" placeholder="可以搜索应用名称/应用id"></Input>
          </Col>
          <Col span="8">
            <Button type="primary" @click="selectOverviewListData(searchText)">检索</Button>
          </Col>
        </Row>
      </Col> -->
      <Col span="12" style="text-align: right;" v-if="role">
        <Button type="primary" @click="modalAddApp = true">添加应用</Button>
        <Modal v-model="modalAddApp" title="添加应用">
          <Form ref="formDataAddApp" :model="formDataAddApp" :rules="formRuleAddApp" :label-width="80">
            <FormItem label="应用名称" prop="name">
              <Input type="text" v-model="formDataAddApp.name" placeholder="请输入应用名称"></Input>
            </FormItem>
            <FormItem label="描述" prop="describe">
              <Input type="text" v-model="formDataAddApp.describe" placeholder="请输入描述"></Input>
            </FormItem>
            <!-- <FormItem label="所属部门" prop="department_name">
              <Input type="text" v-model="formDataAddApp.department_name" placeholder="请输入所属部门"></Input>
            </FormItem> -->
            <FormItem label="所属域" prop="domain">
              <Input type="text" v-model="formDataAddApp.domain" placeholder="请输入所属域"></Input>
            </FormItem>
            <FormItem label="仓库地址" prop="compAddress">
              <Input type="text" v-model="formDataAddApp.compAddress" placeholder="请输入仓库地址"></Input>
            </FormItem>
            <FormItem label="WIKI地址" prop="wikiAddress">
              <Input type="text" v-model="formDataAddApp.wikiAddress" placeholder="请输入WIKI地址"></Input>
            </FormItem>
            <FormItem label="申请原因" prop="reason">
              <Input type="textarea" v-model="formDataAddApp.reason" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入申请原因"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitAddApp('formDataAddApp')">Submit</Button>
              <Button type="ghost" @click="handleResetAddApp('formDataAddApp')" style="margin-left: 8px;">Reset</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
      </Col>
    </Row>
    <!-- <cardvue v-if='isRenderMyApp' v-for="item in responseMyApp.data.data" :key="item.id" :item="item"></cardvue>
    <cardvue v-if='isRenderElseApp' v-for="item in responseElseApp.data.data" :key="item.id" :item="item"></cardvue>
    <cardvue v-if='isRenderAudit' v-for="item in responseAudit.data.data" :key="item.id" :item="item"></cardvue> -->
    <cardvue v-if='isRenderMyApp' v-for="item in myAppBox" :key="item.id" :item="item"></cardvue>
    <cardvue v-if='isRenderElseApp' v-for="item in elseAppBox" :key="item.id" :item="item"></cardvue>
    <cardvue v-if='isRenderAudit' v-for="item in auditBox" :key="item.id" :item="item"></cardvue>
  </div>
</template>

<script>
import cardvue from './cardvue.vue'
export default {
  name: 'cardListvue',
  props: ['tab'],
  data () {
    return {
      searchText: '',
      /* add app start */
      modalAddApp: false,
      formDataAddApp: {
        name: '',
        describe: '',
        // department_name: '',
        domain: '',
        compAddress: '',
        wikiAddress: '',
        reason: ''
      },
      formRuleAddApp: {
        name: [
          {required: true, message: '请输入应用名称', trigger: 'change'}
        ],
        describe: [
          {required: true, message: '请输入描述', trigger: 'change'}
        ],
        // department_name: [
        //   {required: true, message: '请输入所属部门', trigger: 'change'}
        // ],
        domain: [
          {required: true, message: '请输入所属域', trigger: 'change'}
        ],
        compAddress: [
          {required: true, message: '请输入仓库地址', trigger: 'change'}
        ],
        wikiAddress: [
          {required: true, message: '请输入WIKI地址', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请输入申请原因', trigger: 'change'}
        ]
      },
      /* add app end */
      a: false,
      b: true,
      responseMyApp: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      myAppBox: [],
      responseElseApp: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      elseAppBox: [],
      responseOverview: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      overviewBox: [],
      responseAudit: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      auditBox: []
    }
  },
  components: {
    cardvue
  },
  computed: {
    role () {
      var role = this.$store.getters.getUserInfo.role
      switch (role) {
        case 1:
          return false
        case 2:
          return true
        default:
          return false
      }
    },
    isRenderMyApp () {
      return this.tab === '我的应用'
    },
    isRenderElseApp () {
      return this.tab === '其它应用'
    },
    isRenderOverview () {
      return this.tab === '概览'
    },
    isRenderAudit () {
      return this.tab === '审核管理'
    }
  },
  methods: {
    // 添加应用
    handleSubmitAddApp (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/apps?token=' + this.$store.getters.getUserInfo.token,
            data: this.qs.stringify({
              token: this.getRequest().token,
              app_id: '',
              app_key: '',
              name: this.formDataAddApp.name,
              type: '',
              desc: this.formDataAddApp.describe,
              domain: this.formDataAddApp.domain,
              wiki_url: this.formDataAddApp.wikiAddress,
              // resp_url: this.formDataAddApp.compAddress,
              repo_url: this.formDataAddApp.compAddress,
              creator_id: this.$store.getters.getUserInfo.uid,
              // group_id: this.formDataAddApp.department_name,
              status: ''// 不知道为什么没有申请原因
            })
          }).then(response => {
            console.log(response)
            this.modalAddApp = false
            this.feedbackFormStatus(response.data.status === 0)
            // 刷新表格
            // this.refreshList()
            // 第一期做成全页面刷新。
            // this.refresh()
          })
        } else {
          this.$Message.error('不可为空')
        }
      })
    },
    handleResetAddApp (name) {
      this.$refs[name].resetFields()
    },
    // 回馈提交状态
    feedbackFormStatus (bool) {
      if (bool) {
        this.$Message.success('操作成功！')
      } else {
        this.$Message.error('操作失败！')
      }
    },
    /* 搜索 start */
    selectMyAppListData (condition) {
      this.myAppBox = this.search(this.responseMyApp, condition)
      console.log(this.myAppBox)
    },
    search (response, condition) {
      var result = []
      var data = response.data.data
      if (!data.length) { return [] }
      if (!condition) {
        result = data
      } else {
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          // result.push(data)
          if (data[i].name.indexOf(condition) !== -1 || data[i].id.toString().indexOf() !== -1) {
            result.push(data[i])
          }
        }
      }
      console.log(result)
      return result
    },
    /* 搜索 end */
    // 各请求方法
    requestMyApp () {
      this.$axios({
        method: 'get',
        // url: 'http://infra.xesv5.com/api/apps/mine'
        // url: 'http://infra.xesv5.com/api/apps/mine?token=' + this.getRequest().token
        // url: 'http://infra.xesv5.com/api/apps?token=' + this.$store.getters.getUserInfo.token
        url: `http://infra.xesv5.com/api/apps?token=${this.getRequest().token}`
      }).then(response => {
        // console.log(response)
        this.responseMyApp = response
        this.selectMyAppListData()
      })
    },
    requestElseApp () {
      this.$axios({
        method: 'get',
        // url: 'http://infra.xesv5.com/api/apps/mine'
        // url: 'http://infra.xesv5.com/api/apps/others?token=' + this.getRequest().token
        // url: 'http://infra.xesv5.com/api/apps?token=' + this.$store.getters.getUserInfo.token
        url: `http://infra.xesv5.com/api/apps?type=${1}&token=${this.getRequest().token}`
      }).then(response => {
        // console.log(response)
        this.responseElseApp = response
        this.selectElseListData()
      })
    },
    requestOverview () {
      this.$axios({
        method: 'get',
        // url: 'http://infra.xesv5.com/api/apps/mine'
        // url: 'http://infra.xesv5.com/api/apps/mine?token=' + this.getRequest().token
        // url: 'http://infra.xesv5.com/api/apps?token=' + this.$store.getters.getUserInfo.token
        url: `http://infra.xesv5.com/api/redis/general_data?token=${this.getRequest().token}`
      }).then(response => {
        // console.log(response)
        this.responseOverview = response
      })
    },
    requestAudit () {
      this.$axios({
        method: 'get',
        // url: 'http://infra.xesv5.com/api/apps/mine'
        // url: 'http://infra.xesv5.com/api/apps/others?token=' + this.getRequest().token
        // url: 'http://infra.xesv5.com/api/apps?token=' + this.$store.getters.getUserInfo.token
        // url: 'http://infra.xesv5.com/api/apps?token=' + this.getRequest().token
        url: `http://infra.xesv5.com/api/redis/general_data?type=${1}&token=${this.getRequest().token}`
      }).then(response => {
        // console.log(response)
        this.responseAudit = response
      })
    },
    // 请求相应的数据
    requestTabData () {
      switch (this.tab) {
        case '我的应用':
          this.requestMyApp()
          this.a = true
          break
        case '其它应用':
          this.requestElseApp()
          break
        case '概览':
          this.requestOverview()
          break
        case '审核管理':
          this.requestAudit()
          break
      }
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
      return theRequest
    },
    refresh () {
      console.log('refresh')
      history.go(0)
    }
  },
  mounted () {
    // 请求应用选项卡里的数据
    this.requestTabData()
  }
}
</script>

<style lang="scss" scoped>

</style>
