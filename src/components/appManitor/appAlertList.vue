<template>
  <div>
    <Row style="margin: 15px 0;">
      <Col span="12">
        <h1>告警策略</h1>
      </Col>
      <Col span="12" style="text-align: right;">
        <Button type="primary" @click="modalAddAert = true">创建告警策略</Button>
        <Modal v-model="modalAddAert" title="创建告警策略" width="700">
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
                <!-- <Option value='1'>1</Option>
                <Option value='2'>2</Option>
                <Option value='3'>3</Option> -->
              </Select>
            </FormItem>
            <FormItem label="告警对象" prop="alertObj">
              <RadioGroup v-model="formDataAddAlert.alertObj">
                <Radio :label="item.id" v-for="item in add_page.target_group" :key="item.id">{{item.name}}</Radio>
              </RadioGroup>
            </FormItem>
            <!-- <Transfer v-if="transferShow" :data="transferData" :target-keys="transferTargetKey" :render-format="transferRender" @on-change="transferHandleChange" style="margin: 0 0 24px 80px;"></Transfer> -->
            <transfervue v-show="transferShow" :instancesId="formDataAddAlert.app" :targetKey="formDataAddAlert.instance_id" @modifyTransferData="modifyTransferData"></transfervue>
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
          <div slot="footer"></div>
        </Modal>
      </Col>
    </Row>
    <!-- <hr class="hr"> -->
    <Table height="600" border :data="alertListData" :columns="alertListColumns"></Table>
    <Modal v-model="modalOperate" title="请确定">
      <p>您要{{curRowData.status === '已停用' ? '启用' : '停用'}}告警策略 监控CPU 吗？</p>
      <Row style="margin: 25px 0 0 0;">
        <Col style="text-align: right;">
          <Button type="primary" @click="handleSubmitOperator(curRowData)">确定</Button>
          <Button type="ghost" @click="handleCancelOperator(curRowData)">取消</Button>
        </Col>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import transfervue from '../transfer.vue'
