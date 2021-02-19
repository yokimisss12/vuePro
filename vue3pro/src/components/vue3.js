/**
 * 1、vue3响应式数据本质
 * - 在vue中通过defineProperty实现响应式数据
 * - 在vue3中通过proxy实现响应式数据
 */


// 对象
// let obj = {
//     name: 'aa',
//     age: 18,
// }

// let state = new Proxy(obj, {
//     get(obj, key){
//         //console.log(obj, key); // { name: 'aa', age: 18 } name
//         return obj[key]

//     },
//     set(obj, key ,value){
//         console.log(obj, key ,value);
//         obj[key] = value;
//         console.log('更新界面');
//     }
// })
//console.log(state.name);
// state.name = 'bb';
// console.log(state);

// 数组
let arr = [1,3,5]
let state = new Proxy(arr, {
    get(obj, key){
        //console.log(obj, key); // { name: 'aa', age: 18 } name
        return obj[key]

    },
    set(obj, key ,value){
        // [ 1, 3, 5 ] 3 7
        // [ 1, 3, 5, 7 ] length 4
        console.log(obj, key ,value);
        obj[key] = value;
        console.log('更新界面');
        return true;  //返回true 告诉vue上一次操作成功了，否则会出错
    }
})

// console.log(state[1]);
state.push(7);
console.log(state);