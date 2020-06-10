import { isObject } from '../utils.js';
import { arrayMethods } from './array.js';

class Observer {
    constructor(data) {
        // 一步一步处理数据

        // 对数组索引进行拦截，效率低
        if (Array.isArray(data)) {
            // vue重写了数组方法，即函数劫持
            // 通过原型链查找
            data.__proto__ == arrayMethods;
        } else {
            this.walk(data);
        }
    }
    walk(data) {
        // 对象的循环
        // data: {
        //     msg: 'Reimu747',
        //     age: 16
        // }
        Object.keys(data).forEach(key => {
            // 定义响应式数据变化
            defineReactive(data, key, data[key]);
        })
    }
}

// vue2性能问题，递归性能低，vue3使用proxy，性能高
function defineReactive(data, key, value) {
    // 递归，如果传入的值还是对象，递归循环监测
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue !== value) {
                // 递归，监测用户设置的新值是否是对象
                observe(newValue);
                value = newValue;
            }
        },
    });
}

export function observe(data) {
    // 使用Object.defineProperty实现数据绑定
    // 判断data是不是对象
    if (!isObject(data)) {
        return;
    }
    // 对数据进行观测
    // 可以看到当前数据是否被观测过了
    return new Observer(data);
}