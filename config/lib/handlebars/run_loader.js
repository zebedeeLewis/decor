const fs = require('fs')
const path = require('path')
const { runLoaders } = require('loader-runner')



runLoaders
  ( { resource : './test.txt?ZebsVar="hello zeb"'
    , loaders : 
        [ path.resolve(__dirname, './inspect_loader.js')

        , { loader : path.resolve(__dirname, './set_context.js')
          , options :
              { context :
                  { title: 'testName'
                  , nameOfContentPartial : 'testPartial'
                  }
              , templatesDir : 'template/dir'
              , handlersDir  : 'handlers/dir'
              }
          }

        , path.resolve(__dirname, './inspect_loader.js')
        ]
    , readResource : fs.readFile.bind(fs)
    , context :
        { emitFile : () => {}
        }
    }
  , (err, result) => err ? console.error(err) : console.log(result)
  )
