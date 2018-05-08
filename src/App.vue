<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <layoutvue :nav="appManageAndOverview"></layoutvue>
    <!-- <layoutvue></layoutvue> -->
  </div>
</template>

<script>
import layoutvue from './components/layoutvue.vue'
export default {
  name: 'App',
  data () {
    return {
      appManageAndOverview: 'appManageAndOverview'
    }
  },
  components: {
    layoutvue
  }
}
</script>

<style lang="scss">

</style>
