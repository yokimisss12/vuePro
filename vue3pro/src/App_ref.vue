<template>
  <div>
    <!-- <p>{{ state.age }}</p> -->
    <!-- 如果在template中使用ref创建的数据，系统会自动添加.value的赋值 -->
    <p>{{ age }}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { markRaw, ref } from "vue";
export default {
  name: "App",
  // setup 函数是组合API的入口函数
  setup() {
    //    let state = reactive({
    //       age: 18
    //   })
    /**
     * ref 本质：
     * ref本质其实还是reactive
     * 当我们给ref函数传递给一个值后，ref函数底层会自动将ref转换成reactive
     * ref(18) --> reactive({value: 18})
     */
    let age = ref(18);
    function myFn() {
      // age = 666;  该赋值相当于{value: 18}，要改变界面的值要获取value值
      age.value = 666;
      console.log(age);
    }

    return { state, myFn };
  },
};
</script>
