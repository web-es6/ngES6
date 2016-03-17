import { loader } from 'ngES6';

const MODULE_NAME = 'es6.services';

loader.services(require.context('./', true, /^(?!\.\/index\.js$).+\.js$/), MODULE_NAME);

export default MODULE_NAME;
