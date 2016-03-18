import path from 'path';
import angular from 'angular';
import {getParamInjects, storeInjections} from './Inject';

function firstToLowerCase(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

// const req = require.context('./', true, /.*\.js$/);
export function directives(req, moduleName = 'controllers', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        const name    = path.basename(filePath, path.extname(filePath));
        let Directive = req(filePath);
        Directive     = Directive.default ? Directive.default : Directive;

        const _directive = (...args) => {
            const instance = new Directive(...args);
            if (instance.link && typeof instance.link === 'function') {
                const linkOrg  = instance.link;
                const _injects = getParamInjects(linkOrg);

                function _link(...linkArgs) {
                    linkOrg.apply(instance, linkArgs);
                    storeInjections(_injects, _link, linkArgs);
                }

                instance.link = _link;
                _link.$inject = _injects;
            }

            if (instance.controller && typeof instance.controller === 'function') {
                const controllerOrg = instance.controller;
                const _injects      = getParamInjects(controllerOrg);

                function _controller(...ctrArgs) {
                    controllerOrg.apply(instance, ctrArgs);
                    storeInjections(_injects, _controller, ctrArgs);
                }

                instance.controller = _controller;
                _controller.$inject = _injects;
            }
            return instance;
        };
        _directive.$inject = Directive.$inject || [];
        module.directive(firstToLowerCase(name), _directive);
    });
}

export function controllers(req, moduleName = 'controllers', dependencies = [], templateCache = null) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        const name     = path.basename(filePath, path.extname(filePath));
        let Controller = req(filePath);
        Controller = Controller.default ? Controller.default : Controller;

        if (templateCache) {
            templateCache[name] = Controller.$template;
        }
        module.controller(name, Controller);
    });
}

export function services(req, moduleName = 'services', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        const name    = path.basename(filePath, path.extname(filePath));
        const Service = req(filePath);
        module.service(name, Service.default ? Service.default : Service);
    });
}

export function factories(req, moduleName = 'factories', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        const name    = path.basename(filePath, path.extname(filePath));
        const Factory = req(filePath);
        module.factory(name, Factory.default ? Factory.default : Factory);
    });
}

export function filters(req, moduleName = 'filters', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        const name   = path.basename(filePath, path.extname(filePath));
        const Filter = req(filePath);
        module.filter(name, Filter.default ? Filter.default : Filter);
    });
}
