<template>
  <div>
    <layoutvue :nav="compRecoverList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'recoverList',
  data () {
    return {
      compRecoverList: 'compRecoverList'
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
