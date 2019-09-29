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
            // 의도가 비동기 처리를 위한 순서를 맞추기 위한거였다면 async-await를 사용하시는 편이 더 좋을 것 같습니다.
            // 그런 의도가 만약에 없으셨다면 Promise.all을 굳이 사용하실 필요는 없을 것 같습니다.
  }
}
</script>
<style>
 @import "assets/css/layout.css";
 /* Preprocessor(ex. SCSS)를 활용하시는 것을 추천드립니다. */
</style>
