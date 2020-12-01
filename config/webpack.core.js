const path = require('path')
const ProjectStructure = require('./ProjectStructure')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ConfigSupport = require('./webpack.support.js')


const mode = process.env.NODE_ENV



const entry
  = { index : ProjectStructure.HOMEPAGE_JS_PATH
    }



const output
  = { filename   : path.join('js', '[name].js')
    , path       : ProjectStructure.DIST_DIR
    , publicPath :
        ( process.env.NODE_ENV === 'development' 
            ? ProjectStructure.DEV_PUBLIC_PATH
            : ProjectStructure.PROD_PUBLIC_PATH
        )
    , environment:
        { arrowFunction : false
        , bigIntLiteral : false
        , const         : false
        , destructuring : false
        , dynamicImport : false
        , forOf         : false
        , module        : false
        }
    }



const webpackModule
  = { rules:
        [ { test : /\.handlebars\.html$/i
          , use  :
              [ { loader: 'html-loader'
                , options: { preprocessor: ConfigSupport.preprocessor }
                }
              ]
          }

        , { test      : /\.m?js$/i
          , exclude   : /(node_modules|bower_components)/
          , use       :
              { loader  : 'babel-loader'
              , options :
                  { exclude: 
                      [ /node_modules[\\\/]core-js/
                      , /node_modules[\\\/]webpack[\\\/]buildin/
                      ]
                  }
              }
          }

        , { test: /\.(png|svg|jpg|jpeg|gif)$/i
          , type: 'asset/resource'
          , generator :
              { filename: path.join
                            ( 'images'
                            , '[name]-[contenthash][ext]'
                            )
              }
          }


      , { test: /\.(woff|woff2|eot|ttf|otf)$/i
        , type: 'asset/resource'
        , generator :
            { filename: path.join('fonts', '[name][ext]')
            }
        }
      ]
  }



const plugins
  = [ new CleanWebpackPlugin()
    , ... Object.entries(entry).map
            ( ConfigSupport.html_webpack_plugin_from_entry
            )
    ]



const resolve
  = { extensions : ['.js', '.mjs', '.css', 'scss']
    }



module.exports
  = { mode
    , entry
    , output
    , module : webpackModule
    , plugins
    , resolve
    }
