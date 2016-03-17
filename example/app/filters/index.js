import { loader } from 'ngES6';

const MODULE_NAME = 'es6.filters';

loader.filters(require.context('./', true, /.*\.js$/), MODULE_NAME);

export default MODULE_NAME;
