
const withPlugins = require('next-compose-plugins');
const css = require('@zeit/next-css');

const path = require("path")

// https://github.com/zeit/next-plugins/issues/392
function HACK_removeMinimizeOptionFromCssLoaders(config) {
    console.warn(
        'HACK: Removing `minimize` option from `css-loader` entries in Webpack config',
    );
    config.module.rules.forEach(rule => {
        if (Array.isArray(rule.use)) {
            rule.use.forEach(u => {
                if (u.loader === 'css-loader' && u.options) {
                    delete u.options.minimize;
                }
            });
        }
    });
}

const nextConfig = {
    target: 'serverless',
    distDir: "functions/build",
    // https://github.com/zeit/next.js/issues/7909
    publicRuntimeConfig: false,
    webpack(config, options) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '~': path.resolve(__dirname, "./src"),
        }
        config.module.rules.push({
            test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    publicPath: '/_next/static/',
                    outputPath: 'static/',
                    name: '[name].[ext]'
                }
            }
        })
        HACK_removeMinimizeOptionFromCssLoaders(config)
        return  config
    },
}



module.exports = withPlugins([
    [css],
], nextConfig)