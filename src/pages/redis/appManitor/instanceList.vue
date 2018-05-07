<template>
  <div id="instanceList">
    instanceList
    <layoutvue :nav="appInstanceList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'instanceList',
  data () {
    return {
      appInstanceList: 'appInstanceList'
    }
  },
  components: {
    layoutvue
  }
}
</script>

<style lang="scss" scoped>

</style>
