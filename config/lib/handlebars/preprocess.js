const Handlebars = require('handlebars');
const get_directory_tree = require('directory-tree')
const path = require('path')
const LoaderUtils = require('loader-utils')



function register_as_handlebars_partial
  ( loaderContext
  , handlebars
  , templatesDir
  , absolutePath
  ) {
    const dirname =
      path.dirname(path.relative(templatesDir, absolutePath))
    const basename =
      path.basename
        ( path.relative(templatesDir, absolutePath)
        , '.handlebars.html'
        )


    const relativePath = path.join(dirname, basename)


    const partialAsString
      = loaderContext.fs.readFileSync(absolutePath, 'utf8')
    const partialName = relativePath.split(path.sep).join('/')


    handlebars.registerPartial({[partialName]: partialAsString})

    
    loaderContext.addDependency(absolutePath)
  }



function is_directory_node
  ( dirTree
  ) {
    return dirTree && dirTree.type === 'directory'
  }



function is_file_node
  ( dirTree
  ) {
    return dirTree && dirTree.type === 'file'
  }



function is_html_file_node
  ( dirTree
  ) {
    return is_file_node(dirTree) && dirTree.extension === '.html'
  }



function register_html_files_as_partials
  ( loaderContext
  , handlebars
  , templatesDir
  , dirTree
  ) {
    if( !is_directory_node(dirTree) && !is_html_file_node(dirTree) ) {
      return null
    }


    if( is_directory_node(dirTree) ) {
      return (
        dirTree.children.forEach
          ( childNode => (
              register_html_files_as_partials
                ( loaderContext
                , handlebars
                , templatesDir
                , childNode
                )
            )
          )
      )
    }


    return (
      register_as_handlebars_partial
        ( loaderContext
        , handlebars
        , templatesDir
        , dirTree.path
        )
    )
  }




function register_handlebars_partials_in_dir
  ( loaderContext
  , templatesDir
  , handlebars
  ) {
    const dirTree = get_directory_tree(templatesDir)


    return (
      register_html_files_as_partials
        ( loaderContext
        , handlebars
        , templatesDir
        , dirTree
        )
    )
  }



function preprocess_handlebars
  ( { content
    , context 
    , templatesDirs
    , handlersDirs
    }
  ) {
    const queryOptions = LoaderUtils.parseQuery(this.resourceQuery)


    const title
      =  queryOptions.title
      || (context && context.title ? context.title : 'No Title')

    const nameOfContentPartial
      =  queryOptions.nameOfContentPartial
      || ( context && context.nameOfContentPartial
             ? context.nameOfContentPartial
             : 'NoContent'
         )


    const appliedContext = {title, nameOfContentPartial}


    const appliedTemplatesDirs
      = new Set
          ( queryOptions.templatesDir
              ? [ ... templatesDirs || []
                , queryOptions.templatesDir
                ]
              : templatesDirs || []
          )


    const appliedHandlersDirs
      = new Set
          ( queryOptions.handlersDir
              ? [ ... handlersDirs || []
                , queryOptions.handlersDir
                ]
              : handlersDirs || []
          )
  

    try {
      appliedTemplatesDirs.forEach
        ( dir => (
            register_handlebars_partials_in_dir
              ( this
              , dir
              , Handlebars
              )
          )
        )
    } catch (e) {
      this.emitError(e)

      return content
    }


    let result
    try {
      result = Handlebars.compile(content)(appliedContext)
    } catch (e) {
      this.emitError(e)
  
      return content
    }
  

    return result
  }



module.exports = preprocess_handlebars
