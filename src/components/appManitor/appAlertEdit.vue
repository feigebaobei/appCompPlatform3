<template>
  <div>
    <Row style="margin: 0 0 25px 0;">
      <Col style="border-bottom: 1px solid #d8d8d8;">
        <h2><a href="javascript:history.go(-1)" style="text-decoration: none;color: #000;">＜ 告警策略</a></h2>
      </Col>
    </Row>
    <!-- appAlertEdit -->
    <Form ref="formDataAddAlert" :model="formDataAddAlert" :rules="fromRuleAddAlert" :label-width="100">
      <FormItem label="策略名称" prop="name">
        <Input v-model="formDataAddAlert.name" placeholder="请输入策略名称"></Input>
      </FormItem>
      <FormItem label="策略类型" prop="policyType">
        <Select v-if="add_page.policy_type_group" v-model="formDataAddAlert.policyType" placeholder="请选择策略类型">
          <Option :value="item.id" v-for="item in add_page.policy_type_group" :key="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="所属应用" prop="app">
        <Select v-model="formDataAddAlert.app" placeholder="请选择所属应用">
          <Option :value="item.id" v-for="item in add_page.application_group" :key="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="告警对象" prop="alertObj">
        <RadioGroup v-model="formDataAddAlert.alertObj">
          <Radio :label="item.id" v-for="item in add_page.target_group" :key="item.id">{{item.name}}</Radio>
        </RadioGroup>
      </FormItem>
      <transfervue v-show="transferShow" :instancesId="formDataAddAlert.app" :targetKeys="formDataAddAlert.instance_id" @modifyTransferData="modifyTransferData"></transfervue>
      <FormItem label="告警策略">
        <Row v-if="add_page.metric_group.length" v-for="(item, index) in add_page.metric_group" :key="item.id" :gutter="15" style="margin: 0 0 20px 0">
          <Col span="3">
            <span v-html="item.name"></span>
          </Col>
          <Col span="5">
            <FormItem :prop="formPropAddAlert[index].operator">
              <Select v-model="formDataAddAlert.operator_id[index]" placeholder="请选择操作符">
                <Option :value="subItem.id" v-for="subItem in add_page.operator_group" :key="subItem.id">{{subItem.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem :prop="formPropAddAlert[index].threshold">
              <Input v-model="formDataAddAlert.threshold[index]" placeholder="请输入阈值"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem :prop="formPropAddAlert[index].period">
              <Select v-model="formDataAddAlert.period_id[index]" placeholder="请选择周期">
                <Option :value="subItem.id" v-for="subItem in add_page.period_group" :key="subItem.id">{{subItem.full_name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="设置告警群" prop="dingdingName">
        <Input v-model="formDataAddAlert.dingdingName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入告警群"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmitAndAlert('formDataAddAlert')">Submit</Button>
        <Button type="ghost" @click="handleResetAndAlert('formDataAddAlert')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import transfervue from '../transfer.vue'
export default {
  name: 'appAlertEdit',
  data () {
    return {
      add_page: {},
      alertListData: [],
      // instancesId: this.,
      responseAlertList: {
        data: {
          data: [],
          message: '',
          status: 0
        },
        status: 0
      },
      /* 创建告警策略 start */
      modalAddAert: false,
      formPropAddAlert: [
        {
          operator: 'cpuOperater',
          threshold: 'cpuThreshold',
          period: 'cpuPeriod'
        },
        {
          operator: 'connOperater',
          threshold: 'connThreshold',
          period: 'connPeriod'
        },
        {
          operator: 'opsOperater',
          threshold: 'opsThreshold',
          period: 'opsPeriod'
        }
      ],
      formDataAddAlert: {
        name: '',
        policyType: '',
        app: '',
        alertObj: '',
        instance_id: '',
        metric_id: [],
        operator_id: [],
        threshold: [],
        period_id: [],
        dingdingName: ''
      },
      fromRuleAddAlert: {
        name: [
          {required: true, message: '请输入策略名称', trigger: 'change'}
          // {validator: this.validateName, trigger: 'change'}
        ],
        policyType: [
          {required: true, message: '请选择策略类型', pattern: /.+/, trigger: 'change'}
          // {validator: this.validatePolicyType, trigger: 'change'}
        ],
        app: [
          {required: true, message: '请选择所属应用', pattern: /.+/, trigger: 'change'}
          // {validator: this.validateApp, trigger: 'change'}
        ],
        alertObj: [
          {required: true, message: '请选择告警对象', pattern: /.+/, trigger: 'change'}
          // {validator: this.validateAlertObj, trigger: 'change'}
        ],
        cpuOperater: [
          // {required: true, message: '请选择告警对象', pattern: /.+/, trigger: 'change'}
          {validator: this.cpuOperater, trigger: 'change'}
        ],
        cpuThreshold: [
          // {required: true, message: '请选择告警对象', pattern: /.+/, trigger: 'change'}
          {validator: this.cpuThreshold, trigger: 'change'}
        ],
        cpuPeriod: [
          {validator: this.cpuPeriod, trigger: 'change'}
        ],
        connOperater: [
          {validator: this.connOperater, trigger: 'change'}
        ],
        connThreshold: [
          {validator: this.connThreshold, trigger: 'change'}
        ],
        connPeriod: [
          {validator: this.connPeriod, trigger: 'change'}
        ],
        opsOperater: [
          {validator: this.opsOperater, trigger: 'change'}
        ],
        opsThreshold: [
          {validator: this.opsThreshold, trigger: 'change'}
        ],
        opsPeriod: [
          {validator: this.opsPeriod, trigger: 'change'}
        ],
        dingdingName: [
          {required: true, message: '请输入告警策略名称', pattern: /.+/, trigger: 'change'}
        ]
      }
    }
  },
  components: {
    transfervue
  },
  computed: {
    transferShow () {
      return this.formDataAddAlert.alertObj === 2
    },
    instancesIdComputed () {
      var instanceId = this.formItem.instance_id
      console.log(instanceId)
      if (!instanceId.length) {
        return []
      } else {
        var arr = instanceId.split(',')
        console.log(arr)
        return arr
      }
    }
  },
  methods: {
    /* 编辑策略 start */
    handleSubmitAndAlert (name) {
      this.metricMethod(this.add_page.metric_group)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/alarm/edit?token=' + this.getRequest().token,
            data: this.qs.stringify({
              name: this.formDataAddAlert.name,
              type: this.formDataAddAlert.policyType,
              application_id: this.formDataAddAlert.app,
              target: this.formDataAddAlert.alertObj,
              token: this.getRequest().token,
              metric_id: this.formDataAddAlert.metric_id,
              operator_id: this.formDataAddAlert.operator_id,
              threshold: this.formDataAddAlert.threshold,
              period_id: this.formDataAddAlert.period_id,
              instance_id: this.formDataAddAlert.instance_id.join(','),
              dingding_name: this.formDataAddAlert.dingdingName,
              id: this.getRequest().id
            })
          }).then(response => {
            console.log(response)
            this.feedbackFormStatus(response.data.status === 0, response.data.data)
            // window.history.go(-1)
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空!')
        }
      })
    },
    metricMethod (metricGroup) {
      var arr = []
      for (var i = 0, iLen = metricGroup.length; i < iLen; i++) {
        arr.push(metricGroup[i].id)
      }
      this.formDataAddAlert.metric_id = arr
      console.log(this.formDataAddAlert.metric_id)
    },
    handleResetAndAlert (name) {
      this.$refs[name].resetFields()
    },
    /* 编辑策略 end */
    // 回馈提交状态
    feedbackFormStatus (bool, message) {
      if (bool) {
        this.$Message.success('操作成功！')
        setTimeout(function () {
          history.go(-1)
        }, 800)
      } else {
        this.$Message.error('操作失败！')
        this.$Message.error(message)
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
    cpuOperater (rule, value, callback) {
      value = this.formDataAddAlert.operator_id[0]
      // console.log(this.formDataAddAlert)
      // console.log(rule)
      console.log(value)
      // console.log(callback)
      if (value === '' || value === undefined) {
        callback(new Error('请选择操作符'))
      } else {
        callback()
      }
    },
    cpuThreshold (rule, value, callback) {
      value = this.formDataAddAlert.threshold[0]
      console.log(value)
      if (value === '' || value === undefined) {
        callback(new Error('请输入阈值'))
      } else {
        // callback()
        // var reg = /^\+?[0-9].?[0-9]*$/
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (reg.test(value)) {
          if (value < 0) {
            callback(new Error('请输入大于0的数字'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入大于0的数字'))
        }
      }
    },
    cpuPeriod (rule, value, callback) {
      value = this.formDataAddAlert.period_id[0]
      console.log(value)
      if (value === '' || value === undefined) {
        callback(new Error('请选择周期'))
      } else {
        callback()
      }
    },
    connOperater (rule, value, callback) {
      value = this.formDataAddAlert.operator_id[1]
      // console.log(this.formDataAddAlert)
      // console.log(rule)
      console.log(value)
      // console.log(callback)
      if (value === '' || value === undefined) {
        callback(new Error('请选择操作符'))
      } else {
        callback()
      }
    },
    connThreshold (rule, value, callback) {
      value = this.formDataAddAlert.threshold[1]
      console.log(value)
      if (value === '') {
        callback(new Error('请输入阈值'))
      } else {
        // callback()
        // var reg = /^\+?[0-9].?[0-9]*$/
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (reg.test(value)) {
          if (value < 0) {
            callback(new Error('请输入大于0的数字'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入大于0的数字'))
        }
      }
    },
    connPeriod (rule, value, callback) {
      value = this.formDataAddAlert.period_id[1]
      console.log(value)
      if (value === '' || value === undefined) {
        callback(new Error('请选择周期'))
      } else {
        callback()
      }
    },
    opsOperater (rule, value, callback) {
      value = this.formDataAddAlert.operator_id[2]
      // console.log(this.formDataAddAlert)
      // console.log(rule)
      console.log(value)
      // console.log(callback)
      if (value === '' || value === undefined) {
        callback(new Error('请选择操作符'))
      } else {
        callback()
      }
    },
    opsThreshold (rule, value, callback) {
      value = this.formDataAddAlert.threshold[2]
      console.log(value)
      if (value === '') {
        callback(new Error('请输入阈值'))
      } else {
        // callback()
        // var reg = /^\+?[0-9].?[0-9]*$/
        var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
        if (reg.test(value)) {
          if (value < 0) {
            callback(new Error('请输入大于0的数字'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入大于0的数字'))
        }
      }
    },
    opsPeriod (rule, value, callback) {
      value = this.formDataAddAlert.period_id[2]
      console.log(value)
      if (value === '' || value === undefined) {
        callback(new Error('请选择周期'))
      } else {
        callback()
      }
    },
    // modifyTransferData
    modifyTransferData (params) {
      console.log('params', params)
      this.formDataAddAlert.instance_id = params
    }
  },
  mounted () {
    // 编辑数据内容
    this.$axios({
      method: 'get',
      url: 'http://infra.xesv5.com/api/alarm/edit_page/id/' + this.getRequest().id + '?token=' + this.getRequest().token
    }).then(res => {
      let arr = []
      this.add_page = res.data.data
      this.formDataAddAlert.name = this.add_page.name
      this.formDataAddAlert.policyType = this.add_page.policy_type
      this.formDataAddAlert.app = this.add_page.application_id
      this.formDataAddAlert.alertObj = this.add_page.target_type
      for (let i = 0; i < this.add_page.instance_group.length; i++) {
        arr.push(this.add_page.instance_group[i].instance_id)
      }
      this.formDataAddAlert.instance_id = arr
      for (let i = 0; i < this.add_page.metric_info.length; i++) {
        this.formDataAddAlert.operator_id[i] = this.add_page.metric_info[i].operator
        this.formDataAddAlert.threshold[i] = this.add_page.metric_info[i].threshold
        this.formDataAddAlert.period_id[i] = this.add_page.metric_info[i].period
      }
      this.formDataAddAlert.dingdingName = this.add_page.dingding_name
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
