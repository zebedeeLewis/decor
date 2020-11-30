import './index.scss'
import * as Navbar from "../../lib/js/Navbar"


function init
  ( window
  ) {
    const document = window.document

    document.addEventListener
      ( 'DOMContentLoaded'
      , () => Navbar.init(window, '#navbar')
      )
  }



init(window)
