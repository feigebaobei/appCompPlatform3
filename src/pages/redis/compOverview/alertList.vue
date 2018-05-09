<template>
  <div>
    <layoutvue :nav="compAlertList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'alertList',
  data () {
    return {
      compAlertList: 'compAlertList'
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
