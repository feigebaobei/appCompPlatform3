<template>
  <div>
    <Row class="title">
      <Col span="22">
      <h1>恢复</h1>
      </Col>
      <Col span="2">
      <Button type="primary" @click="modalAddRecover = true">添加恢复</Button>
      <Modal v-model="modalAddRecover" title="创建备份">
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
                  <DatePicker type="date" placeholder="请选择日期" v-model="formDataAddRecover.date"></DatePicker>
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
    <!-- <Table height="600" border :data="recoverListData" :columns="recoverListColumns"></Table> -->
  </div>
</template>

<script>
export default {
  name: 'compRecoverList',
  data () {
    return {
      responseRecoverList: {
        data: {
          data: [],
          message: '',
          status: 0
        },
        status: 0
      },
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
        // date: [
        //   {required: true, message: '请选择日期', trigger: 'change'}
        // ],
        time: [
          {required: true, message: '请选择小时', trigger: 'change'}
        ]
      },
      recoverListColumns: [
        {
          title: '',
          key: ''
        }
      ]
    }
  },
  components: {},
  computed: {
    recoverListData () {
      var result = []
      var data = this.responseRecoverList.data.data
      if (!data.length) { return result }
      for (var i = 0, iLen = data.length; i < iLen; i++) {
        var obj = {}
        obj.name = data[i].name
        result.push(obj)
      }
      return result
    }
  },
  methods: {
    /* 添加恢复 start */
    handleSubmitAddRecover (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://10.99.1.135/api/alarm/edit',
            data: this.qs.stringify({
              source_ip: this.formDataAddRecover.ipOrigin,
              source_port: this.formDataAddRecover.portOrigin,
              target_ip: this.formDataAddRecover.ipDest,
              target_port: this.formDataAddRecover.portDest,
              time: this.formDataAddRecover.time
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
    }
  },
  mounted () {
    // 请求恢复的表格数据
    // this.$axios({
    //   method: '',
    //   url: ''
    // }).then(response => {
    //   console.log(response)
    //   this.responseRecoverList = response
    // })
  }
}
</script>

<style lang="scss" scoped>

</style>
