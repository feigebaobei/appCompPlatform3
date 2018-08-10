<template>
  <div>
    <layoutvue :nav="compAlertEdit"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'alertEdit',
  data () {
    return {
      compAlertEdit: 'compAlertEdit'
    }
  },
  components: {
    layoutvue
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style lang="scss" scoped>

</style>
