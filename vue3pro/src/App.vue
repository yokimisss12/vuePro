<template>
  <div>
    <p>{{count}}</p>
    <button @click="myFn">按钮</button>
    <form>
      <input type="text" v-model="stateAdd.stu.id">
      <input type="text" v-model="stateAdd.stu.name">
      <input type="text" v-model="stateAdd.stu.age">
      <input type="submit" @click="addStu">
    </form>
    <ul>
      <li v-for="(stu, index) in state.stus"
          :key='stu.id'
          @click="remStu(index)"
          >
          {{stu.name}} ------ {{stu.age}}</li>
    </ul>
  </div>
</template>

<script>
import {ref} from 'vue';
import {reactive} from 'vue';
export default {
  name: "App",
  // setup 函数是组合API的入口函数
  setup(){
   let {count, myFn} = useRef();
   let {state, remStu} = useRemoveStudent();
   let {stateAdd, addStu} = useStudentAdd(state);

   return {count, myFn, state, remStu, stateAdd, addStu};
  }
  
};

function useRef(){
 // ref 简单使用
    // ref 函数只能监听简单类型的变化，不能监听对象、数组等复杂类型的变化
    let count = ref(0);
    // 在组合API组合中，如果想定义方法，不用定义到methods中，直接定义即可
    function myFn(){
      count.value += 1;
    }
    return {count, myFn};
}
function useRemoveStudent(){
// reactive 使用
    let state = reactive({
      stus: [
        {id: 1, name :'aa', age: 10},
        {id: 2, name :'bb', age: 20},
        {id: 3, name :'cc', age: 30},
      ],
    });
    function remStu(index){
      state.stus = state.stus.filter((stu, idex) => idex !== index)
    }



    // 注意点：在组合API中定义的变量/方法，要想在外界使用，必须通过return{xxx,xxx}暴露出去
    return {state, remStu};
}
function useStudentAdd(state){
let stateAdd = reactive({
     stu: {
       id:'',
       name: '',
       age: ''
     }
   })
   function addStu(e){
      e.preventDefault();
      console.log(stateAdd.stu)
      const stu = Object.assign({}, stateAdd.stu);
      state.stus.push(stu);
      stateAdd.stu.id = '';
      stateAdd.stu.name = '';
      stateAdd.stu.age = '';
   }
   return {stateAdd, addStu};
}
</script>
