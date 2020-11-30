const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
const preprocess_handlebars = require('./lib/handlebars/preprocess.js')
const ProjectStructure = require('./ProjectStructure')



function file_exists
  ( absolutePathToFile
  ) {
    try {
      fs.accessSync(absolutePathToFile)
    } catch(e) {
      return false
    }

    return true
  }



function determine_path_to_page_shell
  ( absolutePathToPageDir
  ) {
    const pathToDefaultPageShell
      = ProjectStructure.DEFAULT_HTML_SHELL_PATH
    const pathToPageShell
      = path.join(absolutePathToPageDir, 'shell.handlebars.html')


    if( file_exists(pathToPageShell) ) {
      return pathToPageShell

    } else if( file_exists(pathToDefaultPageShell) ) {
      return pathToDefaultPageShell

    } else {
      return ''
    }
  }



function partial_name_from_path
  ( absolutePathToFile
  , templatesDir
  ) {
    const dirname
      = path.dirname(path.relative(templatesDir, absolutePathToFile))
    const basename
      = path.basename
          ( path.relative(templatesDir, absolutePathToFile)
          , '.js'
          )
    const relativePath = path.join(dirname, basename)
    const partialName = relativePath.split(path.sep).join('/')


    return partialName
  }



function html_webpack_plugin_from_entry
  ( [ entryName
    , absolutePathToEntryFile
    ]
  ) {
    const absolutePathToPageDir = path.dirname(absolutePathToEntryFile)


    const pathToPageShell
      = determine_path_to_page_shell(absolutePathToPageDir)
    const nameOfContentPartial
      = partial_name_from_path
          ( absolutePathToEntryFile
          , ProjectStructure.PAGES_DIR
          )


    const template
      = `${pathToPageShell}`
      + `?title=TEST_TITLE`
      + `&templatesDir=${ProjectStructure.PAGES_DIR}`
      + `&nameOfContentPartial=${nameOfContentPartial}`


    return new HtmlWebpackPlugin(
      { template : template
      , filename : entryName + '.html'
      }
    )
  }
  



const preprocessor =
  function
    ( content
    , loaderContext
    ) {
      return (
        preprocess_handlebars.call
          ( loaderContext
          , { content
            , templatesDirs : [ ProjectStructure.TEMPLATES_LIB_DIR ]
            , handlersDirs  : [ ProjectStructure.HANDLERS_LIB_DIR ]
            }
          )
      )
    }



module.exports =
  { html_webpack_plugin_from_entry
  , preprocessor
  }

