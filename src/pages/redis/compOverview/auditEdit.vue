<template>
  <div>
    <layoutvue :nav="compAuditEdit"></layoutvue>
  </div>
</template>

<script>
import layoutvue from '../../../components/layoutvue.vue'
export default {
  name: 'auditEdit',
  data () {
    return {
      compAuditEdit: 'compAuditEdit'
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
