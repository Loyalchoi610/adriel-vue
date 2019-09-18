<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    Promise.all([this.$store.dispatch('loadTodos'), this.$store.dispatch('loadDoings'), this.$store.dispatch('loadDones')])
            .then()
  }
}
</script>
<style>
 @import "assets/css/layout.css";
</style>
