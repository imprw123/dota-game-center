const webpack = require('webpack')
module.exports = {
    configureWebpack: {

        plugins: [

            new webpack.ProvidePlugin({

                $: "jquery",

                jQuery: "jquery",

                "windows.jQuery": "jquery"

            })

        ]

    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "商城"
                return args
            })
    },
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,

        /* 使用代理解决跨域问题（跨域的常用方式：1、在前端解决跨域问题 2、后端直接设置访问控制允许源Access-Control-Allow-Origin：* 代表允许全部域名跨域，也可单独设置指定域名跨域 3、后端配置Nginx反向代理） */
        proxy: {
            /* 详解：
              1、proxy 里面的'/api'什么意思？
              答：作用是是告诉node, 我的接口要是以'/api'开头的才用代理.例如：App.vue中的请求接口地址 "/api/user" 符合以/api开口的条件,所以会被代理, 最后代理的路径 由http://localhost:8081/api/user ==》变成 http://10.10.38.94:3000/api/user
                虽然浏览器的Network的Headers/General URL还是http://localhost:8081/api/user，但实际上在请求后，被node代理服务器悄悄代理成了http://10.10.38.94:3000/api/user再去请求真实后代接口地址
              2、pathRewrite里面的‘^/api’:'' 什么意思？
              答：由上面可知，代理成了http://10.10.38.94:3000/api/user，但是我们实际的真实后台接口地址是http://10.10.38.94:3000/user，所以在请求前一刻，需要将/api去除（把/api给重写成空字符串了）。
              '^/api'是一个正则表达式，表示要匹配请求的url中，全部http://localhost:8081/api/user 转接为 http://10.10.38.94:3000/user
            */
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://test.shop.5211game.com/',
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
    },
}