import { Injector } from 'ngES6';

export default class UserService extends Injector {
    static $inject = ['$http'];

    update() {
        return 'from UserService';
    }
}
