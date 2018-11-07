<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }
    // document.querySelector("#loadingWrap").style.display = 'none';
    var loadingWrap = document.querySelector("#loadingWrap");
    loadingWrap.classList.add("loadingWrap-animate");
    for (let t in animations){
      loadingWrap.addEventListener(animations[t], fAction(animations[t]),false);
    };
    
    function fAction(type){
      return function(type){
        console.log(type)
        loadingWrap.style.display = 'none';
        loadingWrap.removeEventListener(type,fAction(type),false);
      }
    }
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
.appBody {
  z-index: 3;
}
</style>
