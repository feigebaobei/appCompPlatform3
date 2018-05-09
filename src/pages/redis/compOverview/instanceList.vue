<template>
  <div id="instanceList">
    <layoutvue :nav="compInstanceList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'instanceList',
  data () {
    return {
      compInstanceList: 'compInstanceList'
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
