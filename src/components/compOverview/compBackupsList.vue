<template>
  <div>
    <Row class="title">
      <Col span="22">
      <h1>备份策略</h1>
      </Col>
      <Col span="2">
      <Button type="primary" @click="modalCreateBackups = true">创建备份策略</Button>
      <Modal v-model="modalCreateBackups" title="创建备份" :styles="{top: '20px'}" width="720">
        <Form ref="formDataCreateBackups" :model="formDataCreateBackups" :rules="formRuleCreateBackups" :label-width="80">
          <FormItem label="策略名称" prop="name">
            <Input v-model="formDataCreateBackups.name" placeholder="请输入策略名称"></Input>
          </FormItem>
          <FormItem label="策略类型" prop="policy_type">
            <Select v-model="formDataCreateBackups.policy_type">
               <Option v-for="item in comBackupsData.policy_type_group" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属应用" prop="application_group">
            <Select v-model="formDataCreateBackups.application_group">
              <Option v-for="item in comBackupsData.application_group" :key="item.id" :value="item.id" v-html="item.name"></Option>
            </Select>
          </FormItem>
          <FormItem label="备份对象" prop="radio">
            <RadioGroup v-model="formDataCreateBackups.radio">
               <Radio v-for="item in comBackupsData.target_group" :key="item.id" :label="item.id">{{item.name}}</Radio>
            </RadioGroup>
          </FormItem>
          <transfervue v-show="transferShow" :instancesId="formDataCreateBackups.application_group" :targetKey="formDataCreateBackups.instanceIds" @modifyTransferData="modifyTransferData"></transfervue>
          <FormItem label="备份周期">
            <span>每天</span>
          </FormItem>
          <FormItem label="备份时间" prop="time">
            <Select v-model="formDataCreateBackups.time">
               <Option v-for="item in comBackupsData.time_group" :key="item.id" :value="item.id" v-html="item.name"></Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmitAndAlert('formDataCreateBackups')">Submit</Button>
            <Button type="ghost" @click="handleResetAndAlert('formDataCreateBackups')" style="margin-left: 8px">Reset</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>
      </Col>
    </Row>
    <Table border stripe height="800" :columns="backupsListColumns" :data="backupsListData"></Table>
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
  name: 'compBackupsList',
  data () {
    return {
      comBackupsData: '',
      modalCreateBackups: false,
      formDataCreateBackups: {
        name: '',
        application_group: '',
        policy_type: '',
        radio: '',
        date: '每天',
        instanceIds: [] // 部分实例的id
      },
      formRuleCreateBackups: {
        name: [
          {required: true, message: '请输入策略名称', trigger: 'change'}
        ],
        application_group: [
          {required: true, message: '请选择所属应用', pattern: /.+/, trigger: 'change'}
        ],
        policy_type: [
          {required: true, message: '请选择策略类型', pattern: /.+/, trigger: 'change'}
        ],
        radio: [
          {required: true, message: '请选择备份对象', pattern: /.+/, trigger: 'change'}
        ]
      },
      backupsListColumns: [
        {
          title: 'id',
          align: 'center',
          key: 'id',
          fixed: 'left',
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '策略名称',
          align: 'center',
          key: '',
          sortable: true,
          sortType: 'desc',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: './compBackupsEdit.html?id=' + params.row.id + '&token=' + this.getRequest().token
              }
            }, params.row.name)
          }
        },
        {
          title: '策略类型',
          key: 'policy_type',
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
          title: '备份策略',
          key: 'backup_type',
          align: 'center',
          sortable: true
        },
        {
          title: '备份时间',
          key: 'operator_time',
          align: 'center',
          sortable: true
        },
        {
          title: '上次操作人',
          key: 'operator',
          align: 'center',
          sortable: true
        },
        {
          title: '查看',
          align: 'center',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: './compBackups.html?id=' + params.row.id + '&token=' + this.getRequest().token
              }
            }, '查看')
          }
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
            }, params.row.status === '已完成' ? '启用' : '停用')
          }
        }
      ],
      modalOperate: false,
      backupsListData: [],
      add_instance_id: [],
      targetKeys1: this.getTargetKeys(),
      data1: [
        {key: '1', label: 'Content1', disabled: false},
        {key: '2', label: 'Content2', disabled: false},
        {key: '3', label: 'Content3', disabled: false}
      ],
      curRowData: {}
    }
  },
  components: {
    transfervue
  },
  computed: {
    transferShow () {
      return this.formDataCreateBackups.radio === 2
    }
  },
  methods: {
    handleSubmitAndAlert (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/backup/add?token=' + this.getRequest().token,
            data: this.qs.stringify({
              name: this.formDataCreateBackups.name,
              type: this.formDataCreateBackups.policy_type,
              application_id: this.formDataCreateBackups.application_group,
              target: this.formDataCreateBackups.radio,
              period: this.formDataCreateBackups.time,
              // instance_id: this.add_instance_id
              instance_id: this.formDataCreateBackups.instanceIds.join(',')
            })
          }).then(res => {
            // this.$Message.success('操作成功！')
            console.log(res)
            this.modalCreateBackups = false
            this.$refs[name].resetFields()
            this.febackFormStatus(response.data.status === 0, response.data.data)
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.feedbackFormStatus(false)
        }
      })
    },
    handleResetAndAlert (name) {
      this.$refs[name].resetFields()
    },
    getMockData () {
      let mockData = []
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: 'Content ' + i,
          description: 'The desc of content  ' + i,
          disabled: Math.random() * 3 < 1
        })
      }
      return mockData
    },
    getTargetKeys () {
      return this.getMockData().filter(() => Math.random() * 2 > 1).map(item => item.key)
    },
    handleChange1 (newTargetKeys) {
      this.targetKeys1 = newTargetKeys
    },
    render1 (item) {
      return item.label + ' - ' + item.description
    },
    reloadMockData () {
      this.data1 = this.getMockData()
      this.targetKeys1 = this.getTargetKeys()
    },
    operatorPolicy (row) {
      this.curRowData = row
    },
    handleSubmitOperator (curRowData) {
      console.log(curRowData)
      switch (curRowData.status_name) {
        case '运行中':
          this.$axios({
            method: 'get',
            url: 'http://infra.xesv5.com/api/backup/stop/id/' + curRowData.id + '?token=' + this.getRequest().token
          }).then(response => {
            console.log(response)
            this.modalOperate = false
            this.feedbackFormStatus(response.data.status === 0,  response.data.data)
          })
          break
        case '已停用':
          this.$axios({
            method: 'get',
            url: 'http://infra.xesv5.com/api/alarm/start_alarm/id/' + curRowData.id + '?token=' + this.getRequest().token
          }).then(response => {
            console.log(response)
            this.modalOperate = false
            this.feedbackFormStatus(response.data.status === 0, response.data.data)
          })
          break
      }
    },
    handleCancelOperator (curRowData) {
      console.log(curRowData)
      this.modalOperate = false
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
    // modifyTransferData
    modifyTransferData (params) {
      this.formDataCreateBackups.instanceIds = params
    }
  },
  mounted () {
    // 请求备份数据
    this.$axios({
      method: 'get',
      url: 'http://infra.xesv5.com/api/backup/policy/list/id/0?token=' + this.getRequest().token
    }).then(res => {
      let backupsList = res.data.data
      console.log('列表渲染数据', backupsList)
      for (let i of backupsList) {
        this.backupsListData.push({
          id: i.id,
          name: i.name,
          policy_type: i.policy_type,
          application_name: i.application_name,
          backup_type: i.backup_type,
          operator_time: i.operator_time,
          status: i.status,
          status_name: i.status_name,
          operator: i.operator
        })
      }
    })
    // 添加备份数据
    this.$axios({
      url: 'http://infra.xesv5.com/api/backup/add_page/?token=' + this.getRequest().token,
      method: 'get'
    }).then(res => {
      this.comBackupsData = res.data.data
      console.log('增加备份展示数据', this.comBackupsData)
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 25px 15px;
}
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
      top: -20px;
  }
}
</style>
