// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import '@/assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css';
import './config/vueConfig'
Vue.use(ElementUI);
Vue.config.productionTip = false

// 路由拦截
router.beforeEach((to, from, next) => {
  next()
});

router.afterEach( to => {
  
  console.log('ttt:',to)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
