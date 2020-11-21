const fs = require('fs')
const Handlebars = require('handlebars');
// const shell = require('./lib/handlebars/shell.js')
const get_directory_tree = require('directory-tree')
const path = require('path')



function register_as_handlebars_partial
  ( handlebars
  , templatesDir
  , absolutePath
  ) {
    const partialAsString = fs.readFileSync(absolutePath, 'utf8')

    const pathObject =
      path.parse(path.relative(templatesDir, absolutePath))

    const relativePath = path.join(pathObject.dir, pathObject.name)

    const partialName = relativePath.split(path.sep).join('/')

    handlebars.registerPartial({[partialName]: partialAsString})
  }



function recurs_and_register
  ( handlebars
  , templatesDir
  , dirTree
  ) {
    if( !dirTree ) { return null }

    if( dirTree.type === 'file' && dirTree.extension !== '.html' ) {
      return null
    }

    if( dirTree.type === 'directory' ) {
      return (
        dirTree.children.forEach
          ( child => recurs_and_register(handlebars, templatesDir, child)
          )
      )
    }


    return (
      register_as_handlebars_partial
        ( handlebars
        , templatesDir
        , dirTree.path
        )
    )
  }



function register_handlebars_partials_in_dir
  ( templatesDir
  , handlebars
  ) {
    const dirTree = get_directory_tree(templatesDir)

    return recurs_and_register(handlebars, templatesDir, dirTree)
  }



function preprocess_handlebars
  ( { templatesDir
    , title
    , contentPartial
    , pageShell
    }
  , loaderContext
  ) {
    let result;
    debugger
    const context = {title, contentPartial}
  
    try {
      const content =
        loaderContext.fs.readFileSync(pageShell, 'utf-8')

      // Handlebars.registerHelper('shell', shell)
      register_handlebars_partials_in_dir(templatesDir, Handlebars)

      result = Handlebars.compile(content)(context)
    } catch (error) {
      loaderContext.emitError(error)
  
      return {code : ''}
    }
  
    return { code: result }
  }



module.exports = preprocess_handlebars
