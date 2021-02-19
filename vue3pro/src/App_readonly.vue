<template>
  <div>
    <p>{{state.name}}</p>
    <p>{{state.attr.age}}</p>
    <p>{{state.attr.height}}</p>
    <button @click="myFn">button</button>
  </div>
</template>

<script>
/**
 * 1、customRef
 * 返回一个ref对象，可以显示地控制依赖追踪和触发响应
 */
import { ref, readonly,shallowReadonly, isReadonly } from "vue";
export default {
  name: "App",
  setup() {
      // readonly 创建递归只读数据
      // shallowReadonly 只读，非递归
      // isReadonly  判断是否是readonly
      let  state = readonly({
          name: 'aa',
          attr: {
              age: 18,
              height: 1.68
          }
      })

      function myFn(){
          state.name = 'bb';
          state.attr.age = 666;
          state.attr.height = 1.88;
          console.log(state);
      }
   return { state, myFn };
  },
};
</script>
