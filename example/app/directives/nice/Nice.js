import template from './nice.html';
import { Injector } from 'ngES6';

export default class Nice extends Injector {
    static $inject = ['$http'];

    constructor(...args) {
        super(...args);
        this.scope    = {};
        this.template = template;
        this.restrict = 'E';
        this.counter    = 1;
        this.link.$inject = ['scope']; // in case of UglifyJsPlugin
    }

    link(scope) {
        scope.onClick = () => this.onClick();
        scope.text    = 'Directives are working';
        scope.counter = 0;
    }

    onClick() {
        const { scope } = this.link.$injected;
        console.log('directive button clicked');
        scope.text = 'Directives events are working too: ' + [scope.counter++, this.counter++];
    }
}
