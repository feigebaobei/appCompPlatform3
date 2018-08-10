<template>
  <div>
    <layoutvue :nav="appAlertList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'alertList',
  data () {
    return {
      appAlertList: 'appAlertList'
    }
  },
  components: {
    layoutvue
  }
}
</script>

<style lang="scss" scoped>

</style>
