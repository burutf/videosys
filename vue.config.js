const { defineConfig } = require("@vue/cli-service");
//gzip预压缩
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  ...defineConfig({
    transpileDependencies: true,
  }),
  devServer: {
    proxy: {
      //当请求前缀是这个时就代理请求
      "/api": {
        //请求的地址
        target: "http://yfengxing.cn:3030",
      },
    },
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: "[path][base].gz", // 压缩后的文件名
        algorithm: "gzip", // 压缩算法
        test: /\.(js|css|html|svg)$/, // 匹配的文件类型
        threshold: 10240, // 只有大小大于该值的文件会被压缩，单位为字节
        minRatio: 0.8, // 压缩比率小于这个值的文件才会被压缩
        deleteOriginalAssets: false,//是否删除源文件
      }),
    ],
  },
};
