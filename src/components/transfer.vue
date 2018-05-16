<template>
  <div class='transfer'>
    <Row style="margin: 0 0 15px 0; text-align: center;">
      <Col span="12">
        <span>源列表</span>
      </Col>
      <Col span="12">
        <span>目标列表</span>
      </Col>
    </Row>
    <Transfer filterable filter-placeholder="实例名称/实例id" :titles="listTitle" :list-style='listStyle' :data='transferData' :target-keys='transferTargetKey' :render-format='transferRender' @on-change='transferHandleChange' style='margin: 0 0 24px 80px;'></Transfer>
  </div>
</template>
<script>
export default {
  name: 'transfer',
  props: ['instancesId', 'targetKeys'],
  data () {
    return {
      transferData: [],
      // transferTargetKey: [],
      transferTargetKey: this.targetKeys,
      listStyle: {
        width: '250px',
        height: '300px'
      },
      listTitle: ['实例名称   实例id ip地址', '实例名称   实例id ip地址']
    }
  },
  watch: {
    instancesId: function (val, oldVal) {
      console.log('val', val, 'oldVal', oldVal)
      if (val !== '') {
        this.requestData()
      }
    },
    targetKeys (val, oldVal) {
      console.log('val', val, 'oldVal', oldVal)
      this.transferTargetKey = val
    }
  },
  methods: {
    transferRender (item) {
      return item.label
    },
    transferHandleChange (newTargetKey, direction, moveKeys) {
      this.transferTargetKey = newTargetKey
      // 触发父组件里的事件，把修改后的值传给父组件
      this.$emit('modifyTransferData', this.transferTargetKey)
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
    requestData () {
      const url = `http://infra.xesv5.com/api/redis/get_instances/id/${this.instancesId}?token=${this.getRequest().token}`
      this.$axios.get(url).then(res => {
        // console.log(res.data.data)
        this.transferData = []
        for (let i of res.data.data) {
          // console.log(res)
          this.transferData.push({
            key: i.id,
            label: `${i.name.slice(0, 10)}&nbsp;&nbsp;&nbsp;&nbsp;${i.id}&nbsp;&nbsp;&nbsp;&nbsp;${i.vip}`,
            disabled: false
          })
        }
      })
    }
  },
  created () {
    console.log('应用id', this.instancesId)
    console.log('targetKeys', this.targetKeys)
    if (this.instancesId !== '') {
      this.requestData()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
