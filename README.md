# vuePro
# vue3 的6大亮点
  - Performance： 性能比vue2 快1.2~2倍
  - Tree shaking support: 按需编译，体积比vue2更小
  - Composition API: 组合 API（类似React Hooks）
  - Better TypeScript support: 更好的Ts支持
  - Fragment, Teleport(Protal), Suspense: 更先进的组件

  # Vue 3.0 是如何变快的？
  - diff 方法优化：
    + Vue2 中的虚拟dom 是全量对比
    + Vue3 新增了静态标记（PatchFlag）
      在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点
      并且可以通过flag的信息得知当前节点要对比的具体内容
      Vue 3 Template Explorer: https://vue-next-template-explorer.netlify.app/
  - hoistState 静态提升
    + vue2 中无论元素是否参与更新，每次都会重新创建
    + vue3中对不参与更新的元素，只会被创建一次，之后会在每次渲染的时候被不停地复用
  - cacheHandlers 事件侦听器缓存
    + 默认情况下onClock会被视为动态绑定，所以每次都会去追踪它的变化
      但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可
  - ssr 渲染
    + 当有大量静态的内容，这些内容会被当成纯字符串推进一个buffer里面，
      即使存在动态绑定，会通过模板插值嵌入进去。这样比通过虚拟dom来渲染的快上很多
    + 当静态内容大道一定量级的时候，会用_createStaticVNode方法在客户端生成一个static node
      这些静态node，会被直接innerHtml，就不需要创建对象，然后根据对象渲染

# 1、什么是reactive ?
   - reactiv是vue3中提供的实现响应式数据的方法
   - 在Vue2中响应式数据是通过defineProperty实现的，而在vue3中响应式数据是通过ES6的Proxy来实现的
# 2、reactive注意点：
   - reactive参数必须是对象（json/arr）
   - 如果给reactive传递了其他对象
     + 默认情况下修改对象，界面不会自动更新
     + 如果想更新，可以通过重新赋值的方式
# ref
  1、什么是ref?
   - ref和reactive一样，也是用来实现响应式数据的方法
   - 由于reactive必须传递一个对象，所以导致在企业开发中如果我们
     只想让某个变量实现响应式的时候回非常麻烦
     所以vue3提供了ref方法，实现对简单值的监听
  2、ref本质：
   - ref底层的本质其实还是reactive
     系统会自动根据给ref传入的值将它转换成：
     ref(xx) --> reactive({value: xx})
  3、ref注意点：
   - 在template中使用ref的值不用通过value获取
   - 在下方js逻辑中使用ref的值必须通过value获取
# reactive和ref的区别
   - 如果在template里面使用的是ref类型的数据，那么vue会自动添加.value；
   - 如果在template里面使用的是reactive类型的数据，那么vue不会自动添加.value
   - vue根据__v_isRef: true 私有变量的赋值判断是否是ref
# markRow 方法
   - 该方法用于对象中某个值不要被追踪
   使用方法：
   1、import {markRaw} from 'vue'
   2、写在setup方法中, 代码片段如下
   <!-- 
    let obj = { name: "obj", age: 18 };
    obj = markRaw(obj);
    function myFn(){
      state.name = 'zz';
    }

    return { state, myFn };
    -->
   
<!-- 当前代码
    <div>
    <p>Hi</p>
    <p>Hi</p>
    <p>Hi</p>
    <p class="changeClass" style="color: red">Hi {{msg}}</p>
    </div> 
-->


<!-- 源码
     
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(), _createBlock("div", null, [
        _createVNode("p", null, "Hi"),
        _createVNode("p", null, "Hi"),
        _createVNode("p", null, "Hi"),
        _createVNode("p", {
        class: "changeClass",
        style: {"color":"red"}
        }, "Hi " + _toDisplayString(_ctx.msg), 1 /* TEXT */)
    ]))
    } 
-->

<!-- 静态提升之后的代码
    const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "Hi", -1 /* HOISTED */)
    const _hoisted_2 = /*#__PURE__*/_createVNode("p", null, "Hi", -1 /* HOISTED */)
    const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "Hi", -1 /* HOISTED */)
    const _hoisted_4 = {
    class: "changeClass",
    style: {"color":"red"}
    }

    export function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(), _createBlock("div", null, [
        _hoisted_1,
        _hoisted_2,
        _hoisted_3,
        _createVNode("p", _hoisted_4, "Hi " + _toDisplayString(_ctx.msg), 1 /* TEXT */)
    ]))
    } 
-->

<!-- vue 2.0 实现的todoList
<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="muFn">click</button>
    <form>
      <input type="text" v-model="stu.id">
      <input type="text" v-model="stu.name">
      <input type="text" v-model="stu.age">
      <input type="submit" @click="addStu">
    </form>
    <ul>
      <li v-for="(stu, index) in stus" :key="stu.id"
      @click="remStu(index)">
        {{stu.name}} ----- {{stu.age}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      msg: "hello yoki",
      stus: [
        {id: 1, name :'aa', age: 10},
        {id: 2, name :'bb', age: 20},
        {id: 3, name :'cc', age: 30},
      ],
      stu: [
        {id: '', name: '', age: ''}
      ]
    };
  },
  methods: {
    muFn() {
      alert("hello yoki");
    },
    remStu(index){
      this.stus = this.stus.filter((stu, idex) => idex !== index)
    },
    addStu(e){
      e.preventDefault();
      const stu = Object.assign({}, this.stu);
      this.stus.push(stu);
      this.stu.id = '';
      this.stu.name = '';
      this.stu.age = '';
    }
  },
};
</script>

 -->