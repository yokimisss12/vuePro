<template>
  <div>
    <p>{{ state }}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>

import { ref, toRef, toRefs } from "vue";
export default {
  name: "App",
  // setup 函数是组合API的入口函数
  setup() {
    let obj = {name: 'user', age: 18};
    // let name = toRef(obj, 'name');
    // let age = toRef(obj, 'age');

    let state = toRefs(obj);

    function myFn(){
        // name.value = 'zz';
        // age.value = 333;
        state.name.value = 'zz';
        state.age.value = 666;
        console.log(obj);
        // console.log(age);
    }
    return { state, myFn };
  },
};
</script>
