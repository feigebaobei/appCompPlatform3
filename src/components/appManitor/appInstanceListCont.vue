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
        <Button type="primary" @click="modal1 = true" class="addInstance">添加实例</Button>
        <!--弹框 start -->
        <Modal v-model="modal1" title="添加实例" @on-ok="ok" @on-cancel="cancel">
          <!--表单-->
          <Form :model="formItem" :label-width="80">
            <FormItem label="架构类型">
              <Row>
                <Col>
                  <RadioGroup v-model="formItem.radio">
                    <Radio label="0">集群版</Radio>
                    <Radio label="1">主从版</Radio>
                  </RadioGroup>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="容量">
              <Row>
                <Col span='20'>
                  <Input type="text" v-model="formItem.input" class="input"></Input>
                </Col>
                <Col span='4'>GB</Col>
              </Row>
            </FormItem>
            <FormItem label="节点类型">
              <Row>
                <Col>
                  <RadioGroup v-model="formItem.radio">
                    <Radio label="0">双副本</Radio>
                    <Radio label="1">单副本</Radio>
                  </RadioGroup>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="实例规格">
              <Row>
                <Col>
                  <Select v-model="formItem.select1">
                    <Option value="beijing">32G集群版</Option>
                    <Option value="shanghai">64G集群版</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="所属应用">
              <Row>
                <Col>
                  <Select v-model="formItem.select2">
                    <Option value="Redis">Redis</Option>
                    <Option value="Codis">Codis</Option>
                    <Option value="gateway">gateway</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="申请事由">
              <Row>
                <Col>
                  <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容..."></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitMoniter('formDataMoniter')">Submit</Button>
              <Button type="ghost" @click="handleResetMoniter('formDataMoniter')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
        <!--弹框 end -->
      </Col>
    </Row>
    <Table size="small" border :columns="columns1" :data="data1" style="margin: 15px 0 0 0;"></Table>
  </div>
</template>

<script>
export default {
  name: 'tablevue',
  data () {
    return {
      cityList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '正常',
          label: '正常'
        },
        {
          value: '异常',
          label: '异常'
        }
      ],
      model1: '',
      modal1: false,
      columns1: [
        {
          title: 'id',
          align: 'center',
          key: 'id'
        },
        {
          title: '实例名称',
          align: 'center',
          key: 'name',
          width: 100
        },
        {
          title: '所属应用',
          align: 'center',
          key: 'address',
          width: 100
        },
        {
          title: 'cpu',
          align: 'center',
          children: [
            {
              title: '实时',
              key: 'children1',
              align: 'center'
            },
            {
              title: '峰值',
              key: 'children2',
              align: 'center'
            },
            {
              title: '阀值',
              key: 'children3',
              align: 'center'
            }
          ]
        },
        {
          title: 'ops',
          align: 'center',
          children: [
            {
              title: '实时',
              key: '',
              align: 'center'
            },
            {
              title: '峰值',
              key: '',
              align: 'center'
            },
            {
              title: '阀值',
              key: '',
              align: 'center'
            }
          ]
        },
        {
          title: '实时连接数',
          align: 'center',
          children: [
            {
              title: '实时',
              key: '',
              align: 'center'
            },
            {
              title: '峰值',
              key: '',
              align: 'center'
            },
            {
              title: '阀值',
              key: '',
              align: 'center'
            }
          ]
        }, {
          title: '状态',
          align: 'center',
          key: 'address'
        }
      ],
      data1: [
        {
          id: '1',
          name: '直播-a',
          address: '学习中心',
          children1: '50%',
          children2: '50%',
          children3: '80%'
        }, {
          id: '1',
          name: '直播-b',
          address: '学习中心',
          children1: '50%',
          children2: '50%',
          children3: '80%'
        },
        {
          id: '3',
          name: '直播-c',
          address: '学习中心',
          children1: '50%',
          children2: '50%',
          children3: '80%'
        },
        {
          id: '4',
          name: '直播-d',
          address: '学习中心',
          children1: '50%',
          children2: '50%',
          children3: '80%'
        },
        {
          id: '5',
          name: '直播-e',
          address: '学习中心',
          children1: '80%',
          children2: '80%',
          children3: '80%'
        }
      ],
      formItem: {
        btn1: '',
        input: '',
        btn2: '',
        select1: '',
        select2: '',
        textarea: ''
      }
    }
  },
  computed: {},
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>

</style>
