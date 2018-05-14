<template>
  <div>
    <!-- 应用管理 start -->
    <div class="apppanel" v-if="userInfo.role === 2">
      <!-- </slot> -->
      <a :href="linkApp(item)">
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
          <a :href="linkApp(item)">
            <Button>进入应用</Button>
          </a>
        </Col> -->
      </Row>
    </div>
    <!-- 应用管理 end -->
    <!-- 组件概览 start -->
    <div class="comppanel" v-if="userInfo.role === 1">
      <h2>Redis</h2>
      <Row :gutter="15">
        <Col span="12">
          <Row :gutter="10">
            <Col span="12">
              <a :href="linkAbnormalInstance(item)">
                <h3><span class="abnormal" v-html="item.bad_instance">个</span></h3>
                <p>异常实例</p>
              </a>
            </Col>
            <Col span="12">
              <a :href="linkNormalInstance(item)">
                <h3><span class="abnormal" v-html="item.good_instance">个</span></h3>
                <p>正常实例</p>
              </a>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row>
            <a :href="linkAbnormalApp(item)">
              <span>异常应用</span>
              <span class="right"><span v-html="item.bad_application"></span>个</span>
            </a>
          </Row>
          <Row>
            <a :href="linkNormalApp(item)">
              <span>正常应用</span>
              <span class="right"><span v-html="item.good_application"></span>个</span>
            </a>
          </Row>
        </Col>
      </Row>
    </div>
    <!-- 组件概览 end -->
  </div>
</template>

<script>
export default {
  name: 'cardvue',
  props: ['item'],
  data () {
    return {
      panelTitle: ['Redis', 'Codis'],
      token: this.$store.getters.getUserInfo.token
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    },
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
  watch: {
    token (val, oldVal) {
      console.log(val)
      console.log(oldVal)
      return val
    }
  },
  methods: {
    linkApp (item) {
      // return './appDetail.html?id=' + item.id
      return `./appDetail.html?id=${item.id}&token=${this.$store.getters.getUserInfo.token}`
    },
    linkAbnormalInstance (item) {
      return `./appInstanceList.html?token=${token}` // 应该在vuex里设置参数，然后在新页面时使用这个参数。
    },
    linkNormalInstance (item) {
      return `./appInstanceList.html?token=${token}` // 应该在vuex里设置参数，然后在新页面时使用这个参数。
    },
    linkAbnormalApp (item) {
      return `./appInstanceList.html?token=${token}` // 应该在vuex里设置参数，然后在新页面时使用这个参数。
    },
    linkNormalApp (item) {
      return `./appInstanceList.html?token=${token}` // 应该在vuex里设置参数，然后在新页面时使用这个参数。
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
    .badge {
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
.comppanel {
  .right {
    float: right;
  }
}
</style>
