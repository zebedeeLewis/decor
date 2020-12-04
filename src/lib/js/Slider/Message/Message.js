/**
 * Different types of messages that can update the Model.
 *
 * @readonly
 * @enum {string}
 *
 * @property {string} Start_Initialization - this message signals that
 *   initialization of the Model should begin. (Currently unsupported)
 *
 * @property {string} Initialization_Failed - this message signals that
 *   the Model initializatino has failed for one reason or another.
 *   (Currently unsupported)
 *
 * @property {string} Initialization_Complete - this message signals
 *   that the Model is done initializing. (Currently unsupported)
 *
 * @property {string} Start_sliding - this message signals that slider
 *   should start transitioning to another slide.
 *
 * @proerty {string} Sliding_Complete - this message signals that the
 *   slider is done transitioning to the new slide.
 *
 * @property {string} Autoplay_On - this message signals to turn on
 *   autoplay.
 *
 * @property {string} Autoplay_Off - this message signals to turn off
 *   autoplay.
 *
 */
export const Type
  = Object.freeze
      ( { Start_Initialization     : 'Start_Initialization'
        , Initialization_Failed    : 'Initialization_Failed'
        , Initialization_Complete  : 'Initialization_Complete'
        , Start_Sliding            : 'Start_Sliding'
        , Sliding_Complete         : 'Sliding_Complete'
        , Autoplay_On              : 'Autoplay_On'
        , Autoplay_Off             : 'Autoplay_Off'
        }
      )



/**
 * Represents a message describing how to to update a Model.
 *
 * @typedef {Object} Model
 *
 * @property {Message.Type} type - this messages' type.
 * @property {Object} args - an object containing all values needed to
 *   update the Model for this Message type.
 */



/**
 * Produce a new message of the given type.
 *
 * @param {Type} type - the type of message we want to create.
 *
 * @param {(Object|null)} args - if the given Message.Type requires any
 *   arguments, this should be an object containing all the arguments
 *   needed by the given Message.Type.
 *
 * @return {Model}
 */
export function create
  ( type
  , args
  ) {
    return {type, args}
  }
