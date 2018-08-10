<template>
  <div>
    <!-- multipleThreshold -->
    <Select>
      <!-- <Option value="cpu">cpu</Option> -->
      <Option v-if="item.field.length" v-for="(ifield, index) in item.field" :key="index" :value="ifield.value" v-html="ifield.label"></Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'multipleThreshold',
  props: ['item'],
  data () {
    return {}
  },
  components: {},
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style lang="scss" scoped>

</style>
