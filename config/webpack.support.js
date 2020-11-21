const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const get_directory_tree = require('directory-tree')
const preprocess_handlebars = require('./lib/handlebars/preprocess.js')
const ProjectStructure = require('./ProjectStructure')



function page_descriptor_to_entry
  ( initialEntries
  , pageDescriptor
  ) {
    const to_entry =
      ( entries
      , [ assetName, assetDesc ]
      ) => (
        { [assetName] : assetDesc.sourceFile
        , ... entries
        }
      )
    

    const inlineAssets = pageDescriptor.assets.inline

    const inlineEntries =
      Object.entries(inlineAssets).reduce( to_entry, {} )

    const externalAssets = pageDescriptor.assets.external

    const externalEntries =
      Object.entries(externalAssets).reduce( to_entry, {} )


    return (
      { ... initialEntries
      , ... externalEntries
      , ... inlineEntries
      }
    )
  }



function entries_from_page_descriptors
  ( pageDescriptors
  ) {
    return pageDescriptors.reduce(page_descriptor_to_entry, {})
  }



function html_webpack_plugins
  ( pageDescriptors
  ) {
    return (
      pageDescriptors.map
        ( ( { pageTitle
            , pageShell
            , pageSourceFile
            , assets
            }
          ) => {
            const partial = path.basename(pageSourceFile, '.html')


            const template
              = `${pageShell}`
              + `?handlersDir=${ProjectStructure.TEMPLATES_DIR}`
              + `&templatesDir=${ProjectStructure.TEMPLATES_DIR}`
              + `&title=${pageTitle}`
              + `&nameOfContentPartial=${partial}`


            return new HtmlWebpackPlugin(
              { title    : pageTitle
              , favicon  : ProjectStructure.PATH_TO_FAVICON
              , template : template
              , filename : path.basename(pageSourceFile)
              , chunks   :
                  [ ... Object.keys(assets.external)
                  , ... Object.keys(assets.inline)
                  ]
              , inject   : true
              , minify   : false
              }
            )
          }
        )
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
          , { content }
          )
      )
    }



module.exports =
  { html_webpack_plugins
  , entries_from_page_descriptors
  , preprocessor
  }

