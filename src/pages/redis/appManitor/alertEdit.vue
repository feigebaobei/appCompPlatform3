<template>
  <div id="alertEdit">
    <!-- alertEdit -->
    <layoutvue :nav="appAlertEdit"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'alertEdit',
  data () {
    return {
      appAlertEdit: 'appAlertEdit'
    }
  },
  components: {
    layoutvue
  }
}
</script>

<style lang="scss" scoped>

</style>
