<template>
  <div>
    <layoutvue :nav="compBackupsEdit"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'backupsList',
  data () {
    return {
      compBackupsEdit: 'compBackupsEdit'
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
