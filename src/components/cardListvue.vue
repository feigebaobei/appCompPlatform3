<template>
  <div>
    <!-- <p>{{tab}} {{isRenderMyApp}}</p> -->
    <cardvue v-if='isRenderMyApp' v-for="item in responseMyApp.data.data" :key="item.id" :item="item"></cardvue>
    <cardvue v-if='isRenderElseApp' v-for="item in responseElseApp.data.data" :key="item.id" :item="item"></cardvue>
    <cardvue v-if='isRenderOverview' v-for="item in responseOverview.data.data" :key="item.id" :item="item"></cardvue>
    <cardvue v-if='isRenderAudit' v-for="item in responseAudit.data.data" :key="item.id" :item="item"></cardvue>
  </div>
</template>

<script>
import cardvue from './cardvue.vue'
export default {
  name: 'cardListvue',
  props: ['tab'],
  data () {
    return {
      a: false,
      b: true,
      responseMyApp: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      responseElseApp: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      responseOverview: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      },
      responseAudit: {
        data: {
          data: [],
          message: '',
          status: ''
        },
        status: {}
      }
    }
  },
  components: {
    cardvue
  },
  computed: {
    isRenderMyApp () {
      return this.tab === '我的应用'
    },
    isRenderElseApp () {
      return this.tab === '其它应用'
    },
    isRenderOverview () {
      return this.tab === '概览'
    },
    isRenderAudit () {
      return this.tab === '审核管理'
    }
  },
  methods: {
    // 各请求方法
    requestMyApp () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine'
      }).then(response => {
        console.log(response)
        this.responseMyApp = response
      })
    },
    requestElseApp () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine'
      }).then(response => {
        console.log(response)
        this.responseElseApp = response
      })
    },
    requestOverview () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine'
      }).then(response => {
        console.log(response)
        this.responseOverview = response
      })
    },
    requestAudit () {
      this.$axios({
        method: 'get',
        url: 'http://api.console.doc/server/index.php?g=Web&c=Mock&o=simple&projectID=2&uri=/api/apps/mine'
      }).then(response => {
        console.log(response)
        this.responseAudit = response
      })
    },
    // 请求相应的数据
    requestTabData () {
      switch (this.tab) {
        case '我的应用':
          this.requestMyApp()
          this.a = true
          break
        case '其它应用':
          this.requestElseApp()
          break
        case '概览':
          this.requestOverview()
          break
        case '审核管理':
          this.requestAudit()
          break
      }
    }
  },
  mounted () {
    // 请求应用选项卡里的数据
    this.requestTabData()
  }
}
</script>

<style lang="scss" scoped>

</style>
