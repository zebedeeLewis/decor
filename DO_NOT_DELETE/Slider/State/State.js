
/**
 * Represents the states that the slider could exist in
 * at any given time.
 *
 * @readonly
 * @enum {string}
 *
 * @property {string} Initializing - in this state the slider should be
 *   setup with all the necessary information.
 *
 * @property {string} Waiting - in this state the slider shouldn't be
 *   doing anything significant. This represents the period when a
 *   single slide is being displayed.
 *
 * @property {string} Sliding - in this state the slider should be
 *   transitioning to another active slide. This represents the period
 *   of time when during which the slide animation shoud play.
 */
export const Model
  = Object.freeze
      ( { Initializing : 'Initializing'
        , Waiting      : 'Waiting'
        , Sliding      : 'Sliding'
        , Paused       : 'Paused'
        }
      )



