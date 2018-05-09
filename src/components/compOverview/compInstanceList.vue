<template>
  <div>
    <Row :gutter="25" style="margin: 24px 0">
      <Col span="8">
        <Input type="text" class="text" placeholder="实例名称/实例id" style="padding: 0 0 0 10px;"></Input>
      </Col>
      <Col span="8">
        <Button type="primary">添加实例</Button>
      </Col>
    </Row>
    <Table height="600" border :data="instanceListData" :columns="instanceListColumns"></Table>
  </div>
</template>

<script>
export default {
  name: 'compInstanceList',
  data () {
    return {
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
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '实例名称',
          align: 'center',
          // key: 'name',
          width: 100,
          sortable: true,
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: './compInstance.html?id=' + params.row.id
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
          filters: [
            {
              label: '已审核'
            },
            {
              label: '已审核'
            },
            {
              label: '已审核'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
          }
        }
      ]
    }
  },
  components: {
  },
  computed: {
    instanceListData () {
      var data = this.responseInstanceList.data.data
      var result = []
      if (!data) { return [] }
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
      return result
    }
  },
  methods: {},
  mounted () {
    // 请求表格数据
    this.$axios({
      method: 'get',
      url: 'http://10.99.1.135/api/redis/list/id/0'
    }).then(response => {
      console.log(response)
      this.responseInstanceList = response
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
