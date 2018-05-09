<template>
  <div>
    <Row class="title">
      <Col span="22">
      <h1>备份策略</h1>
      </Col>
      <Col span="2">
      <Button type="primary" @click="modalCreateBackups = true">申请备份策略</Button>
      <Modal v-model="modalCreateBackups" title="创建备份" :styles="{top: '20px'}">
        <Form :model="formDataCreateBackups" :label-width="80">
          <FormItem label="策略名称" prop="name">
            <Input v-model="formDataCreateBackups.name" placeholder="请输入策略名称"></Input>
          </FormItem>
          <FormItem label="策略类型" prop="type">
            <Select v-model="formDataCreateBackups.type">
              <!-- 没找到 -->
              <!-- <Option v-for="item in formDataCreateBackups.data.data.application_group" :key="item.id" :value="item.name">{{item.name}}</Option> -->
            </Select>
          </FormItem>
          <FormItem label="所属应用" prop="app">
            <Select v-model="formDataCreateBackups.app">
              <Option v-for="item in responseCreateBackups.data.data.application_group" :key="item.id" :value="item.name" v-html="item.name"></Option>
            </Select>
          </FormItem>
          <FormItem label="备份对象">
            <RadioGroup v-model="formDataCreateBackups.radio">
              <!-- <Radio v-for="item in responseCreateBackups.data.data.target_group" :key="item.id" :label="item.id" v-html="item.name"></Radio> -->
            </RadioGroup>
          </FormItem>
          <Row v-if="formDataCreateBackups.radio === 2">
            <Col span="24">
              <Transfer filterable="true" :data="data1" :target-keys="targetKeys1" :render-format="render1" @on-change="handleChange1"></Transfer>
            </Col>
          </Row>
          <!-- <FormItem label="备份周期" prop="time">
            <RadioGroup v-model="formDataCreateBackups.data.data.time_group">
              <Radio label="每天">每天</Radio>
            </RadioGroup>
          </FormItem> -->
          <Row style="margin: 0 0 24px 0;">
            <Col>
            备份周期
            </Col>
            <Col>
            每天
            </Col>
          </Row>
          <FormItem label="备份时间" prop="time">
            <Select v-model="formDataCreateBackups.time">
              <!-- <Option v-for="(item, index) in formDataCreateBackups.data.data.time_group" :key="index" :value="item" v-html="item"></Option> -->
            </Select>
          </FormItem>
        </Form>
      </Modal>
      </Col>
    </Row>
    <Table border stripe height="800" :columns="backupsListColumns" :data="backupsListData"></Table>
  </div>
</template>

<script>
export default {
  name: 'compBackupsList',
  data () {
    return {
      responseBackupsList: {
        data: {
          data: [],
          message: '',
          status: 0
        },
        status: 0
      },
      modalCreateBackups: false,
      formDataCreateBackups: {
        name: '23456',
        app: '',
        select2: '',
        radio: 1,
        radio2: '每天',
        select3: ''
      },
      formRuleCreateBackups: {
        name: [
          {required: true, message: '请输入策略名称', trigger: 'change'}
        ]
      },
      backupsListColumns: [
        {
          title: 'id',
          key: 'instance_id'
        },
        {
          title: '策略名称',
          // key: 'policy',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: './compBackups.html?id=' + params.row.instance_id
              }
            }, params.row.policy)
          }
        },
        {
          title: '策略类型',
          key: 'type'
        },
        {
          title: '所属应用',
          key: 'application_name'
        },
        {
          title: '备份策略',
          key: ''// 没找到
        },
        {
          title: '备份时间',
          key: 'next_time'
        },
        {
          title: '上次操作人',
          key: ''// 没找到
        },
        {
          title: '状态',
          key: 'status'// 没找到
        },
        {
          title: '操作',
          key: '',
          render: (h, params) => {
            return h('Button', {
              attrs: {
                href: './compBackups.html?id=' + params.row.instance_id
              }
            }, params.row.status === '已完成' ? '启用' : '停用')
          }
        }
      ],
      responseCreateBackups: {
        data: {
          data: {},
          message: '',
          status: 0
        },
        status: 0
      }
    }
  },
  components: {},
  computed: {
    backupsListData () {
      var result = []
      var data = this.responseBackupsList.data.data
      if (!data.length) { return result }
      for (var i = 0, iLen = data.length; i < iLen; i++) {
        var obj = {}
        obj.application_name = data[i].application_name
        obj.instance_id = data[i].instance_id
        obj.instance_name = data[i].instance_name
        obj.next_time = data[i].next_time
        obj.policy = data[i].policy
        obj.size = data[i].size
        obj.start_time = data[i].start_time
        obj.status = data[i].status
        obj.type = data[i].type
        result.push(obj)
      }
      return result
    }
    // formDataCreateBackups () {
    //   var data = this.responseCreateBackups.data.data
    //   console.log(data)
    //   return {
    //     name: data.name,
    //     type: data.type
    //   }
    // }
  },
  methods: {},
  mounted () {
    // 请求备份数据
    this.$axios({
      url: 'http://10.99.1.135/api/backup/list/id/0',
      method: 'get'
    }).then(response => {
      // console.log(response)
      this.responseBackupsList = response
    })
    // 添加备份数据
    this.$axios({
      url: 'http://10.99.1.135/api/backup/add_page/',
      method: 'get'
    }).then(response => {
      // console.log(response)
      this.responseCreateBackups = response
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 25px 15px;
}
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
      top: -20px;
  }
}
</style>
