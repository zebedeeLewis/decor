const LoaderUtils = require('loader-utils')



module.exports =
  function
    ( content
    ) {
      // { title : string
      // , nameOfContentPartial: string
      // , templatesDir : string
      // , handlersDir : string
      // }
      let options
      debugger


      try {
        options = LoaderUtils.getOptions(this)
      } catch(e) {
        this.emitError(e)

        return content
      }


      const preloaderData = 
        { context      :
            { title                : options.title
            , nameOfContentPartial : options.nameOfContentPartial
            }
        , content      : content
        , templatesDir : options.templatesDir
        , handlersDir  : options.handlersDir || options.templatesDir
        }


      return preloaderData
    }
