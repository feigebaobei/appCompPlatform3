<template>
  <div>
    <Row :gutter="25" style="margin: 24px 0">
      <Col span="8">
        <Input v-model="searchText" type="text" class="text" placeholder="实例名称/实例id" style="padding: 0 0 0 10px;"></Input>
      </Col>
      <Col span="8">
        <Button type="primary" @click="selectedInstanceData(searchText)">检索</Button>
      </Col>
    </Row>
    <!-- <Table height="600" border :data="instanceListDataBox.data" :columns="instanceListColumns"></Table> -->
    <Table height="600" border :data="instanceListData" :columns="instanceListColumns"></Table>
  </div>
</template>

<script>
export default {
  name: 'compInstanceList',
  data () {
    return {
      searchText: '',
      responseInstanceList: {
        data: {
          data: [],
          message: '',
          status: 0
        },
        status: 0
      },
      instanceListColumns: [
        {
          title: 'id',
          align: 'center',
          key: 'id',
          width: 80,
          fixed: 'left',
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '实例名称',
          align: 'center',
          // key: 'name',
          width: 100,
          fixed: 'left',
          sortable: true,
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: './compInstance.html?id=' + params.row.id + '&token=' + this.$store.getters.getUserInfo.token
              }
            }, params.row.name)
          }
        },
        {
          title: '所属应用',
          align: 'center',
          key: 'application_name',
          width: 100
        },
        {
          title: 'cpu',
          align: 'center',
          children: [
            {
              title: '实时',
              key: 'cpuReal',
              align: 'center',
              sortable: true
            },
            {
              title: '峰值',
              key: 'cpuPeak',
              align: 'center',
              sortable: true
            },
            {
              title: '阀值',
              key: 'cpuThreshol',
              align: 'center',
              sortable: true
            }
          ]
        },
        {
          title: 'ops',
          align: 'center',
          children: [
            {
              title: '实时',
              key: 'opsReal',
              align: 'center',
              sortable: true
            },
            {
              title: '峰值',
              key: 'opsPeak',
              align: 'center',
              sortable: true
            },
            {
              title: '阀值',
              key: 'opsThreshold',
              align: 'center',
              sortable: true
            }
          ]
        },
        {
          title: '实时连接数',
          align: 'center',
          children: [
            {
              title: '实时',
              key: 'conReal',
              align: 'center',
              sortable: true
            },
            {
              title: '峰值',
              key: 'conPeak',
              align: 'center',
              sortable: true
            },
            {
              title: '阀值',
              key: 'conThreshold',
              align: 'center',
              sortable: true
            }
          ]
        },
        {
          title: '状态',
          align: 'center',
          key: 'status',
          width: 80,
          fixed: 'right',
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
          filterMultiple: false,
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
        }
      ],
      instanceListDataBox: []
    }
  },
  components: {
  },
  computed: {
    instanceListData: {
      set (data) {
        this.instanceListDataBox = []
        // console.log(data)
        if (!data.length) { return [] }
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.application_name = data[i].application_name
          obj.audit_text = data[i].audit_text
          obj.conReal = data[i].conReal
          obj.conPeak = data[i].conPeak
          obj.conThreshold = data[i].conThreshold
          obj.cpuReal = data[i].cpuReal
          obj.cpuPeak = data[i].cpuPeak
          obj.cpuThreshol = data[i].cpuThreshol
          obj.id = data[i].id
          obj.name = data[i].name
          obj.opsReal = data[i].opsReal
          obj.opsPeak = data[i].opsPeak
          obj.opsThreshold = data[i].opsThreshold
          obj.port = data[i].port
          obj.status = data[i].status
          obj.vip = data[i].vip
          // result.push(obj)
          this.instanceListDataBox.push(obj)
        }
        // console.log(this.instanceListDataBox)
      },
      get () {
        return this.instanceListDataBox
      }
    }
  },
  methods: {
    selectedInstanceData (name) {
      // console.log(name)
      this.instanceListData = this.search(this.responseInstanceList, name)
    },
    search (response, condition) {
      // console.log(condition, 'condition')
      var result = []
      var data = response.data.data
      if (!data.length) { return [] }
      if (!condition) {
        for (var i = 0, iLen = data.length; i < iLen; i++) {
          var obj = {}
          obj.application_name = data[i].application_name
          obj.audit_text = data[i].audit_text
          obj.conReal = data[i].conn_info.real
          obj.conPeak = data[i].conn_info.peak
          obj.conThreshold = data[i].conn_info.threshold
          obj.cpuReal = data[i].cpu_info.real
          obj.cpuPeak = data[i].cpu_info.peak
          obj.cpuThreshol = data[i].cpu_info.threshold
          obj.id = data[i].id
          obj.name = data[i].name
          obj.opsReal = data[i].ops_info.real
          obj.opsPeak = data[i].ops_info.peak
          obj.opsThreshold = data[i].ops_info.threshold
          obj.port = data[i].port
          obj.status = data[i].status
          obj.vip = data[i].vip
          result.push(obj)
        }
      } else {
        for (i = 0, iLen = data.length; i < iLen; i++) {
          if (data[i].name.indexOf(condition) !== -1 || data[i].id.toString().indexOf(condition) !== -1) {
            obj = {}
            obj.application_name = data[i].application_name
            obj.audit_text = data[i].audit_text
            obj.conReal = data[i].conn_info.real
            obj.conPeak = data[i].conn_info.peak
            obj.conThreshold = data[i].conn_info.threshold
            obj.cpuReal = data[i].cpu_info.real
            obj.cpuPeak = data[i].cpu_info.peak
            obj.cpuThreshol = data[i].cpu_info.threshold
            obj.id = data[i].id
            obj.name = data[i].name
            obj.opsReal = data[i].ops_info.real
            obj.opsPeak = data[i].ops_info.peak
            obj.opsThreshold = data[i].ops_info.threshold
            obj.port = data[i].port
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
      url: 'http://infra.xesv5.com/api/redis/list/id/0?token=' + this.getRequest().token
    }).then(response => {
      console.log(response)
      this.responseInstanceList = response
      this.selectedInstanceData()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
