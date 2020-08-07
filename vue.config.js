// module.exports = {
// 	devServer: {
// 		// host: 'http://localhost',
// 		port: 8092,
// 		// hot: true,
// 		open: true,
// 		proxy: {
// 			'/api': {
// 				target: 'http://localhost:8092', // 你要请求的后端接口ip+port
// 				changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
// 				ws: true, // 开启webSocket
// 				pathRewrite: {
// 					'^/api': '' // 替换成target中的地址
// 				}
// 			},
// 			'/auto': {
// 				target: 'http://localhost:8091', // 你要请求的后端接口ip+port
// 				changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
// 				ws: true, // 开启webSocket
// 				pathRewrite: {
// 					'^/auto': '' // 替换成target中的地址
// 				}
// 			}
// 		}
// 	},
// 	pages: {
// 		business: {
// 			entry: 'src/main.js',
// 			template: 'src/index.html',
// 			filename: 'index.html'
// 		},
// 		login: {
// 			entry: 'src/views/login.js',
// 			template: 'src/views/login.html',
// 			filename: 'login.html'
// 		}
// 	}
// };
const path = require('path'),
	webpackConfig = require('./webpack.config.js'),
	outputDir = process.env.NODE_ENV == 'test' ? 'dist-test' : 'dist';

console.log('NODE_ENV: ' + process.env.NODE_ENV);

module.exports = {
	// 应用程序将部署的base URL
	publicPath: '/',
	// 编译打包后的输出目录
	outputDir: outputDir,
	// 编译打包后的静态资源目录
	assetsDir: 'assets',
	// 应用程序入口文件生成配置，支持多文件，至少包含应用入口
	//   pages: {
	//     index: {
	//       // 应用入口
	//       entry: "src/main.js",
	//       // 模板文件
	//       template: "public/index.html",
	//       // 应用程序入口
	//       filename: "index.html"
	//     }
	//   },
	pages: {
		business: {
			entry: 'src/main.js',
			template: 'src/index.html',
			filename: 'index.html'
		},
		login: {
			entry: 'src/views/login.js',
			template: 'src/views/login.html',
			filename: 'login.html'
		}
	},
	// souce map
	productionSourceMap: process.env.NODE_ENV !== 'production',
	// 开启eslint
	lintOnSave: process.env.NODE_ENV === 'development',
	// merge webpack config
	// css: {
	// 	loaderOptions: {
	// 		// 给 sass-loader 传递选项
	// 		// sass: {
	// 		//   // @/ 是 src/ 的别名
	// 		//   // 所以这里假设你有 `src/variables.sass` 这个文件
	// 		//   data: `@import "~@/scss/_variables.sass"`
	// 		// },
	// 		// 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
	// 		// 因为 `scss` 语法在内部也是由 sass-loader 处理的
	// 		// 但是在配置 `data` 选项的时候
	// 		// `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
	// 		// 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
	// 		scss: {
	// 			data: `@import "~@/scss/_variables.scss";`
	// 		}
	// 	}
	// },
	chainWebpack: config => {
		config.output.filename('[name].[hash].js').end();
	},
	configureWebpack: {
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.json', '.vue', '.scss', '.css'],
			alias: {
				vue$: 'vue/dist/vue.esm.js',
				'@': path.join(__dirname, 'src'),
				'@assets': path.join(__dirname, 'src/assets')
			}
		},
		plugins: [...webpackConfig.plugins]
	},
	// 本地服务
	devServer: {
		disableHostCheck: true,
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		host: 'dev.mob.com',
		port: 8093,
		hot: true,
		open: true
	}
};
