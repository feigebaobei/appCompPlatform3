<template>
  <div>
    <Row>
      <Col style="border-bottom: 1px solid #d8d8d8;">
        <h2><a href="javascript:history.go(-1)" style="text-decoration: none;color: #000;">＜ 备份策略</a></h2>
      </Col>
    </Row>
    <Row class="title">
      <Col span="24">
        <h1>备份策略</h1>
      </Col>
    </Row>
    <Row class="time">
      <!-- <Col span="7">
        <DatePicker type="date" placeholder="--开始时间--" style="width: 200px" format="yyyy年MM月dd日" @on-change="selectInstanceListData"></DatePicker>
      </Col>
      <Col span="7">
        <DatePicker type="date" placeholder="--结束时间--" style="width: 200px" format="yyyy年MM月dd日" @on-change="selectInstanceListData"></DatePicker>
      </Col> -->
      <Col>
        <DatePicker type="daterange" placeholder="请选择时间范围" style="width: 200px" format="yyyy年MM月dd日" @on-change="selectInstanceListData"></DatePicker>
      </Col>
      <Col span="6" push="8">
        预计下次备份时间:{{backupsDataList[0].next_time}}
      </Col>
    </Row>
    <div style="margin-top:12px;">
      <Table border stripe :columns="columns1" :data="instanceListData"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'compBackups',
  data () {
    return {
      timeStart: '',
      timeEnd: '',
      backupsDataList: [],
      columns1: [
        {
          title: '实例名称',
          key: 'instance_name',
          align: 'center',
          sortable: true
        },
        {
          title: '实例id',
          key: 'instance_id',
          align: 'center',
          sortable: true
        },
        {
          title: '所属应用',
          key: 'application_name',
          align: 'center',
          sortable: true
        },
        {
          title: '备份时间',
          key: 'start_time',
          align: 'center',
          sortable: true
        },
        {
          title: '备份策略',
          key: 'policy',
          align: 'center',
          sortable: true
        },
        {
          title: '备份大小',
          key: 'size',
          align: 'center',
          sortable: true
        },
        {
          title: '备份类型',
          key: 'type',
          align: 'center',
          sortable: true
        },
        {
          title: '备份状态',
          key: 'status',
          align: 'center',
          filters: [
            {
              label: '已完成',
              value: '已完成'
            },
            {
              label: '进行中',
              value: '进行中'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === '已完成') {
              return row.status === '已完成'
            } else {
              if (value === '进行中') {
                return row.status === '进行中'
              }
            }
          }
        }
      ],
      instanceListData: []
    }
  },
  components: {},
  methods: {
    selectInstanceListData (dateArr) {
      this.instanceListData = this.search(this.responseInstanceList, dateArr)
    },
    search (response, dateArr) {
      console.log(dateArr)
      var result = []
      var data = response.data.data
      if (!data.length) { return result }
      if (!dateArr.length) {
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
      } else {
        for (i = 0, iLen = data.length; i < iLen; i++) {
          // var dateArr =
          var item = data[i].start_time
          var datay = item.slice(0, 4)
          var datam = item.slice(5, 7)
          var datad = item.slice(8, 10)
          var dateArry0 = dateArr[0].slice(0, 4)
          var dateArrm0 = dateArr[0].slice(5, 7)
          var dateArrd0 = dateArr[0].slice(8, 10)
          var dateArry1 = dateArr[1].slice(0, 4)
          var dateArrm1 = dateArr[1].slice(5, 7)
          var dateArrd1 = dateArr[1].slice(8, 10)
          if (dateArry0 < datay && dateArrm0 < datam && dateArrd0 < datad && datay < dateArry1 && datam < dateArrm1 && datad < dateArrd1) {
            obj = {}
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
    // 请求查看备份页面的数据。但是我找不到接口。
    this.$axios({
      method: 'get',
      url: `http://infra.xesv5.com/api/backup/list/id/${this.getRequest().id}/start_time/0/end_time/0?token=${this.getRequest().token}`
    }).then(res => {
      this.backupsDataList = res.data.data
      console.log('这是备份页面传递过来的id请求的数据', this.backupsDataList)
      for (let i of this.backupsDataList) {
        this.instanceListData.push({
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
      this.selectInstanceListData()
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
