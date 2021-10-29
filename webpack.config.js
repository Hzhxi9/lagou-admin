const path = require('path');
const chalk = require('chalk');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
  return path.resolve(dir);
}

module.exports = {
  /**配置环境 */
  mode: 'development',

  devtool: 'source-map',

  /**配置入口 */
  entry: {
    'js/app': './src/index.js',
  },
  /**配置出口 */
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]-[hash:6].js',
    clean: true,
  },

  /**resolve 优化配置 */
  resolve: {
    /**配置别名 */
    alias: {
      '@': resolve('src'),
      component: resolve('src/components'),
      controller: resolve('src/controllers'),
      routes: resolve('src/routes'),
    },
    /**优先 src 目录下查找需要解析的文件，会大大节省查找时间 */
    modules: [resolve('src'), 'node_modules'],
  },

  /**配置 cache 缓存生成的 webpack 模块和 chunk，来改善构建速度。 */
  cache: {
    type: 'filesystem',
  },

  /**配置压缩js、css */
  optimization: {
    minimize: true,
    minimizer: [/*压缩CSS**/ new OptimizeCssAssetsPlugin({}), /*压缩js **/ new TerserPlugin({})],
  },

  /**配置热更新 */
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  /**配置加载器 */
  module: {
    rules: [
      {
        test: /\.art/,
        loader: 'art-template-loader',
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'cache-loader', 'css-loader'],
      },
      {
        test: /\.js$/i,
        include: [resolve('src')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              /**开启缓存 */
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },

  /**配置插件 */
  plugins: [
    /**译进度条, 包含内容、进度条、进度百分比、消耗时间 */
    new ProgressBarPlugin({
      format: `:msg [:bar] ${chalk.green.bold(':percent')}(:elapsed s)`,
    }),
    /**编译html文件, 自动的引入了打包好的 bundle.js */
    new HtmlWebpackPlugin({
      title: '拉钩网',
      filename: 'index.html',
      template: path.join(__dirname, './public/index.html'),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, './public/*.ico'),
          to: '',
        },
        {
          from: path.join(__dirname, './public/libs'),
          to: './libs',
        },
      ],
    }),
    /**构建结果分析 */
    // new BundleAnalyzerPlugin(),
  ],
};
