<template>
  <div>
    <p>{{state.a}}</p>
    <p>{{state.gf.b}}</p>
    <p>{{state.gf.f.c}}</p>
    <p>{{state.gf.f.s.d}}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
/**
 * 1、递归监听：
 *    默认情况下，无论是通过ref还是reactive都是递归监听
 * 2、递归监听存在的问题
 *    如果数据量比较大，非常消耗性能
 *    原因：vue要将取出的每一层元素都包装成一个proxy对象
 * 3、非递归监听：shalloRef / shallowReactive
 * 4、如何触发非递归监听属性更新界面？
 *    如果是shallowRef类型，可通过triggerRef触发
 *    Vue3未提供reactive类型的自动触发方法
 * 5、应用场景
 *    一般情况下，我们使用ref和reactive即可
 *    只有在需要监听数据量比较大的时候，我们才会使用shallowRef/shallowReacive方法
 */
// import { ref } from "vue";
// import { reactive } from "vue";
import {shallowRef, triggerRef} from 'vue';
import {shallowReactive} from 'vue'
export default {
  name: "App",
  // setup 函数是组合API的入口函数
  setup() {
    // let state = reactive({
    //     a: 'a',
    //     gf: {
    //         b: 'b',
    //         f: {
    //             c: 'c',
    //             s: {
    //                 d: 'd'
    //             }
    //         }
    //     }
    // });

    // function myFn(){
    //     state.a = '1';
    //     state.gf.b = '2';
    //     state.gf.f.c = '3';
    //     state.gf.f.s.d = '4';
    // }

    let state = shallowRef({
        a: 'a',
        gf: {
            b: 'b',
            f: {
                c: 'c',
                s: {
                    d: 'd'
                }
            }
        }
    });

    function myFn(){
        state.value.a = '1';
        state.value.gf.b = '2';
        state.value.gf.f.c = '3';
        state.value.gf.f.s.d = '4';
        triggerRef(state); //triggerRef为主动更新数据
    }

    return {state, myFn}
  }
};
</script>
