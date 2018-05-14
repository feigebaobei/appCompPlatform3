<template>
  <div>
    <Row style="margin: 0 0 15px 0;">
      <Col span="10">
        <Input v-model="searchText" type="text" class="text" placeholder="实例名称/实例id" style="padding: 0 0 0 10px;"></Input>
      </Col>
      <Col span="4">
        <Button type="default" class="retrievalBtn" @click="selectInstanceListData(searchText)">检索</Button>
      </Col>
    </Row>
    <Table height="800" border :columns="instanceListColumns" :data="instanceListData"></Table>
  </div>
</template>

<script>
export default {
  name: 'auditmanage',
  data () {
    return {
      searchText: '',
      /* table start */
      responseInstanceList: {
        data: {
          data: {},
          message: '',
          status: 0
        },
        status: 0
      },
      instanceListColumns: [],
      instanceListDataBox: []
      /* table end */
    }
  },
  components: {},
  computed: {
    instanceListData: {
      set () {
        this.instanceListDataBox = []
      },
      get () {
        return this.instanceListDataBox
      }
    }
  },
  methods: {
    selectInstanceListData (condition) {
      console.log('condition')
      this.instanceListData = this.search(this.responseInstanceList, condition)
    },
    search (response, condition) {
      var result = []
      var data = response.data.data
      if (!data.length) {
        return result
      }
      if (!condition) {
        //  不筛选
      } else {
        //  筛选
      }
      return result
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
  mounted () {
    // 请求表格数据
    this.$axios({
      method: 'get',
      url: 'http://infra.xesv5.com/api/redis/redis/list/0?token=' + this.getRequest().token
    }).then(response => {
      console.log(response)
      this.responseInstanceList = response
      this.selectInstanceListData()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
