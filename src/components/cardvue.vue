<template>
  <div class="apppanel">
    </slot>
    <a :href="link(item)">
      <h3 v-html="item.name" class="titleName"></h3>
    </a>
    <!-- <p class="deptName">
      <span class="monite" v-html="item.flag ? '管理' : ''"></span>
    </p> -->
    <div class="content">
      <!-- <Badge count="3"> -->
      <!-- <a href="#" class="demo-badge" v-for="item in calcComptName" v-html="item"></a> -->
      <!-- <span class="badge" v-for="text in calcComptName" v-html="text" :key="text"></span> -->
      <!-- </Badge> -->
      <!-- <a href="#" class="badge" v-for="text in calcComptName" v-html="text" :key="text"></a> -->
      <a href="#" class="badge" v-for="text in item.component_name" :key="text" v-html="text"></a>
    </div>
    <Row class="bottom">
      <Col span="24">
        <!-- 部门名称 -->
        <span v-if="calcDepartment.length" v-for="text in calcDepartment" :key="text" v-html="text" style="margin: 0 5px;"></span>
      </Col>
      <!-- <Col span="9">
        <a :href="link(item)">
          <Button>进入应用</Button>
        </a>
      </Col> -->
    </Row>
  </div>
</template>

<script>
export default {
  name: 'cardvue',
  props: ['item'],
  data () {
    return {}
  },
  computed: {
    calcComptName () {
      // console.log(this.item)
      var str = this.item.compt_name
      var arr = str.split(',')
      return arr
    },
    calcDepartment () {
      var depart = this.item.department_name
      var arr = depart.split(',')
      // console.log(arr)
      return arr
    }
  },
  methods: {
    link (item) {
      // return './appDetail.html?id=' + item.id
      return `./appDetail.html?id=${item.id}&token=${this.$store.getters.getUserInfo.token}`
    }
  }
}
</script>

<style lang="scss" scoped>
.apppanel {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 15px 10px;
  padding: 12px 10px;
  display: inline-block;
  width: 260px;
  .titleName {
    display: inline-block;
  }
  .deptName {
    display: inline-block;
    text-align: right;
    float: right;
  }
  .content {
    margin: 15px 5px 10px;
    .badge{
      height: 42px;
      background: #eee;
      border-radius: 6px;
      display: inline-block;
      line-height: 42px;
      text-align: middle;
      padding: 0 10px;
      text-align: center;
      margin: 5px 5px;
    }
  }
  .monite {
    color: #fff;
    background: #e22;
    border-radius: 3px;
    padding: 0px 3px;
  }
  .bottom {
    .name {
      max-width: 75%;
      word-break: break-all;
    }
  }
}
</style>
