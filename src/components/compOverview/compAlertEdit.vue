<template>
  <div>
    <!-- appAlertEdit -->
    <Form ref="formDataAlertPolicy" :model="formDataAlertPolicy" :rules="formRuleAlertPolicy" :label-width="100">
      <FormItem label="策略名称" prop="name">
        <Input v-model="formDataAlertPolicy.name" placeholder="请输入策略名称"></Input>
      </FormItem>
      <FormItem label="策略类型" prop="policyType">
        <Select v-model="formDataAlertPolicy.policyType" placeholder="请选择策略类型">
          <Option value="redis">Redis基础监控</Option>
          <Option value="codis">codis</Option>
          <Option value="gateway">gateway</Option>
        </Select>
      </FormItem>
      <FormItem label="所属应用" prop="app">
        <Select v-model="formDataAlertPolicy.app" placeholder="请选择所属应用">
          <Option value="learn">学习中心</Option>
          <Option value="learn1">学习中心1</Option>
          <Option value="learn2">学习中心2</Option>
        </Select>
      </FormItem>
      <FormItem label="告警对象" prop="alertObj">
        <RadioGroup v-model="formDataAlertPolicy.alertObj">
          <Radio label="1">全部实例</Radio>
          <Radio label="2">部分实例</Radio>
        </RadioGroup>
      </FormItem>
      <Transfer v-if="transferShow" :data="transferData" :target-keys="transferTargetKey" :render-format="transferRender" @on-change="transferHandleChange" style="margin: 0 0 24px 80px;"></Transfer>
      <Row>
        <Col style="width: 80px;">
          告警策略
        </Col>
        <Col>
          placeholder
        </Col>
      </Row>
      <FormItem label="设置告警群" prop="dingdingName">
        <Input v-model="formDataAlertPolicy.dingdingName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入告警群"></Input>
      </FormItem>
      <FormItem style="margin: 0 0 0 100px;">
        <Button type="primary" @click="handleSubmitAndPolicy('formDataAlertPolicy')">Submit</Button>
        <Button type="ghost" @click="handleResetAndPolicy('formDataAlertPolicy')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'appAlertEdit',
  data () {
    return {
      // formDataAlertPolicy: {
      //   name: '',
      //   policyType: '',
      //   app: '',
      //   alertObj: '',
      //   dingdingName: ''
      // },
      formRuleAlertPolicy: {
        name: [
          {required: true, message: '请输入策略名称', trigger: 'change'}
        ],
        policyType: [
          {required: true, message: '请选择策略类型', trigger: 'change'}
        ],
        app: [
          {required: true, message: '请选择所属应用', trigger: 'change'}
        ],
        alertObj: [
          {required: true, message: '请选择告警对象', trigger: 'change'}
        ],
        dingdingName: [
          {required: true, message: '请输入告警策略名称', trigger: 'change'}
        ]
      },
      responseAlertPolicy: {
        data: {
          data: {},
          message: '',
          status: 0
        },
        status: 0
      }
    }
  },
  components: {},
  computed: {
    transferShow () {
      return this.formDataAlertPolicy.alertObj === '2'
    },
    formDataAlertPolicy () {
      if (!this.responseAlertPolicy.data.data) {
        return {
          application_group: '',
          application_id: '',
          component_id: '',
          id: '',
          instance_group: '',
          metric_group: '',
          metric_info: '',
          name: '',
          operator_group: '',
          period_group: '',
          target_group: '',
          token: ''
        }
      }
      var data = this.responseAlertPolicy.data.data
      return {
        application_group: data.application_group,
        application_id: data.application_id,
        component_id: data.component_id,
        id: data.id,
        instance_group: data.instance_group,
        metric_group: data.metric_group,
        metric_info: data.metric_info,
        name: data.name,
        operator_group: data.operator_group,
        period_group: data.period_group,
        target_group: data.target_group,
        token: data.token
      }
    }
  },
  methods: {
    /* 编辑策略 start */
    handleSubmitAndPolicy (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://10.99.1.135/api/alarm/edit',
            data: this.qs.stringify({
              name: this.formDataAlertPolicy.name,
              type: this.formDataAlertPolicy.policyType,
              application_id: this.formDataAlertPolicy.app, // 应当没有
              target: 'all',
              metric_id: ['', ''],
              token: 'token',
              threshold: ['', ''],
              operator_id: ['', ''],
              period_id: ['', ''],
              instance_id: '',
              dingding_name: this.formDataAlertPolicy.dingdingName,
              id: this.getRequest().id,
              index: ''
            })
          }).then(response => {
            console.log(response)
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空!')
        }
      })
    },
    handleResetAndPolicy (name) {
      this.$refs[name].resetFields()
    },
    /* 编辑策略 end */
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
    // 请求原始数据
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/api/alarm/edit_page/id/' + this.getRequest().id
      // url: 'http://10.99.1.135/api/alarm/edit_page/id/10'
    }).then(response => {
      console.log(response)
      this.responseAlertPolicy = response
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
