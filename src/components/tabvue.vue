<template>
  <div>
    <Tabs type="card">
      <TabPane :label="tabs[0]">
        <cardListvue :tab="tabs[0]"></cardListvue>
      </TabPane>
      <TabPane :label="tabs[1]">
        <cardListvue :tab="tabs[1]"></cardListvue>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import cardListvue from './cardListvue.vue'
export default {
  name: 'tab',
  data () {
    return {
      // tabs: this.tabArr()
    }
  },
  components: {
    cardListvue
  },
  computed: {
    /* 根据用户身份，显示选项卡。 start */
    userInfo () {
      return this.$store.getters.getUserInfo
    },
    tabs () {
      switch (this.userInfo.department_name) {
        case 'development':
          return ['我的应用', '其它应用']
        case 'maintenance':
          return ['概览', '审核管理']
      }
    }
    /* 根据用户身份，显示选项卡。 end */
  },
  methods: {
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>

</style>
