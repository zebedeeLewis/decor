const path = require('path')



const ROOT_DIR = path.join(__dirname, '..')



/** Project Build Configuration Paths */
const CONFIG_DIR = path.join(ROOT_DIR, 'config/')
const CONFIG_LIB_DIR = path.join(CONFIG_DIR, 'lib/')
const CONFIG_LIB_HANDLEBARS_DIR = path.join(CONFIG_LIB_DIR, 'handlebars/')
const POST_CSS_CONFIG_PATH = path.join(CONFIG_DIR, 'postcss.config.js')



/** Source File Paths */
const SRC_DIR = path.join(ROOT_DIR, 'src/')


// Paths To Pages Source File
const PAGES_DIR = path.join(SRC_DIR, 'page/')


const PAGE_HOME_DIR = path.join(PAGES_DIR, 'home/')
const PAGE_HOME_HTML_PATH
  = path.join(PAGE_HOME_DIR, 'index.handlebars.html')
const PAGE_HOME_JS_PATH = path.join(PAGE_HOME_DIR, 'index.js')
const PAGE_HOME_SCSS_PATH = path.join(PAGE_HOME_DIR, 'index.scss')
const PAGE_HOME_PARTIALS_DIR
  = path.join(PAGE_HOME_DIR, 'handlebars_partial/')
const PAGE_HOME_IMAGE_DIR = path.join(PAGE_HOME_DIR, 'image')


const PAGES_LIB_DIR = path.join(PAGES_DIR, 'lib/')
const PAGES_LIB_PARTIALS_DIR
  = path.join(PAGES_LIB_DIR, 'handlebars_partial/')
const PAGES_LIB_HANDLERS_DIR
  = path.join(PAGES_LIB_DIR, 'handlebars_handler/')
const PAGES_LIB_SCSS_DIR = path.join(PAGES_LIB_DIR, 'scss/')
const PAGES_LIB_JS_DIR = path.join(PAGES_LIB_DIR, 'js/')
const PAGES_LIB_IMAGES_DIR = path.join(PAGES_LIB_DIR, 'images/')
const DEFAULT_HTML_SHELL_PATH
  = path.join(PAGES_LIB_PARTIALS_DIR, 'shell.handlebars.html')


// Paths To Components Source File
const COMPONENTS_DIR = path.join(SRC_DIR, 'component/')
const COMPONENTS_LIB_DIR = path.join(COMPONENTS_DIR, 'lib/')



/** Dist File Paths */
const DIST_DIR = path.join(ROOT_DIR, 'dist/')
const DIST_SCSS_DIR = path.join(DIST_DIR, 'css/')
const DIST_JS_DIR = path.join(DIST_DIR, 'js/')
const DIST_IMAGE_DIR = path.join(DIST_DIR, 'image/')



/** URL paths */
const DEV_PUBLIC_PATH = '/decor/'
const PROD_PUBLIC_PATH = '/decor/'



module.exports =
  { DEFAULT_HTML_SHELL_PATH
  , PAGES_DIR
  , PAGES_LIB_PARTIALS_DIR
  , PAGES_LIB_HANDLERS_DIR
  , PAGE_HOME_JS_PATH
  , DIST_DIR
  , DEV_PUBLIC_PATH
  , PROD_PUBLIC_PATH
  , POST_CSS_CONFIG_PATH
  }

