const CLOSE_SELECTOR = '.navbar-close'
const HAMBURGER_SELECTOR = '.navbar-open'



/**
 * Represents the classes that are applied to the Navbar DOMElement
 * for each possible ToggleState.
 *
 * @readonly
 */
const ToggledClass
  = Object.freeze
      ( { On  : 'navbar--toggled'
        , Off : 'navbar'
        }
      )



/**
 * Represents the classes that are applied to the Navbar scrim
 * DOMElement for each possible ToggleState.
 *
 * @readonly
 */
const ToggledScrimClass
  = Object.freeze
      ( { On  : 'scrim--active'
        , Off : 'scrim'
        }
      )



/**
 * Represents the possible toggle state of a single
 * Navbar.
 *
 * @readonly
 * @enum {boolean}
 * @property On  - the Navbar is toggled
 * @property Off - the Navbar is not toggled
 */
const ToggledState
  = Object.freeze
      ( { On  : true
        , Off : false
        }
      )



/**
 * Represents the state of the navbar.
 *
 * @typedef {Object} Model
 * @property {HTMLElement} element - the DOM element this model
 *   represents.
 *
 * @property {ToggledState} toggled  - true if the Navbar is toggled
 */



/**
 * Produce a new Navbar model.
 *
 * @param {HTMLElement} element
 * @return {Model}
 */
export function create
  ( element
  ) {
    return (
      { element : element
      , toggled : ToggledState.Off
      }
    )
  }



/**
 * set the toggled property of the Navbar to TOGGLED_On
 * 
 * @param {Model} navbar
 * @return {Model}
 */
export function toggle_on
  ( navbar
  ) {
    navbar.toggled = ToggledState.On

    return navbar
  }



/**
 * set the toggled property of the Navbar to TOGGLED_Off
 * 
 * @param {Model} navbar
 * @return {Model}
 */
export function toggle_off
  ( navbar
  ) {
    navbar.toggled = ToggledState.Off

    return navbar
  }



/**
 * Display the nav items in the Navbar Dom and hide
 * the hamburger.
 *
 * @param {HTMLElement} navbarElement
 *
 * @return {HtmlElement}
 */
function display_nav_items
  ( navbarElement
  ) {
    navbarElement.classList.add( ToggledClass.On )
    navbarElement.classList.remove( ToggledClass.Off )

    return navbarElement
  }



/**
 * Display the hamburger and hide the nav items in the Navbar Dom
 *
 * @param {HTMLElement} navbarElement
 *
 * @return {HTMLElement}
 */
function display_navbar_hamburger
  ( navbarElement
  ) {
    navbarElement.classList.add( ToggledClass.Off )
    navbarElement.classList.remove( ToggledClass.On )

    return navbarElement
  }




/**
 * display navbar scrim (i.e. the translucent background shown when
 * the navbar is toggled).
 *
 * @param {HTMLElement} scrimElement
 *
 * @return {HTMLElement}
 */
function show_scrim
  ( scrimElement
  ) {
    scrimElement.classList.add( ToggledScrimClass.On )
    scrimElement.classList.remove( ToggledScrimClass.Off )

    return scrimElement
  }



/**
 * hide navbar scrim (i.e. the translucent background shown when
 * the navbar is toggled).
 *
 * @param {HTMLElement} scrimElement
 *
 * @return {HTMLElement}
 */
function hide_scrim
  ( scrimElement
  ) {
    scrimElement.classList.add( ToggledScrimClass.Off )
    scrimElement.classList.remove( ToggledScrimClass.On )

    return scrimElement
  }



/**
 * Sync the DOM element of the given Navbar Model with it's
 * Model representation.
 *
 * @param {HTMLElement} window
 * @param {Model} navbarModel
 *
 * @return {Model}
 */
export function sync_dom_representation
  ( window
  , navbarModel
  ) {
    const document = window.document


    const navbarElement = navbarModel.element
    const scrimElement
      =  document.querySelector('.' + ToggledScrimClass.Off)
      || document.querySelector('.' + ToggledScrimClass.On)


    switch (navbarModel.toggled) {
      case ToggledState.On:
        display_nav_items(navbarElement)
        if( scrimElement ) { show_scrim(scrimElement) }
        break

      case ToggledState.Off:
        display_navbar_hamburger(navbarElement)
        if( scrimElement ) { hide_scrim(scrimElement) }
        break
    }

    return navbarModel
  }



/**
 * Setup handlers for the events that will toggle the Navbar
 *
 * @param {Window} window
 * @param {Model} navbarModel
 *
 * @return {Model}
 */
export function setup_handlers
  ( window
  , navbarModel
  ) {
    const navbarElement = navbarModel.element


    const hamburgerElement
      = navbarElement.querySelector(HAMBURGER_SELECTOR)

    hamburgerElement.addEventListener
      ( 'click'
      , () => {
          navbarModel.toggled = ToggledState.On
          sync_dom_representation(window, navbarModel)
        }
      )


    const navbarCloseElement
      = navbarElement.querySelector(CLOSE_SELECTOR)

    navbarCloseElement.addEventListener
      ( 'click'
      , () => {
          navbarModel.toggled = ToggledState.Off
          sync_dom_representation(window, navbarModel)
        }
      )


    return navbarModel
  }



/**
 * Initialize the navbar functionality
 *
 * @property {Window} window - the browser window object
 * @property {string) navbarSelector - the selector for the DOM
 *   element we want to initialize.
 * @return {Model}
 *
 * @throws {Error}
 *    Selected element "${navbarSelector}" does not exist
 *   
 */
export function init
  ( window
  , navbarSelector
  ) {
    const document = window.document
    const navbarElement = document.querySelector(navbarSelector)


    if( !navbarElement ) {
      throw Error
        ( `Selected element "${navbarSelector}" does not exist`
        )
    }


    const navbarModel = create(navbarElement)

    sync_dom_representation(window, navbarModel)
    setup_handlers(window, navbarModel)


    return navbarModel
  }



