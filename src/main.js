// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, {
  TabPane
} from 'element-ui';
import '@/assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css';
import './config/vueConfig'
import './filter/index'
Vue.use(ElementUI);
Vue.config.productionTip = false

// 路由拦截
router.beforeEach((to, from, next) => {
  // console.log(to, JSON.parse(window.localStorage.getItem("S_LOGIN_MESSAGE")))
  // next();


  if (window.localStorage.getItem("S_LOGIN_MESSAGE")) {
    if (to.path == '/login' || to.path.indexOf('/login') > -1) {
      next({
        path:'/list/runList'
      })
    } else {
      next()
    }

  } else {
    if (to.path == '/login' || to.path == '/' || to.path.indexOf('/login') > -1) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }

  }
});

router.afterEach(to => {

  // console.log('ttt:', to)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
