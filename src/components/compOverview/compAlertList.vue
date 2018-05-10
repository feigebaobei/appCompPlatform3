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
              <Select v-model="formDataAddAlert.policyType" placeholder="请选择策略类型">
                <Option value="redis">Redis基础监控</Option>
                <Option value="codis">codis</Option>
                <Option value="gateway">gateway</Option>
              </Select>
            </FormItem>
            <FormItem label="所属应用" prop="app">
              <Select v-model="formDataAddAlert.app" placeholder="请选择所属应用">
                <Option value="learn">学习中心</Option>
                <Option value="learn1">学习中心1</Option>
                <Option value="learn2">学习中心2</Option>
              </Select>
            </FormItem>
            <FormItem label="告警对象" prop="alertObj">
              <RadioGroup v-model="formDataAddAlert.alertObj">
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
export default {
  name: 'compAlertList',
  data () {
    return {
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
      formDataAddAlert: {
        name: '',
        policyType: '',
        app: '',
        alertObj: '',
        dingdingName: ''
      },
      fromRuleAddAlert: {
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
                href: `./compAlertEdit.html?id=${params.row.id}&token=${this.$store.getters.getUserInfo.token}`
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
      // 穿梭框 end
      modalOperate: false,
      curRowData: {}
    }
  },
  components: {},
  computed: {
    alertListData () {
      var result = []
      var data = this.responseAlertList.data.data
      if (!data.length) { return result }
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
    }
  },
  methods: {
    handleSubmitAndAlert (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 这个接口会出错，后端正在调整。
          this.$axios({
            method: 'post',
            url: 'http://10.99.1.135/api/alarm/add',
            data: this.qs.stringify({
              name: this.formDataAddAlert.name,
              type: this.formDataAddAlert.policyType,
              application_id: this.formDataAddAlert.app, // 应当没有
              target: 'all',
              metric_id: ['', ''],
              token: 'token',
              threshold: ['', ''],
              operator_id: ['', ''],
              period_id: ['', ''],
              instance_id: '',
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
      console.log(response)
      this.responseAlertList = response
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
