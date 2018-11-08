'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
console.log('环境pro:',process.env.NODE_ENV_VARIES)
let MY_NODE_ENV,API_PREFIX = null
if(process.env.NODE_ENV_VARIES === 'dev'){
  MY_NODE_ENV = '"dev"'
  API_PREFIX = '"/v1"'
}else if(process.env.NODE_ENV_VARIES === 'test'){
  MY_NODE_ENV = '"test"'
  API_PREFIX = '"/v2"'
}else if(process.env.NODE_ENV_VARIES === 'production'){
  MY_NODE_ENV = '"production"'
  API_PREFIX = '"/v3"'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MY_NODE_ENV:MY_NODE_ENV,
  API_PREFIX:API_PREFIX
})

