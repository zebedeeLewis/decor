import * as Config from '../Config'
import * as Message from '../Message'



const ERROR_WINDOW_OBJECT_NEEDED = 'Please provide a Window Object'
const ERROR_SLIDER_ELEMENT_ID
  = 'No element exists with the given slider Id'



/**
 * Represents the state of the Slider and holds information about
 * the sliders DOM representation.
 *
 * @typedef {Object} Model
 * @property {State.Model} state - represents the sliders current state.
 * @property {Window} window - the browser window object.
 * @property {HTMLElement} element - DOM representaion of the Model
 * @property {Config.Model} config - the configuration for this Model.
 * @property {string} sliderId - the id for the DOM representation.
 * @property {number} activeSlideIndex - the slide that is currently
 *   being displayed.
 * @property {Array<Slide.Model>} slides - 
 */



/**
 * produce a new slider Model
 *
 * @param {Partial<Model>} window
 *
 * @return {Model}
 */
export function create
  ( { state
    , window
    , sliderElement
    , sliderId
    , activeSlide
    , config
    }
  ) {
    return (
      { state         : state || State.Model.Waiting
      , window        : window || null
      , sliderElement : sliderElement || null
      , sliderId      : sliderId || ''
      , config        : config || null
      }
    )
  }



/**
 * Produce the initial Model representation of slider.
 *
 * @param {Window} window - The browser Window object
 * @param {string} sliderId - The id for the sliders DOM representation
 * @param {Config.Model} config - user provided configuration object.
 *
 * @return {(Model|Error)}
 *
 * @throw {Error}
 */
export function init
  ( window
  , sliderId
  , config
  ) {
    if( window instanceof Window ) {
      return new Error(ERROR_WINDOW_OBJECT_NEEDED)
    }


    const document = window.document
    const sliderElement = document.getElementById(sliderId)


    if( !sliderElement ) {
      return new Error(ERROR_SLIDER_ELEMENT_ID)
    }


    if( !Config.is_config(config) ){
      return new Error(Config.INVALID_ERROR)
    }


    const appliedConfig = Config.create(config)


    const model 
      = create( {sliderElement, appliedConfig} )

    
    return (
      update
        ( Message.create(Message.Type.Initialization_Complete)
        , model
        )
    )
  }



/**
 * Set the slider state to indicate sliding
 *
 * @param {Model} sliderModel
 * @return {Model}
 */
function handle_start_sliding_message
  ( sliderModel
  ) {
    sliderModel.state = State.Model.Sliding
    return sliderModel
  }



/**
 * Set the slider state to waiting
 *
 * @param {Model} sliderModel
 * @return {Model}
 */
function handle_sliding_complete_message
  ( sliderModel
  ) {
    sliderModel.state = State.Model.Waiting
    return sliderModel
  }



/**
 * turn on autoplay
 *
 * @param {Model} sliderModel
 * @return {Model}
 */
function handle_autoplay_on_message
  ( sliderModel
  ) {
    sliderModel.config.autoplay = Config.Autoplay.On
    return sliderModel
  }



/**
 * turn off autoplay
 *
 * @param {Model} sliderModel
 * @return {Model}
 */
function handle_autoplay_off_message
  ( sliderModel
  ) {
    sliderModel.config.autoplay = Config.Autoplay.Off
    return sliderModel
  }



/**
 * set state to waiting
 *
 * @param {Model} sliderModel
 * @return {Model}
 */
function handle_initialization_complete_message
  ( sliderModel
  ) {
    sliderModel.state = State.Model.Waiting
    return sliderModel
  }



/**
 * set state to waiting
 *
 * @param {Error} sliderModel
 *
 * @throw {Error<any>}
 */
function handle_initialization_failed_message
  ( error
  ) {
    throw error
  }



/**
 * update the given Model according to the given action.
 *
 * @param {Message.Model} message - describes how to update the Model.
 * @param {(Model|Error)} sliderModel - the current state of the Model.
 *
 * @return {(Model|Error)}
 */
export function update
  ( message
  , modelOrError
  ) {
    switch( message.type ){
      case Message.Type.Initialization_Complete:
        return handle_initialization_complete_message(modelOrError)
        break

      case Message.Type.Initialization_Failed:
        return handle_initialization_failed_message(modelOrError)
        break

      case Message.Type.Start_Sliding:
        return handle_start_sliding_message(modelOrError)
        break

      case Message.Type.Sliding_Complete:
        return handle_sliding_complete_message(modelOrError)
        break

      case Message.Type.Autoplay_On:
        return handle_autoplay_on_message(modelOrError)
        break

      case Message.Type.Autoplay_Off:
        return handle_autoplay_off_message(modelOrError)
        break

      default:
        return modelOrError
    }
  }



/**
 * Sync the DOM element of the given Slider Model with it's
 * Model representation.
 *
 * @param {Model} sliderModel - the Model to be rendered
 *
 * @return {Model}
 * 
 * @TODO!!!
 */
export function sync_dom_representation
  ( sliderModel
  ) {
    switch( sliderModel.state ){
      case State.Model.Waiting:
        return sliderMOdel
        break;

      case State.Model.Sliding:
        return sliderModel
        break;

      case State.Model.Paused:
        return sliderModel
        break;
    }

    return sliderModel
  }
