const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
const preprocess_handlebars = require('./lib/handlebars/preprocess.js')
const ProjectPath = require('./ProjectPath')



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
      = ProjectPath.DEFAULT_HTML_SHELL_PATH
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
  ( entryPointMetadata
  , entryName
  , absolutePathToEntryFile
  ) {
    const absolutePathToPageDir = path.dirname(absolutePathToEntryFile)


    const pathToPageShell
      = determine_path_to_page_shell(absolutePathToPageDir)
    const nameOfContentPartial
      = partial_name_from_path
          ( absolutePathToEntryFile
          , ProjectPath.PAGES_DIR
          )
    const title
      = ( entryPointMetadata 
            ? entryPointMetadata.title || 'NO TITLE'
            : 'NO TITLE'
        )

    const templatesNamespace = path.basename(ProjectPath.PAGES_DIR)


    const template
      = `${pathToPageShell}`
      + `?title=${title}`
      + `&templatesDir=${ProjectPath.PAGES_DIR}`
      + `&templatesNamespace=${templatesNamespace}`
      + `&nameOfContentPartial=${nameOfContentPartial}`


    return new HtmlWebpackPlugin(
      { template : template
      , filename : entryName + '.html'
      , favicon  : ProjectPath.FAVICON
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
            , templatesDirs :
                [ { dir       : ProjectPath.PAGES_DIR
                  , namespace : 'page'
                  }
                , { dir       : ProjectPath.PAGES_LIB_PARTIALS_DIR 
                  , namespace : 'page/partial'
                  }
                , { dir       : ProjectPath.COMPONENTS_DIR
                  , namespace : 'component'
                  }
                , { dir       : ProjectPath.COMPONENTS_LIB_PARTIALS_DIR
                  , namespace : 'component/partial'
                  }
                ]
            , handlersDirs  :
                [ ProjectPath.PAGES_LIB_HANDLERS_DIR
                ]
            }
          )
      )
    }



module.exports =
  { html_webpack_plugin_from_entry
  , preprocessor
  }

