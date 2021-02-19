<template>
  <div>
    <p>{{ age }}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
/**
 * 1、customRef
 * 返回一个ref对象，可以显示地控制依赖追踪和触发响应
 */
import { ref, customRef } from "vue";
export default {
  name: "App",
  setup() {
    let age = myRef(18); // reactive({value: 18})
    function myFn() {
      age.value += 1;
    }

    function myRef(value) {
      //参数为初始值
      return customRef((track, trigger) => {
        return {
          get() {
              track(); // 告诉vue这个数据需追踪变化
              console.log('get' , value);
              return value;
          },
          set(newValue) {
              trigger(); // 告诉vue需要触发界面更新
              console.log('set' , value);
              value = newValue;
          },
        };
      });
    }
    return { age, myFn };
  },
};
</script>
