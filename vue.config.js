const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin');
const { name } = require('./package');
module.exports = defineConfig({
  transpileDependencies: true,
	publicPath: './',
  configureWebpack: {
    entry: './src/main.js',
    output: {
      library: `${name}-[name]`,
			libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`
    },
    resolve: {
      alias: {},
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html)$/, // 匹配文件名
          threshold: 1024, // 小于10KB就不进行压缩
          minRatio: 0.8, // 压缩比率
          deleteOriginalAssets: false // 不删除源文件
        })
      )
    }
    config.plugin('html').tap(args => {
      args[0].scriptLoading = 'blocking'
      // or
      // args[0].inject = 'body'
      return args
    })
  },
  css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "@/assets/css/var.scss";`
			}
		}
	},
	devServer: {
		port: 2030,
		open: true,
		hot: true,
		headers: {
      "Access-Control-Allow-Origin": "*"
    },
		client: {
      overlay: false // 编译错误时，取消全屏覆盖（建议关掉）
		},
		proxy: {
			'/apitest': {
				target: 'http://10.205.241.37:8088',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/apitest': ''
				}
			},
      '/dinky': {
        target: 'http://data.haier.net',
        changeOrigin: true,
        pathRewrite: {
          '^/dinky': '/dinky',
        },
      },
		}
	}
})
