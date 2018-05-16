<template>
  <div>
    <Row>
      <Col style="border-bottom: 1px solid #d8d8d8;">
        <h2><a href="javascript:history.go(-1)" style="text-decoration: none;color: #000;">＜ 备份策略</a></h2>
      </Col>
    </Row>
    <Form ref="formItem" :model="formItem" :rules="formItems" :label-width="80">
      <FormItem label="策略名称" prop="name">
        <Input v-model="formItem.name" placeholder="请输入策略名称"></Input>
      </FormItem>
      <FormItem label="策略类型" prop="policy_type_group">
        <Select v-model="formItem.policy_type_group">
           <Option v-for="item in editData.policy_type_group" :key="item.id" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="所属应用" prop="application_group">
        <Select v-model="formItem.application_group">
          <Option v-for="item in editData.application_group" :key="item.id" :value="item.id" v-html="item.name"></Option>
        </Select>
      </FormItem>
      <FormItem label="备份对象" prop="target_group">
        <RadioGroup v-model="formItem.target_group">
           <Radio v-for="item in editData.target_group" :key="item.id" :label="item.id">{{item.name}}</Radio>
        </RadioGroup>
      </FormItem>
      <transfervue v-show="transferShow" :instancesId="formItem.application_group" :targetKey="formItem.instance_id" @modifyTransferData="modifyTransferData"></transfervue>
      <FormItem label="备份周期">
        <span>每天</span>
      </FormItem>
      <FormItem label="备份时间" prop="time_group">
        <Select v-model="formItem.time_group">
           <Option v-for="item in editData.time_group" :key="item.id" :value="item.id" v-html="item.name"></Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmitAndAlert('formItem')">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import transfervue from '../transfer.vue'
export default {
  name: 'compBackupsEdit',
  data () {
    return {
      editData: '',
      formItem: {
        name: '',
        policy_type_group: '',
        application_group: '',
        target_group: '',
        time_group: '',
        instance_id: ''
      },
      // 表单验证
      formItems: {
        name: [
          {required: true, message: '请输入策略名称', trigger: 'change'}
        ],
        application_group: [
          {required: true, message: '请选择所属应用', pattern: /.+/, trigger: 'change'}
        ],
        policy_type_group: [
          {required: true, message: '请选择策略类型', pattern: /.+/, trigger: 'change'}
        ],
        target_group: [
          {required: true, message: '请选择备份对象', pattern: /.+/, trigger: 'change'}
        ],
        time_group: [
          {required: true, message: '请选择时间', pattern: /.+/, trigger: 'change'}
        ]
      }
    }
  },
  components: {
    transfervue
  },
  computed: {
    transferShow () {
      return this.formItem.target_group === 2
    },
    instancesIdComputed () {
      var instanceId = this.formItem.instance_id
      if (!instanceId.length) {
        return []
      } else {
        var arr = instanceId.split(',')
        return arr
      }
    }
  },
  methods: {
    // 编辑提交
    handleSubmitAndAlert (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://infra.xesv5.com/api/backup/edit?token=' + this.getRequest().token,
            data: this.qs.stringify({
              name: this.formItem.name,
              type: this.formItem.policy_type_group,
              application_id: this.formItem.application_group,
              target: this.formItem.target_group,
              period: this.formItem.time_group,
              instance_id: this.formItem.instance_id.join,
              id: this.getRequest().id
            })
          }).then(res => {
            console.log(res)
            this.febackFormStatus(res.data.status === 0, res.data.data)
            window.history.go(-1)
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.feedbackFormStatus(false)
        }
      })
    },
    handleResetAndAlert (name) {
      this.$refs[name].resetFields()
    },
    feedbackFormStatus (bool) {
      if (bool) {
        this.$Message.success('操作成功！')
      } else {
        this.$Message.error('操作失败！')
      }
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
    },
    // modifyTransferData
    modifyTransferData (params) {
      this.formDataCreateBackups.instance_id = params
    }
  },
  created () {
    // 编辑页面渲染数据
    const url = `http://infra.xesv5.com/api/backup/edit_page/id/${this.getRequest().id}?token=${this.getRequest().token}`
    this.$axios.get(url).then(res => {
      this.editData = res.data.data
      this.formItem.name = this.editData.name
      this.formItem.application_group = this.editData.application_id
      this.formItem.policy_type_group = this.editData.policy_type
      this.formItem.instance_id = this.editData.instance_id
      this.formItem.target_group = this.editData.target_type
      this.formItem.time_group = this.editData.period
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
