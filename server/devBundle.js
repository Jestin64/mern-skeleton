import config from "../config/config"
import webpack from "webpack"
import webpackConfig from "../webpack.config.client.js"
import webpackMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"


const compile = (app) => {
    if(config.env === 'development'){
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler, {publicPath: webpackConfig.output.publicPath}, {writeToDisk: true})
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}


export default {compile}