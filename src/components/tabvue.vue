<template>
  <div>
    <!-- <userInfoDefeat v-if="!userInfo.status"></userInfoDefeat> -->
    <!-- {{tabs}}
    <hr>
    {{testData}} -->
    <!-- {{tabs()}}
    <hr>
    {{tabs()[0]}}
    <hr>
    {{tabs()[1]}} -->
    <Tabs type="card" v-if="userInfo.userStatus">
      <TabPane :label="tabs[0]">
        <cardListvue :tab="tabs[0]">
          <Row slot="addApp">
            <Col style="text-align: right;">
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
        </cardListvue>
      </TabPane>
      <TabPane :label="tabs[1]">
        <cardListvue :tab="tabs[1]"></cardListvue>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
// import userInfoDefeat from './userInfoDefeat.vue'
import cardListvue from './cardListvue.vue'
export default {
  name: 'tab',
  data () {
    return {
      // tabs: this.tabArr()
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
      // tabs: this.setTabs()
    }
  },
  components: {
    // userInfoDefeat,
    cardListvue
  },
  computed: {
    /* 根据用户身份，显示选项卡。 start */
    userInfo () {
      // console.log(this.$store.getters.getUserInfo)
      return this.$store.getters.getUserInfo
    },
    tabs () {
      var b = this.userInfo.role
      // console.log(b)
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
    // setTabs () {
    //   var a = this.$store.getters.getUserInfo.role
    //   console.log(a)
    //   switch (a) {
    //     case 2:
    //       return ['我的应用', '其它应用']
    //     case 1:
    //       return ['概览', '审核管理']
    //   }
    // },
    // 添加应用
    handleSubmitAddApp (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            // url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps',
            url: 'http://infra.xesv5.com/api/apps?token=' + this.getRequest().token,
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
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
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
    }
  },
  mounted () {
    this.getRequest()
  }
}
</script>

<style lang="scss" scoped>

</style>
