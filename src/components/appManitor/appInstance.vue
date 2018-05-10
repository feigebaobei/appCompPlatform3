<template>
  <div>
    <Row class="title">
      <Col span="22">
        <h1>实例列表</h1>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>实例名称</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.name"></Col>
      <Col span="4"><h6>CPU核数</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.bind_cpu"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>VIP</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.vip"></Col>
      <Col span="4"><h6>CPU核序号</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.cpu_kernel"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>端口号</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.port"></Col>
      <Col span="4"><h6>内存</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.mem"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请人</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.name"></Col>
      <Col span="4"><h6>硬盘</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.disk + 'G'"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>创建时间</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.create_time"></Col>
      <Col span="4"><h6>最大连接数</h6></Col>
      <Col span="8" v-html="responseInstance.data.data.max_conn"></Col>
    </Row>
    <Table border stripe :columns="columnsInstanceTable" :data="dataInstanceTable" class="table"></Table>
  </div>
</template>

<script>
export default {
  name: 'appInstance',
  data () {
    return {
      responseInstance: {
        data: {
          data: {},
          message: '',
          status: 0
        },
        status: 0
      },
      columnsInstanceTable: [
        {
          title: '实例IP',
          key: 'ip',
          sortable: true
        },
        {
          title: '实例属性',
          key: 'tag_name',
          filters: [
            {
              label: '主',
              value: '主'
            },
            {
              label: '从',
              value: '从'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === '主') {
              return row.tag_name === '主'
            } else if (value === '从') {
              return row.tag_name === '从'
            }
          }
        },
        {
          title: '创建时间',
          key: 'operator_time',
          sortable: true
        },
        {
          title: '创建人',
          key: 'operator'
        }
      ]
    }
  },
  components: {},
  computed: {
    dataInstanceTable () {
      var info = this.responseInstance.data.data.ip_info
      if (!this.responseInstance.data.data.ip_info) { return [] }
      var result = []
      for (var i = 0, iLen = info.length; i < iLen; i++) {
        var obj = {}
        obj.ip = info[i].ip
        obj.operator = info[i].operator
        obj.operator_time = info[i].operator_time
        obj.tag = info[i].tag
        obj.tag_name = info[i].tag_name
        result.push(obj)
      }
      console.log(result)
      return result
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
    getInstanceData () {
      // const url = 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/redis/detail/id/9'
      const url = 'http://www.cloud.com/api/redis/detail/id/' + this.getRequest().id
      // const url = 'http://www.cloud.com/api/redis/detail/id/9'
      console.log(url)
      this.$axios.get(url).then(response => {
        console.log(response)
        this.responseInstance = response
      })
    }
  },
  created () {
    this.getInstanceData()
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 15px 0;
}
.code-row-bg {
  margin: 5px 0;
}
.table {
  margin: 15px 0 0 0;
}
</style>
