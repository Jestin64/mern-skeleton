module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const config = {
  env: "development" || 0,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  // mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
  //     'mongodb://' + (process.env.IP || 'localhost') + ':' + 
  //     (process.env.MONGO_PORT || '27017') + 
  //     '/mernproject'
  mongoUri: 'mongodb+srv://AaronBaron:AaronBaron@cluster0.syfka.gcp.mongodb.net/mernproject?retryWrites=true&w=majority'
};
const _default = config;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(config, "config", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\config\\config.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\config\\config.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config */ "./config/config.js");
/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/user.model */ "./server/models/user.model.js");
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-jwt */ "express-jwt");
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_3__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};






const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: "Signed out Successfully"
  });
};

const signin = async (req, res) => {
  try {
    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_2__.default.findOne({
      "email": req.body.email
    });
    console.log(req.body.email);
    console.log(req.body.password);

    if (!user) {
      return res.status(401).send({
        error: "User not found"
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({
        error: "email and password incorrect"
      });
    }

    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({
      _id: user._id
    }, _config_config__WEBPACK_IMPORTED_MODULE_1__.default.jwtSecret);
    res.cookie('t', token, {
      expire: new Date() + 9999
    });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(401).json({
      error: "Sign in failed"
    });
  }
};

const requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_3___default()({
  secret: _config_config__WEBPACK_IMPORTED_MODULE_1__.default.jwtSecret,
  userProperty: 'auth',
  algorithms: ['sha1', 'RS256', 'HS256']
});

const hasAuthorisation = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: 'Unauthorized user'
    });
  }

  next();
};

const _default = {
  signout,
  signin,
  requireSignin,
  hasAuthorisation
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(signout, "signout", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\auth.controller.js");
  reactHotLoader.register(signin, "signin", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\auth.controller.js");
  reactHotLoader.register(requireSignin, "requireSignin", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\auth.controller.js");
  reactHotLoader.register(hasAuthorisation, "hasAuthorisation", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\auth.controller.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\auth.controller.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ "./server/models/user.model.js");
/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ "./server/helpers/dbErrorHandler.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



 //api/users

const list = async (req, res) => {
  try {
    let users = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.find().select('name email updated created');
    return res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__.default.getErrorMessage(err)
    });
  }
};

const create = async (req, res) => {
  let user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default(req.body);

  try {
    await user.save(); //console.log(`User saved : ${user.name}, ${user.email}, ${user.password}`)

    return res.status(200).json({
      message: 'Sign up successful'
    });
  } catch (err) {
    return res.status(400).json({
      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__.default.getErrorMessage(err)
    });
  }
}; //loading data based on id from the database before being used to read, update and removed


const userById = (req, res, next, id) => {
  try {
    let user = _models_user_model__WEBPACK_IMPORTED_MODULE_0__.default.findById(id);

    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retreive user"
    });
  }
}; //api/users/:userId


const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let user = req.profile;
    user = lodash__WEBPACK_IMPORTED_MODULE_2___default()(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    await res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__.default.getErrorMessage(err)
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__.default.getErrorMessage(err)
    });
  }
};

const _default = {
  list,
  read,
  create,
  update,
  remove,
  userById
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(list, "list", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\user.controller.js");
  reactHotLoader.register(create, "create", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\user.controller.js");
  reactHotLoader.register(userById, "userById", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\user.controller.js");
  reactHotLoader.register(read, "read", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\user.controller.js");
  reactHotLoader.register(update, "update", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\user.controller.js");
  reactHotLoader.register(remove, "remove", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\user.controller.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\controllers\\user.controller.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/devBundle.js":
/*!*****************************!*\
  !*** ./server/devBundle.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./config/config.js");
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack */ "webpack");
/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _webpack_config_client_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../webpack.config.client.js */ "./webpack.config.client.js");
/* harmony import */ var _webpack_config_client_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_webpack_config_client_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware");
/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! webpack-hot-middleware */ "webpack-hot-middleware");
/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};







const compile = app => {
  if (_config_config__WEBPACK_IMPORTED_MODULE_0__.default.env === 'development') {
    const compiler = webpack__WEBPACK_IMPORTED_MODULE_1___default()((_webpack_config_client_js__WEBPACK_IMPORTED_MODULE_2___default()));
    const middleware = webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler, {
      publicPath: (_webpack_config_client_js__WEBPACK_IMPORTED_MODULE_2___default().output.publicPath)
    }, {
      writeToDisk: true
    });
    app.use(middleware);
    app.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default()(compiler));
  }
};

const _default = {
  compile
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(compile, "compile", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\devBundle.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\devBundle.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../template */ "./template.js");
/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/user.routes */ "./server/routes/user.routes.js");
/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/auth.routes */ "./server/routes/auth.routes.js");
/* harmony import */ var _devBundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./devBundle */ "./server/devBundle.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const express = __webpack_require__(/*! express */ "express");

const path = __webpack_require__(/*! path */ "path");

const bodyparser = __webpack_require__(/*! body-parser */ "body-parser");

const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");

const helmet = __webpack_require__(/*! helmet */ "helmet");

const compression = __webpack_require__(/*! compression */ "compression");





 // use only for dev

const CURRENT_WORKING_DIR = process.cwd();
const app = express();
_devBundle__WEBPACK_IMPORTED_MODULE_4__.default.compile(app); // use only for dev

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors__WEBPACK_IMPORTED_MODULE_0___default()());
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist'))); //mount routes

