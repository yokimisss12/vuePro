<template>
  <div>
    <p>{{ state }}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>

import { ref, toRef } from "vue";
export default {
  name: "App",
  // setup 函数是组合API的入口函数
  setup() {
    let obj = {name: 'user'};
    // let state = ref(obj.name);
    let state = toRef(obj, 'name');
    /**
     * ref(obj.name) --> ref(user) 
     * -->reactive({value: user})
     * 
     * ref ->复制
     * let state = ref(obj.name);
     * toRef->引用
     * 
     * ref和toRef区别：
     * ref->复制 修改响应式数据不会影响以前的数据；数据改变界面更新
     * toRef->引用 修改响应式数据会影响以前的数据；数据改变界面不更新
     * 
     * toRef应用场景：
     * 如果想让响应式数据和以前的数据关联起来，并且更新响应式数据之后，还不想更新界面，可使用此方法
     */
    function myFn(){
        state.value = 'zz';
        /**
         * 结论:如果利用ref将某一个对象中的属性变成响应式的数据
         *      修改响应式数据不会影响原始数据
         */
        /**
         * 结论：如果利用toRef将某一个对象中的属性变成响应式的数据
         *      修改响应式数据会影响原始数据
         *      但是如果响应式数据通过toRef创建，那么修改了数据不会触发界面更新
         */
        console.log(state);
    }
    return { state, myFn };
  },
};
</script>
