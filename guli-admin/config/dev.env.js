'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //接口地址的修改
  BASE_API: '"http://localhost:8222"',
})
