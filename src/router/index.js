import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // linkActiveClass:"a-active",
  // mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login'],resolve) 
    },
    {
      path:"/",
      redirect:"/login"
    },
    {
      path:'/list',
      name:'list',
      component: resolve => require(['@/pages/list/index'],resolve),
      children:[
        {
          path:'/list/runList',
          name:"runList",
          component: resolve => require(['@/pages/list/runList'],resolve)
        },
        {
          path:"/list/IDused",
          name:"IDused",
          component: resolve => require(['@/pages/list/IDused'],resolve)
        },
        {
          path:"/list/authManage",
          name:"authManage",
          component: resolve => require(['@/pages/list/authManage'],resolve)
        },
        {
          path:"/list/fileList",
          name:"fileList",
          component: resolve => require(['@/pages/list/fileList'],resolve)
        },
        {
          path:"/list/addDevice",
          name:"addDevice",
          component: resolve => require(['@/pages/list/addDevice'],resolve)
        }
      ]
    },
    {
      path:'/*',
      redirect:'/list/runList'
    }
  ]
})
