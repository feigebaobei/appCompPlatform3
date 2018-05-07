<template>
  <div id="instanceList">
    <layoutvue :nav="compOverview"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'instanceList',
  data () {
    return {
      compOverview: 'compOverview'
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
