<template>
  <div id="appDetail">
    <!-- appDetail -->
    <layoutvue :nav="appDetail"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'appDetail',
  data () {
    return {
      appDetail: 'appDetail'
    }
  },
  components: {
    layoutvue
  }
}
</script>

<style lang="scss" scoped>

</style>