export default {
  name: 'compAlertList',
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
        instance_id: [],
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
      },
      /* 创建告警策略 end */
      // 穿梭框 start
      transferData: [
        {
          key: 'key0',
          label: 'label0'
        },
        {
          key: 'key1',
          label: 'label1'
        },
        {
          key: 'key2',
          label: 'label2'
        },
        {
          key: 'key3',
          label: 'label3'
        },
        {
          key: 'key4',
          label: 'label4'
        }
      ],
      transferTargetKey: ['key0', 'key3'],
      alertListColumns: [
        {
          title: 'id',
          key: 'id',
          align: 'center',
          sortable: true
        },
        {
          title: '策略名称',
          align: 'center',
          sortable: true,
          // key: 'policy_name'
          render: (h, params) => {
            return h('a', {
              attrs: {
                // href: './compAlertEdit.html?id=' + params.row.id
                href: `./appAlertEdit.html?id=${params.row.id}&token=${this.getRequest().token}`
              }
            }, params.row.policy_name)
          }
        },
        {
          title: '策略类型',
          key: 'policy_type',
          align: 'center',
          sortable: true
        },
        {
          title: '触发条件',
          key: 'trigger_condition',
          align: 'center',
          sortable: true
        },
        {
          title: '所属应用',
          key: 'application_name',
          align: 'center',
          sortable: true
        },
        {
          title: '上次操作人',
          key: 'operator'
        },
        {
          title: '告警群',
          key: 'dingding_name',
          align: 'center',
          sortable: true
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          sortable: true
        },
        {
          title: '操作',
          key: '',
          render: (h, params) => {
            return h('Button', {
              on: {
                click: () => {
                  console.log(params)
                  this.modalOperate = true
                  this.operatorPolicy(params.row)// 保存当前行数据
                }
              },
              attrs: {
                // type: 'primary'
              }
            }, params.row.status === '已停用' ? '启用' : '停用')
          }
        }
      ],
      // 穿梭框 end
      modalOperate: false,
      curRowData: {}
    }
  },
  components: {
    transfervue
  },
  computed: {
    transferShow () {
      return this.formDataAddAlert.alertObj === 2
    }
  },
  methods: {
    cpuOperater (rule, value, callback) {
      value = this.formDataAddAlert.operator_id[0]
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
    handleSubmitAndAlert (name) {
      this.metricMethod(this.add_page.metric_group)
      this.$refs[name].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/alarm/add?token=' + this.getRequest().token,
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
              dingding_name: this.formDataAddAlert.dingdingName
            })
          }).then(response => {
            this.modalAddAert = false
            this.feedbackFormStatus(response.data.status === 0)
            window.location.reload()
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
    operatorIdMethod () {
      var arr = []
      for (var i = 0, iLen = this.formDataAddAlert.metric_id.length; i < iLen; i++) {
        var index = this.formDataAddAlert.metric_id[i] - 1
        var a = this.formDataAddAlert.operator_id[index]
        console.log(a)
        arr.push(a)
      }
      return arr
    },
    thresholdMethod () {
      var arr = []
      for (var i = 0, iLen = this.formDataAddAlert.metric_id.length; i < iLen; i++) {
        var index = this.formDataAddAlert.metric_id[i] - 1
        var a = this.formDataAddAlert.threshold[index]
        console.log(a)
        arr.push(a)
      }
      return arr
    },
    periodIdMethod () {
      var arr = []
      for (var i = 0, iLen = this.formDataAddAlert.metric_id.length; i < iLen; i++) {
        var index = this.formDataAddAlert.metric_id[i] - 1
        var a = this.formDataAddAlert.period_id[index]
        console.log(a)
        arr.push(a)
      }
      return arr
    },
    arrUnique () {
      var res = []
      var json = {}
      for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
          res.push(this[i])
          json[this[i]] = 1
        }
      }
      return res
    },
    handleResetAndAlert (name) {
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
    // 穿梭框 start
    transferRender (item) {
      return item.label
    },
    transferHandleChange (newTargetKey, direction, moveKeys) {
      this.transferTargetKey = newTargetKey
    },
    // 穿梭框 end
    operatorPolicy (row) {
      this.curRowData = row
      console.log('当前行', this.curRowData)
    },
    handleSubmitOperator (curRowData) {
      console.log(curRowData)
      switch (curRowData.status) {
        case '运行中':
          this.$axios({
            method: 'get',
            url: 'http://infra.xesv5.com/api/alarm/stop_alarm/id/' + curRowData.id + '?token=' + this.getRequest().token
          }).then(response => {
            console.log(response)
            this.modalOperate = false
            this.feedbackFormStatus(response.data.status === 0)
          })
          break
        case '已停用':
          this.$axios({
            method: 'get',
            url: 'http://infra.xesv5.com/api/alarm/start_alarm/id/' + curRowData.id + '?token=' + this.getRequest().token
          }).then(response => {
            console.log(response)
            this.modalOperate = false
            this.feedbackFormStatus(response.data.status === 0)
          })
          break
      }
    },
    handleCancelOperator (curRowData) {
      console.log(curRowData)
      this.modalOperate = false
    },
    // modifyTransferData
    modifyTransferData (params) {
      console.log('params', params)
      this.formDataAddAlert.instance_id = params
    }
  },
  mounted () {
    // 请求告警列表信息
    // this.$axios({
    //   method: 'get',
    //   url: 'http://infra.xesv5.com/api/alarm/list/id/0?token=' + this.getRequest().token
    // }).then(response => {
    //   console.log(response)
    //   this.responseAlertList = response
    // })
    const url = `http://infra.xesv5.com/api/alarm/list/id/0?token=${this.getRequest().token}`
    this.$axios.get(url).then(res => {
      // console.log(res.data.data)
      for (let i of res.data.data) {
        this.alertListData.push({
          application_name: i.application_name,
          dingding_name: i.dingding_name,
          id: i.id,
          operator: i.operator,
          policy_name: i.policy_name,
          policy_type: i.policy_type,
          status: i.status,
          trigger_condition: i.trigger_condition
        })
      }
    })
    // 创建告警策略的展示数据
    this.$axios({
      method: 'get',
      url: 'http://infra.xesv5.com/api/alarm/add_page?token=' + this.getRequest().token
    }).then(res => {
      this.add_page = res.data.data
      this.formDataAddAlert.metric_id = this.metricMethod(this.add_page.metric_group)
      // console.log(this.formDataAddAlert)
      // console.log(this.formDataAddAlert.metric_id)
      console.log('对话框展示数据', this.add_page)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
