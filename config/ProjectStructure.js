const path = require('path')



const PROJECT_ROOT_DIR = path.join(__dirname, '..')



const PROJECT_CONFIG_DIR = path.join(PROJECT_ROOT_DIR, 'config/')

const PROJECT_CONFIG_LIB_DIR = path.join(PROJECT_CONFIG_DIR, 'lib/')

const HANDLEBARS_DIR = path.join(PROJECT_CONFIG_LIB_DIR, 'handlebars/')

const POST_CSS_CONFIG_PATH =
  path.join(PROJECT_CONFIG_DIR, 'postcss.config.js')



const SRC_DIR = path.join(PROJECT_ROOT_DIR, 'src/')

const PAGES_DIR = path.join(SRC_DIR, 'page/')

const SRC_LIB_DIR = path.join(SRC_DIR, 'lib/')

const HOMEPAGE_DIR = path.join(PAGES_DIR, 'home/')



const TEMPLATES_LIB_DIR = path.join(SRC_LIB_DIR, 'handlebars_partials/')

const HANDLERS_LIB_DIR = path.join(SRC_LIB_DIR, 'handler/')

const JS_LIB_DIR = path.join(SRC_LIB_DIR, 'handlebars_partials/')

const SCSS_LIB_DIR = path.join(SRC_LIB_DIR, 'scss/')

const IMAGE_LIB_DIR = path.join(SRC_LIB_DIR, 'image/')



const DEFAULT_HTML_SHELL_PATH
  = path.join(TEMPLATES_LIB_DIR, 'shell.handlebars.html')



const HOMEPAGE_HTML_PATH
  = path.join(HOMEPAGE_DIR, 'index.handlebars.html')

const HOMEPAGE_JS_PATH = path.join(HOMEPAGE_DIR, 'index.js')

const HOMEPAGE_SCSS_PATH = path.join(HOMEPAGE_DIR, 'index.scss')

const HOMEPAGE_PARTIALS_DIR = path.join(HOMEPAGE_DIR, 'handlebars_partials')

const HOMEPAGE_IMAGE_DIR = path.join(HOMEPAGE_DIR, 'image')



const DIST_DIR = path.join(PROJECT_ROOT_DIR, 'dist/')

const DIST_SCSS_DIR = path.join(DIST_DIR, 'css/')

const DIST_JS_DIR = path.join(DIST_DIR, 'js/')

const DIST_IMAGE_DIR = path.join(DIST_DIR, 'image/')



const DEV_PUBLIC_PATH = '/decor/'

const PROD_PUBLIC_PATH = '/decor/'



module.exports =
  { PROJECT_ROOT_DIR
  , HOMEPAGE_JS_PATH
  , DIST_DIR
  , DEV_PUBLIC_PATH
  , PROD_PUBLIC_PATH
  , DEFAULT_HTML_SHELL_PATH
  , HANDLERS_LIB_DIR
  , TEMPLATES_LIB_DIR
  , PAGES_DIR
  }

