const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ConfigSupport = require('./webpack.support.js')
const ProjectPath = require('./ProjectPath')


const mode = process.env.NODE_ENV



const entry
  = { index : ProjectPath.PAGE_HOME_JS_PATH
    }



const entriesMetadata
  = { index :
        { title : 'Home'
        }
    }



const output
  = { filename   : path.join('js', '[name].js')
    , path       : ProjectPath.DIST_DIR
    , publicPath :
        ( process.env.NODE_ENV === 'development' 
            ? ProjectPath.DEV_PUBLIC_PATH
            : ProjectPath.PROD_PUBLIC_PATH
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
            ( ([entryName, entryPath]) => {
                return (
                  ConfigSupport.html_webpack_plugin_from_entry
                    ( entriesMetadata[entryName]
                    , entryName
                    , entryPath
                    )
                )
              }
            )
    ]



const resolve
  = { extensions : ['.js', '.mjs', '.css', 'scss']
    , alias      :
        { component : ProjectPath.COMPONENTS_DIR
        , lib       : ProjectPath.LIB_DIR
        , pages     : ProjectPath.PAGES_DIR
        }
    }



module.exports
  = { mode
    , entry
    , output
    , module : webpackModule
    , plugins
    , resolve
    }
