import angular from 'angular';
import {getParamInjects, storeInjections} from './Inject';

function firstToLowerCase(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

// const req = require.context('./', true, /.*\.js$/);
export function directives(req, moduleName = 'controllers', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
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
        module.directive(firstToLowerCase(Directive.name), _directive);
    });
}

export function controllers(req, moduleName = 'controllers', dependencies = [], templateCache = null) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        let Controller = req(filePath);
        Controller = Controller.default ? Controller.default : Controller;

        if (templateCache) {
            templateCache[Controller.name] = Controller.$template;
        }
        module.controller(Controller.name, Controller);
    });
}

export function services(req, moduleName = 'services', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        let Service = req(filePath);
        Service = Service.default ? Service.default : Service;
        module.service(Service.name, Service);
    });
}

export function factories(req, moduleName = 'factories', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        let Factory = req(filePath);
        Factory = Factory.default ? Factory.default : Factory;
        module.factory(Factory.name, Factory);
    });
}

export function filters(req, moduleName = 'filters', dependencies = []) {
    const module = angular.module(moduleName, dependencies);

    req.keys().forEach(filePath => {
        let Filter = req(filePath);
        Filter = Filter.default ? Filter.default : Filter;
        module.filter(Filter.name, Filter);
    });
}
