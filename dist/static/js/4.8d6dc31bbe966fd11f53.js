webpackJsonp([4],{CuuP:function(e,t){},RhBm:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("2hMI"),n={data:function(){return{dataStatics:{lastMonthCount:0,thisMonthCount:0,totalCount:0,unusableCount:0,useableCount:0},phone:"",IDusedList:[1,2,3,4],pageSize:10,currentPage:1,totalPage:4,IDusedVisible:!1,createIDusedForm:{name:"",id:""},rules:{name:[{required:!0,message:"请输入代理名称",trigger:"change"}],id:[{required:!0,message:"请输入代理id",trigger:"change"}]}}},created:function(){this.getStatistics(),this.getTrialAccounts(this.createIDusedForm,this.pageSize)},methods:{getStatistics:function(){var e=this;Object(s.e)().then(function(t){1==t.code?e.dataStatics=t.data:e.$message.warning("查询试用ID数据统计异常~")}).catch(function(t){e.$message.warning("查询试用ID数据统计异常~")})},getTrialAccounts:function(e,t){var a=this;Object(s.f)({page:e,limit:t}).then(function(e){1==e.code||a.$message.warning("查询试用ID列表数据异常~")}).catch(function(e){a.$message.warning("查询试用ID列表数据异常~")})},getRowClass:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;return 0==t?"background:#498e26;color:#fff":""},createID:function(){this.IDusedVisible=!0,this.createIDusedForm.id&&this.createIDusedForm.name&&this.resetForm("ruleForm")},handleRunlist:function(e){},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.$message.success("创建成功"),setTimeout(function(){t.IDusedVisible=!1},1e3)})},resetForm:function(e){this.$refs[e].resetFields()}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"IDused"},[a("el-row",{staticClass:"IDused-module bg-shadow",attrs:{gutter:20}},[a("el-col",{attrs:{span:3}},[a("div",{staticClass:"num"},[e._v("试用ID总数："+e._s(e.dataStatics.totalCount))])]),e._v(" "),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"num"},[e._v("正常ID数量："+e._s(e.dataStatics.useableCount))])]),e._v(" "),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"num"},[e._v("停用ID数量数："+e._s(e.dataStatics.unusableCount))])]),e._v(" "),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"num"},[e._v("上月试用次数："+e._s(e.dataStatics.lastMonthCount))])]),e._v(" "),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"num"},[e._v("本月试用次数："+e._s(e.dataStatics.thisMonthCount))])])],1),e._v(" "),a("div",{staticClass:"line-l bg-shadow"},[a("el-button",{attrs:{size:"mini",type:"success"},nativeOn:{click:function(t){return e.createID(t)}}},[e._v("创建试用ID")])],1),e._v(" "),a("el-table",{ref:"multipleTable",staticClass:"IDusedListData bg-shadow",attrs:{"header-row-class-name":"myTablee","header-cell-style":e.getRowClass,fit:!0,border:"",stripe:"",data:e.IDusedList,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{"row-class-name":"rdd",align:"center","header-align":"center",type:"index",width:"60",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"account",label:"代理名称",width:"120","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1))]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"deadline",label:"试用ID"},scopedSlots:e._u([{key:"default",fn:function(e){}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"num",label:"最近使用时间","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(e){}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"status",label:"账号状态"},scopedSlots:e._u([{key:"default",fn:function(e){}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"action",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("启动")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"}},[e._v("停止")])]}}])})],1),e._v(" "),a("el-pagination",{staticClass:"pages bg-shadow",attrs:{"page-size":e.pageSize,background:"","current-page":e.currentPage,layout:"total,prev, pager, next",total:e.totalPage},on:{"current-change":e.handleRunlist}}),e._v(" "),a("el-dialog",{attrs:{title:"创建试用ID","close-on-click-modal":!1,visible:e.IDusedVisible},on:{"update:visible":function(t){e.IDusedVisible=t}}},[a("div",{staticClass:"handleArea"},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.createIDusedForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"试用ID",prop:"id"}},[a("el-input",{attrs:{placeHoleder:"请输入ID"},model:{value:e.createIDusedForm.id,callback:function(t){e.$set(e.createIDusedForm,"id",t)},expression:"createIDusedForm.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"代理名称",prop:"name"}},[a("el-input",{attrs:{placeHoleder:"请输入代理名称"},model:{value:e.createIDusedForm.name,callback:function(t){e.$set(e.createIDusedForm,"name",t)},expression:"createIDusedForm.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("立即创建")]),e._v(" "),a("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)])],1)},staticRenderFns:[]};var r=a("VU/8")(n,l,!1,function(e){a("CuuP")},null,null);t.default=r.exports}});