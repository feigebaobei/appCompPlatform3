<template>
  <div>
    <layoutvue :nav="compBackupsList"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'backupsList',
  data () {
    return {
      compBackupsList: 'compBackupsList'
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
