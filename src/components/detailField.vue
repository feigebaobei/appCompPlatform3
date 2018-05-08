<template>
  <div>
    detailField
    <Row class="column">
      <Col>
        <p v-html="responseDetail.data"></p>
      </Col>
    </Row>
    <Row class="column">
      <Col span="4">所属部门</Col>
      <Col span="8">所属部门</Col>
      <Col span="4">域名</Col>
      <Col span="8">所属部门</Col>
    </Row>
    <Row class="column">
      <Col span="4">仓库地址</Col>
      <Col span="8">所属部门</Col>
      <Col span="4">WIKI地址</Col>
      <Col span="8">所属部门</Col>
    </Row>
    <Row class="column">
      <Col span="4">管理员</Col>
      <Col span="8">所属部门</Col>
      <Col span="4">创建时间</Col>
      <Col span="8">所属部门</Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'detailField',
  data () {
    return {
      responseDetail: {
        // 
      }
    }
  },
  components: {},
  computed: {},
  methods: {},
  mounted () {
    // 请求详细信息的数据
    this.$axios({
      methos: 'get',
      url: ''
    }).then(response => {
      this.responseDetail = response
    })
  }
}
</script>

<style lang="scss" scoped>
.column {
  margin: 10px 0;
}
</style>
