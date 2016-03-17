'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = exports.Injector = undefined;

var _Inject = require('./Inject');

var _Inject2 = _interopRequireDefault(_Inject);

var _loader = require('./loader');

var loader = _interopRequireWildcard(_loader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Injector = _Inject2.default;
exports.loader = loader;