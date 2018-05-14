<template>
  <div>
    <Row>
      <Col style="border-bottom: 1px solid #d8d8d8;">
        <h2><a href="javascript:history.go(-1)" style="text-decoration: none;color: #000;">＜ 审核管理</a></h2>
      </Col>
    </Row>
    <Row style="margin: 15px 0 15px 0;">
      <Col span="22">
        <h1>申请信息</h1>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>实例id</h6></Col>
      <Col span="8" v-html=""></Col>
      <Col span="4"><h6>实例名称</h6></Col>
      <Col span="8" v-html="formDataAudit"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>组建类型</h6></Col>
      <Col span="8" v-html=""></Col>
      <Col span="4"><h6>所属应用</h6></Col>
      <Col span="8" v-html=""></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请人</h6></Col>
      <Col span="8" v-html=""></Col>
      <Col span="4"><h6>申请部门</h6></Col>
      <Col span="8" v-html=""></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请类型</h6></Col>
      <Col span="8" v-html=""></Col>
      <Col span="4"><h6>申请时间</h6></Col>
      <Col span="8" v-html=""></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请理由</h6></Col>
      <Col span="20" v-html=""></Col>
    </Row>
    <Row style="margin: 15px 0 15px 0;">
      <Col span="22">
        <h1>审核意见</h1>
      </Col>
    </Row>
    <Form ref="formDataAudit" :model="formDataAudit" :rules="fromRuleMoniter" :label-width="80">
      <FormItem label="VIP">
        <Input v-model="formDataAudit.vip"></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'auditEdit',
  data () {
    return {
      // auditList: [],
      formDataAudit: {
        data: {
          data: {},
          message: '',
          status: 0
        },
        status: 0
      },
      auditField: {}
    }
  },
  components: {},
  computed: {},
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
    }
  },
  created () {
    const url = `http://infra.xesv5.com/api/redis/audit_page/id/${this.getRequest().id}?tiken=${this.getRequest().token}`
    // this.$axios.get(url).then(res => {
    //   this.auditList = res.data.data
    // })
    this.$axios({
      methods: 'get',
      url: url
    }).then(response => {
      console.log(response)
      this.formDataAudit = response
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
