var webpack = require('webpack');

module.exports = {
  // This is the entry point or start of our react applicaton
  entry: "./app/app.js",

  // The plain compiled Javascript will be output into this file
  output: {
    filename: "public/bundle.js"
  },

  // This section desribes the transformations we will perform
  module: {
    loaders: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        include: /app/,
        loader: "babel",
        query: {
          // These are the specific transformations we'll be using.
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
     new webpack.optimize.DedupePlugin(),
     new webpack.optimize.UglifyJsPlugin({
       mangle: true,
       compress: {
         warnings: false, // Suppress uglification warnings
         pure_getters: true,
         unsafe: true,
         unsafe_comps: true,
         screw_ie8: true
       },
       output: {
         comments: false,
       },
       exclude: [/\.min\.js$/gi] // skip pre-minified libs
     }),
   new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
   new webpack.NoErrorsPlugin()
  ],
  // This lets us debug our react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "cheap-module-source-map"
  //devtool: "eval-source-map"
};
