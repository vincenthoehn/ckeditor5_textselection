const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { styles, builds } = require('@ckeditor/ckeditor5-dev-utils');
const TerserPlugin = require('terser-webpack-plugin');

function getDirectories(srcpath) {
  return fs
    .readdirSync(srcpath)
    .filter((item) => fs.statSync(path.join(srcpath, item)).isDirectory());
}

module.exports = [];
// Loop through every subdirectory in src, each a different plugin, and build
// each one in ./build.
getDirectories('./js/ckeditor5_plugins').forEach((dir) => {
  const bc = {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          test: /\.js(\?.*)?$/i,
          extractComments: false,
        }),
      ],
      moduleIds: 'named',
    },
    entry: {
      path: path.resolve(
        __dirname,
        'js/ckeditor5_plugins',
        dir,
        'src/index.js',
      ),
    },
    output: {
      path: path.resolve(__dirname, './js/build'),
      filename: `${dir}.js`,
      library: ['CKEditor5', dir],
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
    resolve: {
      alias: {
        core: path.join(__dirname, 'core'),
      },
    },
    // NEU: Ersetzt die alte DllReferencePlugin-Strategie. Seit der Umstellung
    // von Drupal Core auf UMD-Builds liefert das ckeditor5-npm-Paket keine
    // ckeditor5-dll.manifest.json mehr aus. Stattdessen werden alle
    // CKEditor5-Importe zur Laufzeit aus dem globalen `window.CKEDITOR`-Objekt
    // aufgelöst, das der von Drupal Core geladene ckeditor5.umd.js-Bundle
    // bereitstellt.
    externals: [
      function ({ request }, callback) {
        if (request === 'ckeditor5' || request.startsWith('ckeditor5/')) {
          return callback(null, 'CKEDITOR');
        }
        if (request.startsWith('@ckeditor/')) {
          return callback(null, 'CKEDITOR');
        }
        callback();
      },
    ],
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
    module: {
      rules: [{ test: /\.svg$/, use: 'raw-loader' }],
    },
  };

  module.exports.push(bc);
});