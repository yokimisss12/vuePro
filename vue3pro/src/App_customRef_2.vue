<template>
  <div>
    <ul>
      <li v-for="item in state" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, customRef } from "vue";
export default {
  name: "App",
  // setup函数只能是同步函数，不能使用异步
  setup() {
    let state = myRef("../public/data.json");

    function myRef(value) {
      //参数为初始值
      return customRef((track, trigger) => {
        fetch(value)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            state.value = data;
          })
          .catch((err) => {
            console.log(err);
          });
        return {
          get() {
            track(); // 告诉vue这个数据需追踪变化
            /**
             *  注意点：
             *  1、不能在get方法中发送网络请求，否则会一直进行下面的循环导致界面崩溃
             *  渲染界面 -> 调用get -> 发送网络请求 ->
             *  保存数据 -> 更新界面 -> 调用get
             */

            return value;
          },
          set(newValue) {
            trigger(); // 告诉vue需要触发界面更新
            value = newValue;
          },
        };
      });
    }

    return { state };
  },
};
</script>
