const { merge } = require('webpack-merge')
const coreConfig = require('./webpack.core.js')
const path = require('path')
const ProjectStructure = require('./ProjectStructure')
const webpack = require('webpack')



const webpackModule =
  { rules:
      [ { test: /\.s?css$/i
        , use:
            [ 'style-loader'
            , { loader  : 'css-loader'
              , options : { sourceMap: true }
              }

            , { loader  : 'postcss-loader'
              , options : 
                  { sourceMap      : true
                  , postcssOptions :
                    { config: ProjectStructure.POST_CSS_CONFIG_PATH
                    }
                  }
              }
            ]
        }
      ]
  }



const devServer =
  { contentBase : ProjectStructure.BUILD_DIR
  , publicPath  : ProjectStructure.DEV_PUBLIC_PATH
  , openPage    :
      path.relative
        ('/'
        , path.join(ProjectStructure.DEV_PUBLIC_PATH, 'index.html')
        )
  , open        : true
  , hot         : true
  , port        : 8000
  }



const plugins = [ new webpack.HotModuleReplacementPlugin() ]



const devConfig =
  { devtool: 'inline-source-map'
  , module: webpackModule
  , devServer
  , plugins
  }



module.exports = merge(coreConfig, devConfig)
