import { initMixin } from './init.js';
function Vue(options) {
    // 内部进行初始化
    this._init(options);
}
initMixin(Vue);
export default Vue;