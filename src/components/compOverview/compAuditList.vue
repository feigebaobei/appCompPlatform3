<template>
  <div>
    <Row style="margin: 0 0 15px 0;" :gutter="25">
      <Col span="10">
        <Input v-model="searchText" type="text" class="text" placeholder="实例名称/实例id" style="padding: 0 0 0 10px;"></Input>
      </Col>
      <Col span="4">
        <Button type="primary" class="retrievalBtn" @click="selectInstanceListData(searchText)">检索</Button>
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
      instanceListColumns: [
        {
          title: 'id',
          key: 'id',
          align: 'center',
          width: 80
        },
        {
          title: '实例名称',
          key: 'name',
          align: 'center',
          width: 120
        },
        {
          title: '所属应用',
          key: 'application_name',
          align: 'center',
          width: 120
        },
        {
          title: '申请部门',
          key: 'id',
          align: 'center',
          width: 80
        },
        {
          title: 'id',
          key: 'id',
          align: 'center',
          width: 80
        },
        {
          title: 'id',
          key: 'id',
          align: 'center',
          width: 80
        },
        {
          title: 'id',
          key: 'id',
          align: 'center',
          width: 80
        },
        {
          title: '操作',
          key: 'id',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: `./compAuditEdit.html?id=${params.row.id}&token=${this.$store.getters.getUserInfo.token}`
              }
            }, '审核')
          }
        }
      ],
      instanceListDataBox: []
      /* table end */
    }
  },
  components: {},
  computed: {
    instanceListData: {
      set (data) {
        this.instanceListDataBox = []
        if (!data.length) { return [] }
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.application_id = data[i].application_id
          obj.application_name = data[i].application_name
          obj.apply_id = data[i].apply_id
          obj.apply_typy = data[i].apply_typy
          obj.audit_text = data[i].audit_text
          obj.department = data[i].department
          obj.id = data[i].id
          obj.name = data[i].name
          obj.port = data[i].port
          obj.proposer = data[i].proposer
          obj.status = data[i].status
          obj.vip = data[i].vip
          this.instanceListDataBox.push(obj)
        }
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
      if (!data.length) { return result }
      if (!condition) {
        //  不筛选
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.application_id = data[i].application_id
          obj.application_name = data[i].application_name
          obj.apply_id = data[i].apply_id
          obj.apply_typy = data[i].apply_typy
          obj.audit_text = data[i].audit_text
          obj.department = data[i].department
          obj.id = data[i].id
          obj.name = data[i].name
          obj.port = data[i].port
          obj.proposer = data[i].proposer
          obj.status = data[i].status
          obj.vip = data[i].vip
          result.push(obj)
        }
      } else {
        for (i = 0, iLen = data.length; i < iLen; i++) {
          if (data[i].name.indexOf(condition) !== -1 || data[i].id.toString().indexOf(condition) !== -1) {
            obj = {}
          obj.application_id = data[i].application_id
          obj.application_name = data[i].application_name
          obj.apply_id = data[i].apply_id
          obj.apply_typy = data[i].apply_typy
          obj.audit_text = data[i].audit_text
          obj.department = data[i].department
          obj.id = data[i].id
          obj.name = data[i].name
          obj.port = data[i].port
          obj.proposer = data[i].proposer
          obj.status = data[i].status
          obj.vip = data[i].vip
            result.push(obj)
          }
        }
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
      url: 'http://infra.xesv5.com/api/redis/audit_list?token=' + this.getRequest().token
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
