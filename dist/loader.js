'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.directives = directives;
exports.controllers = controllers;
exports.services = services;
exports.factories = factories;
exports.filters = filters;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _Inject = require('./Inject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function firstToLowerCase(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

// const req = require.context('./', true, /.*\.js$/);
function directives(req) {
    var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'controllers' : arguments[1];
    var dependencies = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    var module = _angular2.default.module(moduleName, dependencies);

    req.keys().forEach(function (filePath) {
        var Directive = req(filePath);
        Directive = Directive.default ? Directive.default : Directive;

        var _directive = function _directive() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var instance = new (Function.prototype.bind.apply(Directive, [null].concat(args)))();
            if (instance.link && typeof instance.link === 'function') {
                (function () {
                    var _link = function _link() {
                        for (var _len2 = arguments.length, linkArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            linkArgs[_key2] = arguments[_key2];
                        }

                        linkOrg.apply(instance, linkArgs);
                        (0, _Inject.storeInjections)(_injects, _link, linkArgs);
                    };

                    var linkOrg = instance.link;
                    var _injects = (0, _Inject.getParamInjects)(linkOrg);

                    instance.link = _link;
                    _link.$inject = _injects;
                })();
            }

            if (instance.controller && typeof instance.controller === 'function') {
                (function () {
                    var _controller = function _controller() {
                        for (var _len3 = arguments.length, ctrArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            ctrArgs[_key3] = arguments[_key3];
                        }

                        controllerOrg.apply(instance, ctrArgs);
                        (0, _Inject.storeInjections)(_injects, _controller, ctrArgs);
                    };

                    var controllerOrg = instance.controller;
                    var _injects = (0, _Inject.getParamInjects)(controllerOrg);

                    instance.controller = _controller;
                    _controller.$inject = _injects;
                })();
            }
            return instance;
        };
        _directive.$inject = Directive.$inject || [];
        module.directive(firstToLowerCase(Directive.name), _directive);
    });
}

function controllers(req) {
    var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'controllers' : arguments[1];
    var dependencies = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
    var templateCache = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var module = _angular2.default.module(moduleName, dependencies);

    req.keys().forEach(function (filePath) {
        var Controller = req(filePath);
        Controller = Controller.default ? Controller.default : Controller;

        if (templateCache) {
            templateCache[Controller.name] = Controller.$template;
        }
        module.controller(Controller.name, Controller);
    });
}

function services(req) {
    var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'services' : arguments[1];
    var dependencies = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    var module = _angular2.default.module(moduleName, dependencies);

    req.keys().forEach(function (filePath) {
        var Service = req(filePath);
        Service = Service.default ? Service.default : Service;
        module.service(Service.name, Service);
    });
}

function factories(req) {
    var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'factories' : arguments[1];
    var dependencies = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    var module = _angular2.default.module(moduleName, dependencies);

    req.keys().forEach(function (filePath) {
        var Factory = req(filePath);
        Factory = Factory.default ? Factory.default : Factory;
        module.factory(Factory.name, Factory);
    });
}

function filters(req) {
    var moduleName = arguments.length <= 1 || arguments[1] === undefined ? 'filters' : arguments[1];
    var dependencies = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    var module = _angular2.default.module(moduleName, dependencies);

    req.keys().forEach(function (filePath) {
        var Filter = req(filePath);
        Filter = Filter.default ? Filter.default : Filter;
        module.filter(Filter.name, Filter);
    });
}