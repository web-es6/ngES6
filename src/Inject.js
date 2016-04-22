const FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
export function getParamInjects(fn) {
    let $inject = fn.$inject,
        fnText,
        fnArgs;

    if (!$inject) {
        $inject = [];
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        fnArgs = fnText.match(FN_ARGS);
        fnArgs[1].split(',').forEach((name) => {
            $inject.push(name.trim());
        });
        fn.$inject = $inject;
    }
    return $inject;
}

export function storeInjections($inject = [], instance, args, varName = '$injected') {
    const instanceInject = instance[varName] = instance[varName] || {};

    $inject.forEach((injectName, index) => {
        instanceInject[injectName] = args[index];
    });
}

export default class Injector {
    static $inject = [];

    constructor(...args) {
        storeInjections(this.constructor.$inject, this, args);
    }

    attachMethodsTo(obj, pattern = null) {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(i => {
            if (i !== 'constructor' && (!pattern || pattern.test(i))) {
                obj[i] = (...args) => this[i].apply(this, args);
            }
        });
    }
}
