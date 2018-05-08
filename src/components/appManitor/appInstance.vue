<template>
  <div>
    <Row class="title">
      <Col span="22">
        <h1>实例列表</h1>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>实例名称</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].norms"></Col>
      <Col span="4"><h6>CPU核数</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].bind_cpu"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>VIP</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].redis_info.vip"></Col>
      <Col span="4"><h6>CPU核序号</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].cpu_kernals"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>端口号</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].redis_info.master[0].port"></Col>
      <Col span="4"><h6>内存</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].mem + 'G'"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>申请人</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].name"></Col>
      <Col span="4"><h6>硬盘</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].disk + 'G'"></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4"><h6>创建时间</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].create_time"></Col>
      <Col span="4"><h6>最大连接数</h6></Col>
      <Col span="8" v-html="responseInstance.data.data[0].max_conn"></Col>
    </Row>
    <!-- <Table border stripe :columns="columnsInstanceTable" :data="dataInstanceTable" class="table"></Table> -->
  </div>
</template>

<script>
export default {
  name: 'appInstance',
  data () {
    return {
      responseInstance: {
        data: {
          data: [
            {
              id: '',
              name: '',
              redis_info: {
                master: [
                  {
                    port: ''
                  }
                ],
                vip: ''
              }
            }
          ]
        }
      },
      columnsInstanceTable: [
        {
          title: '实例IP',
          key: 'ip',
          sortable: true
        },
        {
          title: '实例属性',
          key: 'norms',
          filters: [
            {
              label: 'Greater than 25',
              value: 1
            },
            {
              label: 'Less than 25',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.age > 25
            } else if (value === 2) {
              return row.age < 25
            }
          }
        },
        {
          title: '创建时间',
          key: 'create_time',
          sortable: true
        },
        {
          title: '创建人',
          key: 'name'
        }
      ]
    }
  },
  components: {},
  computed: {
    dataInstanceTable () {
      return {
        id: this.responseInstance.data.data[0].id,
        ip: this.responseInstance.data.data[0].redis_info.master[0].ip,
        norms: this.responseInstance.data.data[0].norms,
        create_time: this.responseInstance.data.data[0].create_time,
        name: this.responseInstance.data.data[0].name
      }
    }
  },
  methods: {
    getInstanceData () {
      const url = 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/redis/detail/id/9'
      this.$axios.get(url).then(response => {
        console.log(response)
        this.responseInstance = response
        // this.responseInstance = res
        // for(let i = 0; i < res.data.data.length; i++) {
        //   this.dataInstanceTable[i].id = this.responseInstance.id;
        //   this.dataInstanceTable[i].ip = this.responseInstance.redis_info.master[0].ip;
        //   this.dataInstanceTable[i].norms = this.responseInstance.norms;
        //   this.dataInstanceTable[i].create_time = this.responseInstance.create_time;
        //   this.dataInstanceTable[i].name = this.responseInstance.name;
        // }
      })
    }
  },
  created () {
    this.getInstanceData()
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 15px 0;
}
.code-row-bg {
  margin: 5px 0;
}
.table {
  margin: 15px 0 0 0;
}
</style>
