'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getParamInjects = getParamInjects;
exports.storeInjections = storeInjections;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
function getParamInjects(fn) {
    var $inject = fn.$inject;
    var fnText = void 0;
    var fnArgs = void 0;

    if (!$inject) {
        $inject = [];
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        fnArgs = fnText.match(FN_ARGS);
        fnArgs[1].split(',').forEach(function (name) {
            $inject.push(name.trim());
        });
        fn.$inject = $inject;
    }
    return $inject;
}

function storeInjections() {
    var $inject = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var instance = arguments[1];
    var args = arguments[2];
    var varName = arguments.length <= 3 || arguments[3] === undefined ? '$injected' : arguments[3];

    var instanceInject = instance[varName] = instance[varName] || {};

    $inject.forEach(function (injectName, index) {
        instanceInject[injectName] = args[index];
    });
}

var Injector = function () {
    function Injector() {
        _classCallCheck(this, Injector);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        storeInjections(this.constructor.$inject, this, args);
    }

    _createClass(Injector, [{
        key: 'attachMethodsTo',
        value: function attachMethodsTo(obj) {
            var _this = this;

            var pattern = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            Object.getOwnPropertyNames(this.__proto__).forEach(function (i) {
                if (i !== 'constructor' && (!pattern || pattern.test(i))) {
                    obj[i] = function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        return _this[i].apply(_this, args);
                    };
                }
            });
        }
    }]);

    return Injector;
}();

Injector.$inject = [];
exports.default = Injector;