<template>
  <div>
    <Row>
      <Col style="border-bottom: 1px solid #d8d8d8;">
        <h2><a href="javascript:history.go(-1)" style="text-decoration: none;color: #000;">＜ 应用管理</a></h2>
      </Col>
    </Row>
    <Row style="margin: 10px 0;">
      <Col span="20">
        <h1 v-html="responseDetail.data.data.name"></h1>
        <!-- <h1>学习中心概况</h1> -->
      </Col>
      <Col span="4">
        <Button type="primary" @click="modalMoniter = true">权限管理</Button>
        <Modal v-model="modalMoniter" title="权限管理" @on-ok="okMoniter" @on-cancel="cancelMoniter">
          <Form ref="formDataMoniter" :model="formDataMoniter" :rules="formruleMoniter" :label-width="80">
            <FormItem label="选择权限" prop="select">
              <Select v-model="formDataMoniter.select" placeholder="请选择权限种类">
                <!-- <Option value="999999">管理员</Option> -->
                <Option value="1">操作人员</Option>
                <Option value="2">查看人员</Option>
              </Select>
            </FormItem>
            <FormItem label="用户ID" prop="id">
              <Input v-model="formDataMoniter.id" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请用英文逗号分隔。如：1001,1002,1003"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitMoniter('formDataMoniter')">Submit</Button>
              <Button type="ghost" @click="handleResetMoniter('formDataMoniter')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
      </Col>
    </Row>
    <Row style="margin: 10px 0;">
      <Col>
        <p v-html="responseDetail.data.data.desc"></p>
      </Col>
    </Row>
    <Row style="margin: 5px 5px;">
      <Col span="4"><h6>所属部门</h6></Col>
      <Col span="8" v-html="responseDetail.data.data.department_name"></Col>
      <Col span="4"><h6>域名</h6></Col>
      <Col span="8" v-html="responseDetail.data.data.domain"></Col>
    </Row>
    <Row style="margin: 5px 5px;">
      <Col span="4"><h6>仓库地址</h6></Col>
      <Col span="8" v-html="responseDetail.data.data.repo_url"></Col>
      <Col span="4"><h6>WIKI地址</h6></Col>
      <Col span="8" v-html="responseDetail.data.data.wiki_url"></Col>
    </Row>
    <Row style="margin: 5px 5px;">
      <Col span="4"><h6>管理员</h6></Col>
      <Col span="8" v-html="responseDetail.data.data.admin_name"></Col>
      <Col span="4"><h6>创建时间</h6></Col>
      <Col span="8" v-html="responseDetail.data.data.created_at"></Col>
    </Row>
    <hr class="hr">
    <Row>
      <Col v-if="responseComp.data.data.length" style="margin: 0 0 15px 0;">
        <a :href="linkComp(item)" v-for="item in responseComp.data.data" :key="item.component_id">
          <Button v-html="item.component_name" class="comp"></Button>
        </a>
      </Col>
      <Col>
        <Button type="primary" class="comp" @click="modalAddComp = true">添加组件</Button>
        <Modal v-model="modalAddComp" title="添加组件">
          <Form ref="formDataAddComp" :model="formDataAddComp" :rules="formRuleAddComp" :label-width="100">
            <FormItem label="组件类型" prop="type">
              <Select v-model="formDataAddComp.type" placeholder="请选择组件类型">
                <Option value="1">redis</Option>
                <Option value="2">kafka</Option>
                <Option value="3">上线发布</Option>
                <Option value="4">日志中心</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitAddComp('formDataAddComp')">Submit</Button>
              <Button type="ghost" @click="handleResetAddComp('formDataAddComp')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'appDetail',
  data () {
    return {
      responseDetail: {
        data: {
          data: {},
          message: '',
          status: 0
        },
        status: 0
      },
      // moniter start
      modalMoniter: false,
      formDataMoniter: {
        select: '',
        id: ''
      },
      formruleMoniter: {
        select: [
          {required: true, message: '请选择组件类型', trigger: 'change'}
        ],
        id: [
          {required: true, message: '请按格式输入', trigger: 'blur'}
        ]
      },
      // moniter end
      responseComp: {
        data: {
          data: [],
          message: '',
          status: 0
        },
        status: 0
      },
      // 添加组件
      modalAddComp: false,
      formDataAddComp: {
        type: ''
      },
      formRuleAddComp: {
        type: [
          {required: true, message: '请选择组件类型', trigger: 'blur'}
        ]
      }
      // 添加组件
    }
  },
  components: {},
  computed: {},
  methods: {
    linkComp (item) {
      var href = './appInstanceList.html?componentId=' + item.component_id + '&token=' + this.getRequest().token
      return href
    },
    /* moniter start */
    okMoniter () {},
    cancelMoniter () {},
    handleSubmitMoniter (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/privileges?token=' + this.getRequest().token,
            data: {
              app_id: this.responseDetail.data.data.id,
              role_id: this.formDataMoniter.select,
              user_ids: this.formDataMoniter.id
            }
          }).then(response => {
            // console.log(response)
            this.modalMoniter = false
            this.feedbackFormStatus(response.data.status === 0)
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空')
        }
      })
    },
    handleResetMoniter (name) {
      this.$refs[name].resetFields()
    },
    /* moniter end */
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
    },
    handleSubmitAddComp (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/app-components?token=' + this.getRequest().token,
            data: this.qs.stringify({
              app_id: this.getRequest().id,
              component_id: this.formDataAddComp.type
            })
          }).then(response => {
            // console.log(response)
            this.modalAddComp = false
            console.log(response.data)
            console.log(response.data.status)
            this.feedbackFormStatus(response.data.status === 0)
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空')
        }
      })
    },
    handleResetAddComp (name) {
      this.$refs[name].resetFields()
    }
  },
  mounted () {
    // 请求应用详情数据
    this.$axios({
      method: 'get',
      url: `http://infra.xesv5.com/api/apps/${this.getRequest().id}?token=${this.getRequest().token}`
    }).then(response => {
      console.log('请求应用详情数据', response)
      this.responseDetail = response
    })
    // 请求与当前应用相关的组件
    this.$axios({
      method: 'get',
      // url: `http://infra.xesv5.com/api/apps/components/${this.getRequest().id}?token=${this.getRequest().token}`,
      url: `http://infra.xesv5.com/api/app-components/${this.getRequest().id}?token=${this.getRequest().token}`,
      data: this.qs.stringify({
        app_id: this.getRequest().id
      })
    }).then(response => {
      console.log(response)
      this.responseComp = response
    })
  }
}
</script>

<style lang="scss" scoped>
.hr {
  margin: 15px 0;
}
.comp {
  margin: 0px 8px;
}
</style>
