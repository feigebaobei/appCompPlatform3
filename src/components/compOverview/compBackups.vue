<template>
  <div>
    compBackups
    <!-- <Table height="600" border :data="backupsData" :columns="backupsColumns"></Table> -->
  </div>
</template>

<script>
export default {
  name: 'compBackups',
  data () {
    return {
      responseBackups: {
        data: {
          data: [],
          message: '',
          status: 0
        },
        status: 0
      }
    }
  },
  components: {},
  computed: {
    backupsData () {
      var result = []
      // // var data = this.responseAlertList.data.data
      // if (!data.length) { return result }
      // for (var i = 0, iLen = data.length; i < iLen; i++) {
      //   var obj = {}
      //   // obj.id = data[i].id
      //   result.push(obj)
      // }
      return result
    }
  },
  methods: {},
  mounted () {
    // 请求查看备份页面的数据。但是我找不到接口。
    this.$axios({
      method: '',
      url: ''
    }).then(response => {
      console.log(response)
      this.responseBackups = response
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
