const path = require('path')

module.exports = {
    pages: {
      index: {
          //入口文件
          entry: 'examples/main.js',
          template: 'public/index.js',
          filename: 'index.html'
      }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include.add(path.resolve(__dirname, 'packages')).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
    }
}