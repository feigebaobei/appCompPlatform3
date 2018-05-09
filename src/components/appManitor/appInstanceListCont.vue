<template>
  <div>
    <Row type="flex" justify="start" align="middle" :gutter="15">
      <Col span="10">
        <Input type="text" class="text" placeholder="实例名称/实例id" style="padding: 0 0 0 10px;"></Input>
      </Col>
      <Col span="4">
        <Button type="default" class="retrievalBtn">检索</Button>
      </Col>
      <Col span="3" offset="6">
        <Button type="primary" @click="modalAddInstance = true" class="addInstance">添加实例</Button>
        <!--弹框 start -->
        <Modal v-model="modalAddInstance" title="添加实例">
          <!--表单 start-->
          <Form ref="formDataAddInstance" :model="formDataAddInstance" :rules="formRuleAddInstance" :label-width="100">
            <FormItem label="架构类型" prop="version">
              <RadioGroup v-model="formDataAddInstance.version">
                <Radio label="colony">集群版</Radio>
                <Radio label="main">主从版</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="容量" prop="capacity">
              <Input v-model="formDataAddInstance.capacity" type="text" placeholder="请输入应用名称"></Input>
            </FormItem>
            <FormItem label="节点类型" prop="duplicate">
              <RadioGroup v-model="formDataAddInstance.duplicate">
                <Radio label="2">双副本</Radio>
                <Radio label="1">单副本</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="实例规格" prop="rule">
              <Select v-model="formDataAddInstance.rule" placeholder="请选择实例规格">
                <Option value="32">32G集群版</Option>
                <Option value="64">64G集群版</Option>
              </Select>
            </FormItem>
            <FormItem label="所属应用" prop="app">
              <Select v-model="formDataAddInstance.app" placeholder="请选择所属应用">
                <Option value="redis">redis</Option>
                <Option value="codis">codis</Option>
                <Option value="gateway">gateway</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitAddInstance('formDataAddInstance')">Submit</Button>
              <Button type="ghost" @click="handleResetAddInstance('formDataAddInstance')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
          <!--表单 end -->
          <div slot="footer"></div>
        </Modal>
        <!--弹框 end -->
      </Col>
    </Row>
    <Table height="800" border :columns="instanceListColumns" :data="instanceListData" style="margin: 15px 0 0 0;"></Table>
  </div>
</template>

<script>
export default {
  name: 'appInstanceListCont',
  data () {
    return {
      modalAddInstance: false,
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
                href: './appInstance.html?id=' + params.row.id
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
        }, {
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
      ],
      responseInstanceList: {
        data: {
          data: {},
          message: '',
          status: 0
        },
        status: 0
      },
      formDataAddInstance: {
        version: '',
        capacity: '',
        duplicate: '',
        rule: '',
        app: '',
        reason: ''
      },
      formRuleAddInstance: {
        version: [
          {required: true, message: '请选择版本', trigger: 'change'}
        ],
        capacity: [
          {required: true, message: '请输入容量', trigger: 'change'}
        ],
        duplicate: [
          {required: true, message: '请选择副本', trigger: 'change'}
        ],
        rule: [
          {required: true, message: '请选择实例规则', trigger: 'change'}
        ],
        app: [
          {required: true, message: '请选择所属应用', trigger: 'change'}
        ],
        reason: [
          {required: true, message: '请输入申请事由', trigger: 'change'}
        ]
      }
    }
  },
  computed: {
    instanceListData: {
      set () {},
      get () {
        var result = []
        var data = this.responseInstanceList.data.data
        if (!data.length) { return [] }
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
          // console.log(result)
        }
        return result
      }
    }
  },
  methods: {
    handleSubmitAddInstance (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: '',
            url: ''
          }).then(response => {
            console.log(response)
            this.modalAddInstance = false
            this.feedbackFormStatus(response.status === 200 && response.data.message === '操作成功')
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$Message.error('不可为空')
        }
      })
    },
    handleResetAddInstance (name) {
      this.$refs[name].resetFields()
    },
    // 回馈提交状态
    feedbackFormStatus (bool) {
      if (bool) {
        this.$Message.success('操作成功！')
      } else {
        this.$Message.error('操作失败！')
      }
    },
    getTableData () {
      let url = 'http://10.99.1.135/api/redis/list/id/0'
      this.$axios.get(url).then((res) => {
        console.log(res)
      })
    },
    ok () {
      this.$Message.info('申请成功')
    },
    cancel () {
      this.$Message.info('取消申请')
    }
  },
  mounted () {
    // this.getTableData()
    this.$axios({
      url: 'http://www.cloud.com/api/redis/list/id/0',
      method: 'get'
    }).then(response => {
      console.log(response)
      this.responseInstanceList = response
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
