<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <layoutvue :nav="appManage"></layoutvue>
  </div>
</template>

<script>
import layoutvue from './components/layoutvue.vue'
export default {
  name: 'App',
  data () {
    return {
      appManage: 'appManage'
    }
  },
  components: {
    layoutvue
  }
}
</script>

<style lang="scss">

</style>
