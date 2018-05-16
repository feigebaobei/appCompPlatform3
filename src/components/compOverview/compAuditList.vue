<template>
  <div>
    <Row style="margin: 0 0 15px 0;" :gutter="25">
      <Col span="10">
        <Input v-model="searchText" type="text" class="text" placeholder="实例名称/实例id/申请部门" style="padding: 0 0 0 10px;"></Input>
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
          data: {
            extraData: {},
            list: []
          },
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
          width: 80,
          sortable: true
        },
        {
          title: '实例名称',
          key: 'name',
          align: 'center',
          width: 120,
          sortable: true
        },
        {
          title: '组件类型',
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
          key: 'department_name',
          align: 'center'
        },
        {
          title: '申请人',
          key: 'proposer',
          align: 'center',
          width: 80
        },
        {
          title: '申请类型',
          key: 'apply_type',
          align: 'center',
          width: 100
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 80,
          filters: [
            {
              label: '未审核',
              value: '未审核'
            },
            {
              label: '软件安装中',
              value: '软件安装中'
            },
            {
              label: '已审核',
              value: '已审核'
            },
            {
              label: '已驳回',
              value: '已驳回'
            }
          ],
          filterMethod (value, row) {
            switch (value) {
              case '未审核':
                return row.status === '未审核'
              case '软件安装中':
                return row.status === '软件安装中'
              case '已审核':
                return row.status === '已审核'
              case '已驳回':
                return row.status === '已驳回'
            }
          }
        },
        {
          title: '操作',
          key: 'id',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: `./compAuditEdit.html?id=${params.row.id}&operator=${params.row.audit_text === '审核' ? 'audit' : 'midify'}&token=${this.$store.getters.getUserInfo.token}`
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
          obj.apply_type = data[i].apply_type
          obj.audit_text = data[i].audit_text
          obj.department_name = data[i].department_name
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
        console.log('this.instanceListDataBox', this.instanceListDataBox)
        return this.instanceListDataBox
      }
    }
  },
  methods: {
    selectInstanceListData (condition) {
      console.log('condition', condition)
      this.instanceListData = this.search(this.responseInstanceList, condition)
    },
    search (response, condition) {
      var result = []
      var data = response.data.data.list
      console.log(data)
      if (!data.length) { return result }
      if (!condition) {
        //  不筛选
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.application_id = data[i].application_id
          obj.application_name = data[i].application_name
          obj.apply_id = data[i].apply_id
          obj.apply_type = data[i].apply_type
          obj.audit_text = data[i].audit_text
          obj.department_name = data[i].department_name
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
          if (data[i].name.indexOf(condition) !== -1 || data[i].id.toString().indexOf(condition) !== -1 || data[i].department_name.indexOf(condition) !== -1) {
            obj = {}
            obj.application_id = data[i].application_id
            obj.application_name = data[i].application_name
            obj.apply_id = data[i].apply_id
            obj.apply_type = data[i].apply_type
            obj.audit_text = data[i].audit_text
            obj.department_name = data[i].department_name
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
      console.log(result)
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
      // console.log(response)
      this.responseInstanceList = response
      this.selectInstanceListData()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
