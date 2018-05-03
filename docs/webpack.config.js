const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    app: './src/index',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
  devServer: {
    hot: true,
    contentBase: __dirname,
  },
  devtool: process.env.NODE_ENV !== 'production' && 'source-map',
}
