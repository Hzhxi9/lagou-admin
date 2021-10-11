const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  /**配置环境 */
  mode: 'development',
  /**配置入口 */
  entry: {
    app: './src/index.js',
  },
  /**配置出口 */
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
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
  },
  /**配置插件 */
  plugins: [
    new HtmlWebpackPlugin({
      title: '拉钩网',
      filename: 'index.html',
      template: path.join(__dirname, './public/index.html'),
      inject: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from:  path.join(__dirname, './public/*.ico'),
          to: '',
        },
      ],
    }),
  ],
};