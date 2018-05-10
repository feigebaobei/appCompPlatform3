<template>
  <div>
    <Row class="title">
      <Col span="24">
        <h1>备份策略</h1>
      </Col>
    </Row>
    <Row class="time">
      <Col span="5">
        <DatePicker type="date" placeholder="--开始时间--" style="width: 200px"></DatePicker>
      </Col>
      <Col span="5">
        <DatePicker type="date" placeholder="--结束时间--" style="width: 200px"></DatePicker>
      </Col>
      <Col span="6" push="8">
        预计下次备份时间:{{backupsDataList[0].next_time}}
      </Col>
    </Row>
    <div style="margin-top:12px;">
      <Table border stripe :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'compBackups',
  data () {
    return {
      backupsDataList: '',
      columns1: [
        {
          title: '实例名称',
          key: 'instance_name'
        },
        {
          title: '实例id',
          key: 'instance_id'
        },
        {
          title: '所属应用',
          key: 'application_name'
        },
        {
          title: '备份时间',
          key: 'start_time'
        },
        {
          title: '备份策略',
          key: 'policy'
        },
        {
          title: '备份大小',
          key: 'size'
        },
        {
          title: '备份类型',
          key: 'type'
        },
        {
          title: '备份状态',
          key: 'status'
        }
      ],
      data1: []
    }
  },
  components: {},
  methods: {
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
    // 请求查看备份页面的数据。但是我找不到接口。
    this.$axios({
      method: 'get',
      url: `http://10.99.1.135/api/backup/list/id/${this.getRequest().id}/start_time/0/end_time/0`
    }).then(res => {
      this.backupsDataList = res.data.data
      console.log('这是备份页面传递过来的id请求的数据', this.backupsDataList)
      for (let i of this.backupsDataList) {
        this.data1.push({
          instance_name: i.instance_name,
          instance_id: i.instance_id,
          application_name: i.application_name,
          start_time: i.start_time,
          policy: i.policy,
          size: i.size,
          type: i.type,
          status: i.status
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.table {
  padding: 25px;
}
.time{
  padding-top: 25px;
}
</style>
