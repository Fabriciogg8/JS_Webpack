const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin'); 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TercerPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : '[name][contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve : {
        extensions : ['.js'],
        alias : {
          '@utils' : path.resolve(__dirname, 'src/utils/'),
          '@templates' : path.resolve(__dirname, 'src/templates/'),
          '@styles' : path.resolve(__dirname, 'src/styles/'),
          '@images' : path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/,
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader"
            },
          },
          {
            test:  /\.(css|styl)$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "stylus-loader"
            ]
          },
          {
            test: /\.png/,
            type: "asset/resource"
          },
          {
            test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
            use: {
                loader: 'url-loader', // NOMBRE DEL LOADER
                options: {
                    limit: 10000, // false O LE PASAMOS UN NUMERO
                    // Habilita o deshabilita la transformación de archivos en base64.
                    mimetype: 'application/font-woff',
                    // Especifica el tipo MIME con el que se alineará el archivo. 
                    // Los MIME Types (Multipurpose Internet Mail Extensions)
                    // son la manera standard de mandar contenido a través de la red.
                    name: "[name].[contenthash].[ext]",
                    // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
                    // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                    // ubuntu-regularhola.woff
                    outputPath: './assets/fonts/', 
                    // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                    publicPath: '../assets/fonts/',
                    // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                    esModule: false,
                  }
                }
          },
        ]
      },
    plugins: [
      new HtmlWebpackPlugin({
        inject : true,
        template : './public/index.html',
        filename : './index.html'
      }),
      new MiniCssExtractPlugin({
        filename : 'assets/[name].[contenthash].css'
      }),
      new CopyPlugin({
        patterns : [
          {
            from : path.resolve(__dirname, 'src', 'assets/images'),
            to : 'assets/images'
          }
        ]
      }),
      new Dotenv(),
      new CleanWebpackPlugin(),
    ],
    optimization : {
      minimize : true,
      minimizer : [
        new CssMinimizerPlugin(),
        new TercerPlugin(), 
      ]
    }
}



