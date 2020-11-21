const LoaderUtils = require('loader-utils')



module.exports =
  function
    ( input
    ){
      const utils = LoaderUtils
      debugger

      console.log('EXEC PHASE')
      console.log(input)

      return input
    }



module.exports.pitch =
  function
    ( input
    ){
      const utils = LoaderUtils
      debugger

      console.log('PITCH PHASE')
      console.log(input)
    }

