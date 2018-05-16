<template>
  <div>
    <Tabs :value="tabActive()" type="card" v-if="userInfo.userStatus" @on-click="midifyTabActive">
      <TabPane :label="tabs[0]" name="one">
        <cardListvue :tab="tabs[0]">
        </cardListvue>
      </TabPane>
      <TabPane :label="tabs[1]" name="two">
        <cardListvue :tab="tabs[1]" v-if="tabs[1] === '其它应用'"></cardListvue>
        <auditmanage v-else></auditmanage>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
// import userInfoDefeat from './userInfoDefeat.vue'
import cardListvue from './cardListvue.vue'
import auditmanage from './compOverview/compAuditList.vue'
export default {
  name: 'tab',
  data () {
    return {
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
      }
    }
  },
  components: {
    // userInfoDefeat,
    cardListvue,
    auditmanage
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
    /* 根据用户身份，显示选项卡。 start */
    userInfo () {
      return this.$store.getters.getUserInfo
    },
    tabs () {
      var b = this.userInfo.role
      switch (b) {
        case 2:
          return ['我的应用', '其它应用']
        case 1:
          return ['概览', '审核管理']
      }
    }
    /* 根据用户身份，显示选项卡。 end */
  },
  methods: {
    tabActive () {
      var pageInfoStr = window.localStorage.pageInfo
      var pageInfo = JSON.parse(pageInfoStr)
      console.log(pageInfo)
      return pageInfo.appInstanceList.curTab
    },
    // 点击tab时
    midifyTabActive (name) {
      console.log(name)
      var pageInfo = this.$store.getters.getPageInfo
      pageInfo.appInstanceList.curTab = name
      // 保存到vuex
      this.$store.dispatch('setPageInfo', pageInfo)
      // 保存到localStorage
      window.localStorage.pageInfo = JSON.stringify(pageInfo)
    },
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
            this.feedbackFormStatus(response.data.status === 0, response.data.data)
            // 刷新表格
            // this.refreshList()
            // 第一期做成全页面刷新。
            this.refresh()
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
    feedbackFormStatus (bool, message) {
      if (bool) {
        this.$Message.success('操作成功！')
        setTimeout(function(){
          this.$Message.success(message)
        },800)
      } else {
        this.$Message.error('操作失败！')
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
    },
    refreshList () {
      console.log('refreshList')
      this.$emit('')
    },
    addAppEvent () {
      console.log('addAppEvent')
    }
  },
  created () {
    this.$on('addAppEvent', this.addAppEvent)
  },
  mounted () {
    // this.getRequest()
  }
}
</script>

<style lang="scss" scoped>

</style>
