webpackJsonp([4],{EXqG:function(t,e){},bfEA:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={methods:{logout:function(){window.localStorage.removeItem("S_LOGIN_MESSAGE"),this.$router.push({name:"login"})}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list-index"},[n("el-row",{staticClass:"index-module bg-shadow",attrs:{gutter:20}},[n("el-col",{attrs:{span:3}},[n("router-link",{staticClass:"link-a",attrs:{to:{name:"runList"}}},[t._v("设备运行列表")])],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("router-link",{staticClass:"link-a",attrs:{to:{name:"IDused"}}},[t._v("试用ID使用记录")])],1),t._v(" "),n("el-col",{attrs:{span:3}},[n("router-link",{staticClass:"link-a",attrs:{to:{name:"authManage"}}},[t._v("授权码管理")])],1)],1),t._v(" "),n("el-dropdown",{attrs:{size:"small","split-button":"",type:"primary",plain:"",trigger:"hover"}},[t._v("\n        管理员\n        "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{nativeOn:{click:function(e){return t.logout(e)}}},[t._v("退出")])],1)],1),t._v(" "),n("router-view",{staticClass:"list-index-rv"})],1)},staticRenderFns:[]};var a=n("VU/8")(s,r,!1,function(t){n("EXqG")},null,null);e.default=a.exports}});