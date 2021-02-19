<template>
  <div>
    <p>{{state.name}}</p>
    <p>{{state.age}}</p>
    <button @click="myFn">button</button>
  </div>
</template>

<script>
import { ref, readonly,shallowReadonly, isReadonly } from "vue";
export default {
  name: "App",
  setup() {

      let  state = readonly({
          name: 'aa',
          age: 18,
      })


   return { state };
  },
};
</script>
