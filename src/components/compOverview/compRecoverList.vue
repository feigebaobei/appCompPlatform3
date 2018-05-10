<template>
  <div>
    <Row class="title">
      <Col span="22">
      <h1>恢复</h1>
      </Col>
      <Col span="2">
      <Button type="primary" @click="modalAddRecover = true">添加恢复</Button>
      <Modal v-model="modalAddRecover" title="申请恢复">
        <Form ref="formDataAddRecover" :model="formDataAddRecover" :rules="formRuleAddRecover" :label-width="80">
          <FormItem label="源IP" prop="ipOrigin">
            <Input v-model="formDataAddRecover.ipOrigin" placeholder="请输入源ip"></Input>
          </FormItem>
          <FormItem label="源Port" prop="portOrigin">
            <Input v-model="formDataAddRecover.portOrigin" placeholder="请输入源port"></Input>
          </FormItem>
          <FormItem label="时间点">
            <Row>
              <Col span='12'>
                <FormItem prop="date">
                  <Date-picker  placeholder="选择日期"  type="datetime" :value="formDataAddRecover.date"  :key="formDataAddRecover.date"  format="yyyy-MM-dd"  @on-change="formDataAddRecover.date=$event" ></Date-picker>
                </FormItem>
              </Col>
              <Col span='12'>
                <FormItem prop="time">
                  <TimePicker type="time" placeholder="请选择小时" v-model="formDataAddRecover.time"></TimePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="目的IP" prop="ipDest">
            <Input v-model="formDataAddRecover.ipDest" placeholder="请输入目的ip"></Input>
          </FormItem>
          <FormItem label="目的Port" prop="portDest">
            <Input v-model="formDataAddRecover.portDest" placeholder="请输入目的port"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmitAddRecover('formDataAddRecover')">Submit</Button>
            <Button type="ghost" @click="handleResetAddRecover('formDataAddRecover')" style="margin-left: 8px">Reset</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>
      </Col>
    </Row>
    <Table border :columns="recoverListColumns" :data="recoverListData"></Table>
  </div>
</template>

<script>
export default {
  name: 'compRecoverList',
  data () {
    return {
      recoverList: '',
      // 添加恢复
      modalAddRecover: false,
      formDataAddRecover: {
        ipOrigin: '',
        portOrigin: '',
        ipDest: '',
        portDest: '',
        date: '',
        time: ''
      },
      formRuleAddRecover: {
        ipOrigin: [
          {required: true, message: '请输入源ip', trigger: 'change'}
        ],
        portOrigin: [
          {required: true, message: '请输入源port', trigger: 'change'}
        ],
        ipDest: [
          {required: true, message: '请输入目的ip', trigger: 'change'}
        ],
        portDest: [
          {required: true, message: '请输入目的port', trigger: 'change'}
        ],
        date: [
          {required: true, message: '请选择日期', pattern: /.+/, trigger: 'change'}
        ],
        time: [
          {required: true, message: '请选择小时', pattern: /.+/, trigger: 'change'}
        ]
      },
      recoverListColumns: [
        {
          title: '源IP',
          key: 'source_ip',
          align: 'center',
          sortable: true
        },
        {
          title: '源Port',
          key: 'source_port',
          align: 'center',
          sortable: true
        },
        {
          title: '时间点',
          key: 'operate_time',
          align: 'center',
          sortable: true
        },
        {
          title: '目的IP',
          key: 'target_ip',
          align: 'center',
          sortable: true
        },
        {
          title: '目的Port',
          key: 'target_port',
          align: 'center',
          sortable: true
        },
        {
          title: '状态',
          key: 'status',
          filters: [
            {
              label: '已完成',
              value: '已完成'
            },
            {
              label: '进行中',
              value: '进行中'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === '已完成') {
              return row.status === '已完成'
            } else {
              if (value === '进行中') {
                return row.status === '进行中'
              }
            }
          }
        }
      ],
      recoverListData: []
    }
  },
  components: {},
  methods: {
    /* 添加恢复 start */
    handleSubmitAddRecover (name) {
      let dateTime = this.formDataAddRecover.date + this.formDataAddRecover.time
      dateTime = dateTime.split('-').join().split(':').join().split(',').join('')
      let newTime = dateTime.slice(0, dateTime.length - 2)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://10.99.1.135/api/recover/add',
            data: this.qs.stringify({
              source_ip: this.formDataAddRecover.ipOrigin,
              source_port: this.formDataAddRecover.portOrigin,
              target_ip: this.formDataAddRecover.ipDest,
              target_port: this.formDataAddRecover.portDest,
              recover_time: newTime
            })
          }).then(response => {
            console.log('打印数据', response)
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空!')
        }
      })
    },
    handleResetAddRecover (name) {
      this.$refs[name].resetFields()
    },
    /* 添加恢复 end */
    // 回馈提交状态
    feedbackFormStatus (bool) {
      if (bool) {
        this.$Message.success('操作成功！')
      } else {
        this.$Message.error('操作失败！')
      }
    },
    getValue (value) {
      console.log(value)
    }
  },
  mounted () {
    // 请求恢复的表格数据
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/api/recover/list'
    }).then(res => {
      this.recoverList = res.data.data
      console.log('列表渲染数据', this.recoverList)
      for (let i of this.recoverList) {
        this.recoverListData.push({
          source_ip: i.source_ip,
          source_port: i.source_port,
          operate_time: i.operate_time,
          target_ip: i.target_ip,
          target_port: i.target_port,
          status: i.status
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
