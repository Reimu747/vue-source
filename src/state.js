import { observe } from './observer/index.js'
export function initState(vm) {
    const options = vm.$options;
    // 初始化data
    if (options.data) {
        initData(vm);
    }
}

function initData(vm) {
    // 数据响应式原理
    // 用户传入的数据
    let data = vm.$options.data;
    // vm._data 监测后的数据
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 观测数据
    observe(data);
}