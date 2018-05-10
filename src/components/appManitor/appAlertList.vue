<template>
  <div>
    <Row style="margin: 15px 0;">
      <Col span="12">
        <h1>告警策略</h1>
      </Col>
      <Col span="12" style="text-align: right;">
        <Button type="primary" @click="modalAddAlert = true">创建告警策略</Button>
        <Modal v-model="modalAddAlert" title="创建告警策略" width="700">
          <Form ref="formDataAddAlert" :model="formDataAddAlert" :rules="fromRuleAddAlert" :label-width="100">
            <FormItem label="策略名称" prop="name">
              <Input v-model="formDataAddAlert.name" placeholder="请输入策略名称"></Input>
            </FormItem>
            <FormItem label="策略类型" prop="policyType">
              <Select v-model="formDataAddAlert.policyType" placeholder="请选择策略类型">
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
            <Transfer v-if="transferShow" :data="transferData" :target-keys="transferTargetKey" :render-format="transferRender" @on-change="transferHandleChange" style="margin: 0 0 24px 80px;"></Transfer>
            <FormItem label="告警策略">
              <Row v-if="add_page.metric_group.length" v-for="(item, index) in add_page.metric_group" :key="item.id" :gutter="15" style="margin: 0 0 10px 0">
                <Col span="4">
                  <span v-html="item.name"></span>
                </Col>
                <Col span="5">
                  <Select v-model="formDataAddAlert.operator_id[index]" placeholder="请选择操作符">
                    <Option :value="subItem.id" v-for="subItem in add_page.operator_group" :key="subItem.id">{{subItem.name}}</Option>
                  </Select>
                </Col>
                <Col span="5">
                  <Input v-model="formDataAddAlert.input[index]" placeholder="请输入阈值"></Input>
                </Col>
                <Col span="8">
                  <Select v-model="formDataAddAlert.period_id[index]" placeholder="请选择周期">
                    <Option :value="subItem.value" v-for="subItem in add_page.period_group" :key="subItem.id">{{subItem.full_name}}</Option>
                  </Select>
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
// import multiplethreshold from '../multipleThreshold.vue'
export default {
  name: 'appAlertList',
  data () {
    return {
      add_page: '',
      modalAddAlert: false,
      formDataAddAlert: {
        name: '',
        policyType: '',
        app: '',
        alertObj: '',
        dingdingName: '',
        metric_id: '',
        threshold: '',
        operator_id: [],
        period_id: [],
        input: []
      },
      fromRuleAddAlert: {
        name: [
          {required: true, message: '请输入策略名称', trigger: 'change'}
        ],
        policyType: [
          {required: true, message: '请选择策略类型', pattern: /.+/, trigger: 'change'}
        ],
        app: [
          {required: true, message: '请选择所属应用', pattern: /.+/, trigger: 'change'}
        ],
        alertObj: [
          {required: true, message: '请选择告警对象', pattern: /.+/, trigger: 'change'}
        ],
        dingdingName: [
          {required: true, message: '请输入告警策略名称', trigger: 'change'}
        ]
      },
      responseAlertList: {
        data: {
          data: [],
          message: '',
          status: 0
        },
        status: 0
      },
      alertListColumns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '策略名称',
          // key: 'policy_name',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: './appAlertEdit.html?id=' + params.row.id
              }
            }, params.row.policy_name)
          }
        },
        {
          title: '策略类型',
          key: 'policy_type'
        },
        {
          title: '触发条件',
          key: 'trigger_condition'
        },
        {
          title: '所属应用',
          key: 'application_name'
        },
        {
          title: '上次操作人',
          key: 'operator'
        },
        {
          title: '告警群',
          key: 'dingding_name'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: '',
          render: (h, params) => {
            return h('Button', {
              on: {
                click: () => {
                  // console.log(params)
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
      curRowData: {},
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
      // 穿梭框 end
      modalOperate: false
    }
  },
  components: {
    // multiplethreshold
  },
  computed: {
    alertListData () {
      var result = []
      var data = this.responseAlertList.data.data
      if (!data.length) { return }
      for (var i = 0, iLen = data.length; i < iLen; i++) {
        var obj = {}
        obj.application_name = data[i].application_name
        obj.dingding_name = data[i].dingding_name
        obj.id = data[i].id
        obj.metric = data[i].metric
        obj.operator = data[i].operator
        obj.policy_name = data[i].policy_name
        obj.policy_type = data[i].policy_type
        obj.status = data[i].status
        obj.threshold = data[i].threshold
        obj.trigger_condition = data[i].trigger_condition
        result.push(obj)
      }
      return result
    },
    transferShow () {
      return this.formDataAddAlert.alertObj === '2'
    },
    item () {
      return {}
    }
  },
  methods: {
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
    getMetricId () {
      var metircGroup = this.add_page.metric_group
      var arr = []
      for (var i = 0, iLen = metircGroup.length; i < iLen; i++) {
        arr.push(metircGroup[i].id)
      }
      return arr
    },
    getAlertPolicy () {
      var metricIds = this.getMetricId()
      var operatorIds = this.formDataAddAlert.operator_id
      var inputs = this.formDataAddAlert.input
      var periodIds = this.formDataAddAlert.period_id
      var obj = {
        operatorIds: [],
        inputs: [],
        periodIds: []
      }
      if (!operatorIds.length || !inputs.length || !periodIds.length) {
        // console.log(obj)
        return obj
      }
      for (var i = 0, iLen = metricIds.length; i < iLen; i++) {
        if (operatorIds[i] !== undefined && inputs[i] !== undefined && periodIds[i] !== undefined) {
          // console.log('都不空')
          obj.operatorIds.push(operatorIds[i])
          obj.inputs.push(inputs[i])
          obj.periodIds.push(periodIds[i])
        } else {
          // console.log('空')
        }
      }
      console.log(obj)
      return obj
    },
    handleSubmitAndAlert (name) {
      console.log(this.formDataAddAlert)
      // this.getAlertPolicy()
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://10.99.1.135/api/alarm/add',
            data: this.qs.stringify({
              name: this.formDataAddAlert.name,
              type: this.formDataAddAlert.policyType,
              application_id: this.formDataAddAlert.app,
              target: this.formDataAddAlert.alertObj,
              // metric_id: ['1', '2'],
              // threshold: ['1', '2'],
              // operator_id: ['1', '1'],
              // period_id: ['1', '1'],
              metric_id: this.getMetricId(),
              threshold: this.getAlertPolicy().inputs,
              operator_id: this.getAlertPolicy().operatorIds,
              period_id: this.getAlertPolicy().periodIds,
              // token: 'token',
              token: this.getRequest().token,
              instance_id: valid,
              dingding_name: this.formDataAddAlert.dingdingName
            })
          }).then(response => {
            console.log(response)
            this.modalAddAlert = false
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空!')
        }
      })
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
    },
    handleSubmitOperator (curRowData) {
      console.log(curRowData)
      switch (curRowData.status) {
        case '运行中':
          this.$axios({
            method: 'get',
            url: 'http://10.99.1.135/api/alarm/stop_alarm/id/' + curRowData.id
          }).then(response => {
            console.log(response)
            this.modalOperate = false
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          })
          break
        case '已停用':
          this.$axios({
            method: 'get',
            url: 'http://10.99.1.135/api/alarm/start_alarm/id/' + curRowData.id
          }).then(response => {
            console.log(response)
            this.modalOperate = false
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          })
          break
      }
    },
    handleCancelOperator (curRowData) {
      console.log(curRowData)
      this.modalOperate = false
    }
  },
  mounted () {
    // 请求告警列表信息
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/api/alarm/list/id/0'
    }).then(response => {
      console.log('表格列表', response)
      this.responseAlertList = response
    })
    // 创建告警策略的展示数据
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/api/alarm/add_page'
    }).then(res => {
      this.add_page = res.data.data
      // console.log('对话框展示数据', this.add_page)
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #eee;
  background: #fff;
}
</style>
