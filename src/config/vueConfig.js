console.log('埋点测试：环境：',process.env.MY_NODE_ENV)
import Vue from 'vue'
if(process.env.MY_NODE_ENV == 'dev'){
    Vue.prototype.userType = 1
}else if (process.env.MY_NODE_ENV == 'test'){
    Vue.prototype.userType = 2
}else if (process.env.MY_NODE_ENV == 'production'){
    Vue.prototype.userType = 3
}