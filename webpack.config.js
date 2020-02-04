import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = options => ({
  ...options,
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
})
