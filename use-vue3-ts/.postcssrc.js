module.exports = {
    plugins: {
      autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
      "postcss-pxtorem": {
        rootValue: 37.5, // 根节点1rem对应px 公式：设计稿尺寸/block
      }
    }
  }