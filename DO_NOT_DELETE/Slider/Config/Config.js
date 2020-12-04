export const INVALID_ERROR
  = 'Invalid configuration object provided for slider initialization'
const SLIDE_CLASSNAME = 'slider__slide'
const SLIDING_IN_CLASSNAME = 'slider__slide--sliding-in'
const SLIDING_OUT_CLASSNAME = 'slider__slide--sliding-out'
const NEXT_BUTTON_CLASSNAME = 'slider__next'
const PREV_BUTTON_CLASSNAME = 'slider__prev'



/**
 * Represents the possible slider autoplay states.
 *
 * @readonly
 * @enum {boolean}
 *
 * @property {boolean} On - autoplay tuned on
 * @property {boolean} Off - autoplay turned off
 */
export const Autoplay
  = Object.freeze
      ( { On  : true
        , Off : true
        }
      )



/**
 * Represents a configuration used to setup the Model.
 *
 * @typedef {Object} Model
 * @property {string} slideClassname - the classname used for individual
 *   slides.
 * @property {string} slidingInClassname - the classname applied to the
 *   slide that is sliding in.
 * @property {string} slidingOutClassname - the classname applied to the
 *   slide that is sliding out.
 * @property {Autoplay} autoplay - set the slider to autoplay
 * @property {string} prevBtnClassname - the classname for the button to
 *   switch to the previouse slide.
 * @property {string} nextBtnClassname - the classname for the button to
 *   switch to the next slide.
 */



/**
 * produce a new config Model
 *
 * @param {Partial<Model>} - user provided configuration object
 *
 * @return {Model}
 */
export function create
  ( { slideClassname
    , slidingInClassname
    , slidingOutClassname
    , autoplay
    , prevBtnClassname
    , nextBtnClassname
    }
  ) {
    return (
      { slideClassname      :  slideClassname
                            || SLIDE_CLASSNAME
      , slidingInClassname  :  slidingInClassname
                            || SLIDING_IN_CLASSNAME
      , slidingOutClassname :  slidingOutClassname
                            || SLIDING_OUT_CLASSNAME
      , autoplay            :  autoplay
                            || Autoplay.On
      , prevBtnClassname    :  prevBtnClassname
                            || PREV_BUTTON_CLASSNAME
      , nextBtnClassname    :  nextBtnClassname
                            || NEXT_BUTTON_CLASSNAME
      }
    )
  }



/**
 * produce true if the given value is a valid Config object.
 *
 * @param {any} possibleConfig
 * @return {boolean}
 *
 * @TODO!!!
 */
export function is_config
  ( possibleConfig
  ) {
    return true
  }



