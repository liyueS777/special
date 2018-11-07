<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // document.querySelector("#loadingWrap").style.display = 'none';
    document.querySelector("#loadingWrap").classList.add("loadingWrap-animate")
    //loadingWrap-animate
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
  background: #eff0f4;
}
</style>