app.use('/', _routes_user_routes__WEBPACK_IMPORTED_MODULE_2__.default);
app.use('/', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_3__.default);
app.get('/', (req, res) => {
  res.status(200).send((0,_template__WEBPACK_IMPORTED_MODULE_1__.default)());
}); //catch Unauthorized errors

app.use((err, req, res, next) => {
  // keep this parameter syntax
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      "error": err.name + " : " + err.message
    });
  } else if (err) {
    res.status(400).json({
      "error": err.name + " : " + err.message
    });
    console.log(err);
  }
});
const _default = app;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CURRENT_WORKING_DIR, "CURRENT_WORKING_DIR", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\express.js");
  reactHotLoader.register(app, "app", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\express.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\express.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/helpers/dbErrorHandler.js":
/*!******************************************!*\
  !*** ./server/helpers/dbErrorHandler.js ***!
  \******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const getErrorMessage = function (err) {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;

      default:
        message = 'Sorry, Something went wrong';
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

function getUniqueErrorMessage(err) {
  let output;

  try {
    let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
  } catch (err) {
    output = 'Unique field already exists';
  }

  return output;
}

const _default = {
  getErrorMessage
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getErrorMessage, "getErrorMessage", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\helpers\\dbErrorHandler.js");
  reactHotLoader.register(getUniqueErrorMessage, "getUniqueErrorMessage", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\helpers\\dbErrorHandler.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\helpers\\dbErrorHandler.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


 // note : salt is a crypography method that adds additional input to the passwd to hash it,
//to provide a safeguard vs rainbow tables that attacks hashtables

const userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
  name: {
    type: String,
    trim: true,
    required: 'User name is required'
  },
  email: {
    type: String,
    trim: true,
    required: 'User email is required',
    unique: 'Email already exists',
    match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Please use a valid email address']
  },
  created: {
    type: Date,
    default: Date.now
  },
  //passwd needs to be encrypted, validated and authenticated
  // passwd field value will not be stored in the user scehema database, instead it will be handled as a virtual field
  // virtual fields do not get added to the database
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  salt: String,
  updated: Date
}); //encryption and authentication of passwd

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return '';

    try {
      return crypto__WEBPACK_IMPORTED_MODULE_1___default().createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  authenticate: function (plainText) {
    return this.hashed_password === this.encryptPassword(plainText);
  }
};
userSchema.virtual('password').set(function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
}).get(function () {
  return this._password;
}); //validation

userSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be atleast 6 characters long");
  }

  if (this.isNew && !this.password) {
    this.invalidate('password', "Password is required");
  }
}, null);

const _default = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', userSchema);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(userSchema, "userSchema", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\models\\user.model.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\models\\user.model.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ "./server/controllers/auth.controller.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



const router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
router.route('/auth/signout').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.default.signout);
router.route('/auth/signin').post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__.default.signin);
const _default = router;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\routes\\auth.routes.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\routes\\auth.routes.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ "./server/controllers/user.controller.js");
/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ "./server/controllers/auth.controller.js");
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




const router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
router.route("/api/users").get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.create); //needs auth

router.route('/api/users/:userId').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.hasAuthorisation, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__.default.hasAuthorisation, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.remove);
router.param('userId', _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__.default.userById);
const _default = router;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\routes\\user.routes.js");
  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\server\\routes\\user.routes.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./config/config.js");
/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./express */ "./server/express.js");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};




(mongoose__WEBPACK_IMPORTED_MODULE_2___default().Promise) = global.Promise;
mongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_0__.default.mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connected to MongoDB...`);
});
mongoose__WEBPACK_IMPORTED_MODULE_2___default().connection.on('error', () => {
  throw new Error(`unable to connect to database: ${_config_config__WEBPACK_IMPORTED_MODULE_0__.default.mongoUri}`);
});
_express__WEBPACK_IMPORTED_MODULE_1__.default.listen(_config_config__WEBPACK_IMPORTED_MODULE_0__.default.port, err => {
  if (err) {
    return console.log(err);
  }

  console.info(`Server opened at port: ${_config_config__WEBPACK_IMPORTED_MODULE_0__.default.port}`);
});

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.hmd, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = () => {
  return `<!doctype html>
    <html lang="en">
        <head>
            <title>Mern project template </title>
            <meta charset="utf-8"> 
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet">
        </head>
        <body> 
            <div id="root"></div>
            <script type="text/javscript" src="./dist/bundle.js"></script>
        </body>
    </html>`;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\template.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "./webpack.config.client.js":
/*!**********************************!*\
  !*** ./webpack.config.client.js ***!
  \**********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module.loaded, module.id, module, __webpack_require__.nmd, __webpack_require__, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 42:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const path = __webpack_require__(/*! path */ "path");

const webpack = __webpack_require__(/*! webpack */ "webpack");

const CURRENT_WORKING_DIR = process.cwd();
const config = {
  name: "browser",
  mode: "development",
  devtool: false,
  entry: ['webpack-hot-middleware/client?reload=true', path.join(CURRENT_WORKING_DIR, '/client/main.js')],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /\.js?/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
      use: 'file-loader'
    }]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), new webpack.SourceMapDevToolPlugin()],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};
module.exports = config;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CURRENT_WORKING_DIR, "CURRENT_WORKING_DIR", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\webpack.config.client.js");
  reactHotLoader.register(config, "config", "E:\\Org\\web_technology\\rjs\\mern-skeleton\\webpack.config.client.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");;

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("compression");;

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("cors");;

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("express-jwt");;

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("helmet");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("lodash");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! dynamic exports */
/*! exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("webpack");;

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("webpack-dev-middleware");;

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("webpack-hot-middleware");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./server/server.js");
/******/ })()
;