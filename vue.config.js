const { defineConfig } = require('@vue/cli-service')
module.exports = {
  ...defineConfig({
    transpileDependencies: true
  }),
  devServer: {
    proxy:{
      //当请求前缀是这个时就代理请求
      '/api':{
        //请求的地址
        target:'http://localhost:3030',
      }
    }
  },
}