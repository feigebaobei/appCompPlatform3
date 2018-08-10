<template>
  <div id="instance">
    <!-- instance -->
    <layoutvue :nav="appInstance"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'instance',
  data () {
    return {
      appInstance: 'appInstance'
    }
  },
  components: {
    layoutvue
  }
}
</script>

<style lang="scss" scoped>

</style>
