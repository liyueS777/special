webpackJsonp([3],{"63Tu":function(e,r){},xBd8:function(e,r,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=l("2hMI"),t={components:{uploadFile:function(e){l.e(10).then(function(){var r=[l("hYS1")];e.apply(null,r)}.bind(this)).catch(l.oe)}},data:function(){var e=/^[0-9]*[1-9][0-9]*$/;return{dialogVisible:!1,fileList:[],levelList:[{label:"普通级别",id:1},{label:"一般级别",id:2}],appTypes:[{label:"IOS",id:1},{label:"Android",id:2}],fileForm:{versionName:"",versionNumber:"",desc:"",url:"",packageName:""},rules:{versionName:[{required:!0,message:"请输入版本名称",trigger:"blur"}],versionNumber:[{required:!0,validator:function(r,l,i){l&&l.trim()?e.test(l)?l.indexOf(".")>-1?i(new Error("版本号必须是正整数,不能有小数点")):i():i(new Error("版本号必须是正整数,请输入正确的版本号格式")):i(new Error("版本号不能为空"))},trigger:"blur"}],url:[{required:!0,validator:function(e,r,l){r&&r.trim()?l():l(new Error("上传的文件不能为空"))},trigger:"blur"}],packageName:[{required:!0,message:"请先填写文件包名称",trigger:"blur"}]}}},created:function(){},methods:{close:function(){this.$router.push("/")},handleUploadSuccess:function(e){this.fileForm.url=e.data.url,this.fileList[0]={name:e.data.name,url:e.data.url}},handleUploadRemove:function(e){this.fileForm.url="",this.fileList=[]},submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return r.$message.warning("请先填写完参数~"),!1;Object(i.m)(r.fileForm).then(function(e){1==e.code?(r.$message.success("数据提交成功~~"),r.dialogVisible=!0):r.$message.warning("数据提交异常，请稍后再试~~")}).catch(function(e){r.$message.warning("数据提交异常，请稍后再试~~")})})},resetForm:function(e){this.$refs[e].resetFields()}}},o={render:function(){var e=this,r=e.$createElement,l=e._self._c||r;return l("div",{staticClass:"fileUpload-m"},[l("div",{staticClass:"line-l bg-shadow"},[l("el-form",{ref:"fileForm",staticClass:"file-ruleForm",attrs:{model:e.fileForm,rules:e.rules,"label-width":"100px"}},[l("el-form-item",{attrs:{label:"版本名称",prop:"versionName"}},[l("el-input",{attrs:{placeholder:"请填写版本名称"},model:{value:e.fileForm.versionName,callback:function(r){e.$set(e.fileForm,"versionName",r)},expression:"fileForm.versionName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"版本号",prop:"versionNumber"}},[l("el-input",{attrs:{placeholder:"请填写版本号"},model:{value:e.fileForm.versionNumber,callback:function(r){e.$set(e.fileForm,"versionNumber",r)},expression:"fileForm.versionNumber"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"版本描述",prop:"desc"}},[l("el-input",{attrs:{placeholder:"请填写版本描述"},model:{value:e.fileForm.desc,callback:function(r){e.$set(e.fileForm,"desc",r)},expression:"fileForm.desc"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"文件",prop:"url"}},[l("upload-file",{attrs:{fileList:e.fileList},on:{uploadSuccess:e.handleUploadSuccess,uploadRemove:e.handleUploadRemove}})],1),e._v(" "),l("el-form-item",{attrs:{label:"文件包名称",prop:"packageName"}},[l("el-input",{attrs:{placeholder:"请填写文件包名称"},model:{value:e.fileForm.packageName,callback:function(r){e.$set(e.fileForm,"packageName",r)},expression:"fileForm.packageName"}})],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(r){e.submitForm("fileForm")}}},[e._v("立即提交")]),e._v(" "),l("el-button",{attrs:{size:"small"},nativeOn:{click:function(r){e.resetForm("fileForm")}}},[e._v("重置")])],1)],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"提交后-信息展示",visible:e.dialogVisible,"close-on-click-modal":!1,"show-close":!1,width:"40%"},on:{"update:visible":function(r){e.dialogVisible=r},close:e.close}},[l("span",[e._v("版本名称： "+e._s(e.fileForm.versionName))]),l("br"),e._v(" "),l("span",[e._v("版本号：   "+e._s(e.fileForm.versionNumber))]),l("br"),e._v(" "),e.fileForm.desc.trim()?l("span",[e._v("版本描述： "+e._s(e.fileForm.desc))]):e._e(),l("br"),e._v(" "),l("span",[e._v("文件路径： "+e._s(e.fileForm.url))]),l("br"),e._v(" "),l("span",[e._v("文件包名称: "+e._s(e.fileForm.packageName))]),l("br"),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:function(r){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var a=l("VU/8")(t,o,!1,function(e){l("63Tu")},null,null);r.default=a.exports}});