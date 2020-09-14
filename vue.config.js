const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        // eslint-disable-next-line quote-props
        'Quill': 'quill/dist/quill.js'
      })
    ]
  }
}
