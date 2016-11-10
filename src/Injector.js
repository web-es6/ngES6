
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
