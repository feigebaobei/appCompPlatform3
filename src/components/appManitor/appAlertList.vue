<template>
  <div>
    <Header class="title">
      <Row>
        <Col span="12">
          <h1>告警策略</h1>
        </Col>
        <Col span="12">
          <Button type="primary" @click="modalAddAert = true">创建告警策略</Button>
          <Modal v-model="modalAddAert" title="创建告警策略" >
            <Form ref="formDataAddAert" :model="formDataAddAert" :rules="fromRuleAddAlert">
              <FormItem label="策略名称">
                <Input v-model="formDataAddAert.name"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmitAndAlert('formDataComponent')">Submit</Button>
                <Button type="ghost" @click="handleResetAndAlert('formDataComponent')" style="margin-left: 8px">Reset</Button>
              </FormItem>
            </Form>
            <div slot="footer"></div>
          </Modal>
        </Col>
      </Row>
    </Header>
    <hr class="hr">
    <!-- <Table height="600" border :data="alertListData" :columns="alertListColumns"></Table> -->
  </div>
</template>

<script>
export default {
  name: 'appAlertList',
  data () {
    return {
      modalAddAert: false,
      formDataAddAert: {
        name: ''
      },
      fromRuleAddAlert: {
        name: [
          {required: true, message: '请输入告警策略名称', trigger: 'change'}
        ]
      },
      responseAlertList: {
        data: {
          data: {}
        }
      },
      alertListColumns: [
        {
          title: 'id',
          key: 'id'
        }
      ]
    }
  },
  components: {},
  computed: {
    alertListData () {
      return {}
    }
  },
  methods: {
    handleSubmitAndAlert (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!')
          this.modalComponents = false
          // console.log(this.response.data.data.id)
          // console.log(this.formData.select)
          // 这个接口会出错，后端正在调整。
          this.$axios({
            method: 'post',
            url: 'http://10.99.1.135/api/alarm/add',
            data: this.qs.stringify({
              app_id: this.responseOverview.data.data.id,
              type: ''
              // ....
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
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/api/alarm/list/id/0'
    }).then(response => {
      this.responseAlertList = response
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
