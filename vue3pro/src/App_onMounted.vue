<template>
  <div>
    <div ref="box">hello</div>
  </div>
</template>

<script>
/**
 * 1、customRef
 * 返回一个ref对象，可以显示地控制依赖追踪和触发响应
 */
import { ref, onMounted } from "vue";
export default {
  name: "App",
  setup() {
      // beforeCreate -> setup -> create
    // console.log(this.$refs.box);  vue2的写法，vue3写法不同
    let box = ref(null); // reactive({value: null})

    console.log(box.value); // null

    onMounted(()=>{
        console.log('onMounted', box.value);
    })
    return { box };
  },
};
</script>
