const CracoLessPlugin = require('craco-less')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'scss-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@font-family':
                '"Noto Sans TC",apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,"Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol","Noto Color Emoji"',
              '@primary-color': 'rgba(28, 191, 185, 1)',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
