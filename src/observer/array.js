// 获取数组原型上的方法
let oldArrayMethods = Array.prototype;
// 创建一个新对象，可以找到数组原型上的方法，不会影响数组的原型方法
export let arrayMethods = Object.create(oldArrayMethods);

let methods = [
    // 改变原数组的方法
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice',
];

methods.forEach(method => {
    // 函数劫持AOP
    arrayMethods[method] = function (...args) {
        // 用户调用数组方法时，先执行上面的逻辑，最后执行数组默认逻辑

        
        oldArrayMethods[method].apply(this, args);
    }
});