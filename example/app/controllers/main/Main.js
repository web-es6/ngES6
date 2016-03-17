import './main.less';
import angular from 'angular';
import { Injector } from 'ngES6';

export default class Main extends Injector {
    static $inject = ['$scope', 'UserService'];

    constructor(...args) {
        super(...args);
        this.attachMethodsTo(this.$injected.$scope);
        this.counter = 1;
        this.$injected.$scope.counter = 0;
    }

    onclick(e) {
        const {$scope, UserService} = this.$injected;
        angular.element(e.target).text('clicked: ' + [$scope.counter++, this.counter++]);
        console.log(UserService.update());
    }
}
