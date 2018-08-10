<template>
  <div>
    <layoutvue :nav="compBackups"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'backups',
  data () {
    return {
      compBackups: 'compBackups'
    }
  },
  components: {
    layoutvue
  },
  computed: {
  },
  methods: {},
  mounted () {}
}
</script>

<style lang="scss" scoped>

</style>
