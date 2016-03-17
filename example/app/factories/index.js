import { loader } from 'ngES6';

const MODULE_NAME = 'es6.factories';

loader.factories(require.context('./', true, /.*\.js$/), MODULE_NAME);

export default MODULE_NAME;
