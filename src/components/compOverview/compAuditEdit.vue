<template>
  <div>
    <Row>
      <Col style="border-bottom: 1px solid #d8d8d8;">
        <h2><a href="javascript:history.go(-1)" style="text-decoration: none;color: #000;">＜ 实例列表</a></h2>
      </Col>
    </Row>
    <Row style="margin: 15px 0 15px 0;">
      <Col span="22">
        <h1>实例列表</h1>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>实例id</h6></Col>
      <Col span="8" v-model="auditEdit.id"></Col>
      <Col span="4"><h6>实例名称</h6></Col>
      <Col span="8" v-model="auditEdit.name"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>组件类型</h6></Col>
      <Col span="8" v-model="auditEdit.component_name"></Col>
      <Col span="4"><h6>所属应用</h6></Col>
      <Col span="8" v-model="auditEdit.application_name"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请人</h6></Col>
      <Col span="8" v-model="auditEdit.proposer"></Col>
      <Col span="4"><h6>申请类型</h6></Col>
      <Col span="8" v-model="auditEdit.apply_name"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请部门</h6></Col>
      <Col span="8" v-model="auditEdit.department_name"></Col>
      <Col span="4"><h6>申请时间</h6></Col>
      <Col span="8" v-model="auditEdit.create_time"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请理由</h6></Col>
      <Col span="20" v-model="auditEdit.remark"></Col>
    </Row>
    <Row style="margin: 15px 0 15px 0;">
      <Col span="22">
        <h1>审核意见</h1>
      </Col>
    </Row>
    <Form :model="formItem" :label-width="80">
      <FormItem>
        <RadioGroup v-model="formItem.status">
          <Radio v-for="item in auditEdit.op_status" :key="item.id" :label="item.id">{{item.name}}</Radio>
        </RadioGroup>
      </FormItem>
      <Card dis-hover v-if="formItem.status === 1">
        <p slot="title">实例配置</p>
        <FormItem label="v ip">
            <Input v-model="formItem.vip"></Input>
        </FormItem>
        <FormItem label="master ip">
            <Input v-model="formItem.master_ip"></Input>
        </FormItem>
        <FormItem label="hostname_master">
            <Input v-model="formItem.hostname_master"></Input>
        </FormItem>
        <FormItem label="slave1 ip">
            <Input v-model="formItem.slave_ip[0]"></Input>
        </FormItem>
        <FormItem label="hostname1">
            <Input v-model="formItem.hostname[0]"></Input>
        </FormItem>
        <FormItem label="slave2 ip">
            <Input v-model="formItem.slave_ip[1]"></Input>
        </FormItem>
        <FormItem label="hostname2">
            <Input v-model="formItem.hostname[1]"></Input>
        </FormItem>
        <FormItem label="port">
            <Input v-model="formItem.port"></Input>
        </FormItem>
        <FormItem label="cpu核数">
            <Input v-model="formItem.cpu_kernel"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formItem')">Submit</Button>
        </FormItem>
      </Card>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'auditEdit',
  data () {
    return {
      auditEdit: '',
      formItem: {
        id: this.auditEdit.id,
        vip: '',
        master_ip: '',
        port: '',
        slave_ip: [],
        status: '',
        bind_cpu: '',
        hostname_master: '',
        hostname: [],
        cpu_kernel: ''
      }
    }
  },
  components: {},
  computed: {},
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/redis/audit?token=' + this.getRequest().token,
            data: this.qs.stringify(this.formItem)
          }).then(res => {
            console.log(res)
            this.feedbackFormStatus(res.data.data.status === 0)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.feedbackFormStatus(false)
        }
      })
    },
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
  created () {
    var operator = this.getRequest().operator
    switch (operator) {
      case 'audit':
        const url = `http://infra.xesv5.com/api/redis/edit_page/id/${this.getRequest().id}?tiken=${this.getRequest().token}`
        this.$axios.get(url).then(res => {
          this.auditEdit = res.data.data
        })
        break
      case 'midify':
        const url = `http://infra.xesv5.com/api/redis/audit_page/id/${this.getRequest().id}?tiken=${this.getRequest().token}`
        this.$axios.get(url).then(res => {
          this.auditEdit = res.data.data
        })
      break
    }
    
  }
}
</script>

<style lang="scss" scoped>

</style>
