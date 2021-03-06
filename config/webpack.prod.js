const { merge } = require('webpack-merge')
const ProjectPath = require('./ProjectPath')
const coreConfig = require('./webpack.core.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')



const webpackModule =
  { rules:
      [ { test: /\.s?css$/i
        , use:
            [ MiniCssExtractPlugin.loader
            , 'css-loader'
            , { loader  : 'postcss-loader'
              , options : 
                  { postcssOptions :
                    { config: ProjectPath.POST_CSS_CONFIG_PATH
                    }
                  }
              }
            , 'resolve-url-loader'
            , { loader  : 'sass-loader'
              , options :
                  { sourceMap : true
                  }
              }
            ]
        }
      ]
  }



const plugins =
  [ new MiniCssExtractPlugin
      ( { filename : path.join('css', '[name].css')
        }
      )
  ]



const prodConfig =
  { module: webpackModule
  , plugins
  }



module.exports = merge(coreConfig, prodConfig)
