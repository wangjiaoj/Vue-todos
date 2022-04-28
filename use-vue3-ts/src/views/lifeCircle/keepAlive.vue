<template lang="">
  <div>测试vue3新增生命周期</div>
  <keep-alive>
    <editItem></editItem>
  </keep-alive>
  <div>
    这是登陆页面{{username}}{{password}}
  </div>
  <button @click='$router.back()'>返回</button>
  <button @click='changePass()'>changePass</button>
</template>
<script lang="ts">
import editItem from './components/editItem.vue'
import { defineComponent,onMounted,getCurrentInstance } from 'vue'
export default defineComponent({
  props:['ceshi'],
  data(){
    return{
      username:'author',
      password:'123456'
    }
  },
  components:{editItem},
  methods: {
    changePass(){
      this.password = '奇蛋物语'
    },
  },
  setup(props,context){
    // 在创建组件实例时，在初始 prop 解析之后立即调用 setup。在生命周期方面，它是在 beforeCreate 钩子之前调用的。
    //! 在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。
    // let vuePrototype = getCurrentInstance().appContext.config.globalProperties // 懂得都懂，基础问题。
    // let componentInstance = getCurrentInstance().proxy // 初始组件实例对象，但其实没什么用！
    // console.log(componentInstance.$props,componentInstance.$nextTick); //! 在setup中只能访问到实例方法、实例property的内容！以及实例对象原型链上的内容。
    onMounted(()=>{console.log('在setup内注册生命周期必须在setup内同步调用')})
    console.log('0 setup');// 写0是代表 setup 不算生命周期，讲解setup对理解生命周期也有好处就写出来了。
  },
  beforeCreate(){
    // 在实例初始化之后同步调用。但此时还未初始化完成！！
    // 在实例 `进行数据侦听和事件/侦听器的配置` 之前同步调用。
    //! 该生命周期的 this 只能获取到组件实例初始化完成前的内容！
    //> 简单点说：只能拿到实例方法、实例property的内容！以及实例对象原型链上的内容。
    console.log(
      this.username, // undefined，组件未实例化完成，所以拿不到！！
      this.$props, // 若父组件有传，则有数据
      '1 beforeCreate'
    )
  },
  created(){console.log(this,'2 created')},
  beforeMount(){
    console.log(this,'3 beforeMount')
  },
  renderTracked({ key, target, type }){
    // 组件template引用了响应式数据，则会触发renderTracked生命周期，并告诉你模板`跟踪了/引用了`哪些响应式数据。
    //! 仅限本地开发环境生效的生命周期
    console.log({ key, target, type },'4 renderTracked') // 只需要关注这3个，总共只有4个属性，另外一个是默认的副作用函数
  },
  mounted(){
     // 在mounted里修改组件响应式数据，则会触发数据变更的组件生命周期
     // 也就是说：在 mounted 生命周期前对响应式数据进行`同步修改`，是不会触发数据变更的组件生命周期
    console.log(this,'5 mounted')
    this.changePass()
  },
  activated(){console.log(this,'7 activated')},
 
  // 组件响应式数据变更时触发的生命周期，从组件 mounted 生命周期开始，有响应式数据变更操作，则会执行。
  renderTriggered(){console.log(this,'6 renderTriggered')}, //! 仅限本地开发环境生效的生命周期
  beforeUpdate(){console.log(this,'8 beforeUpdate')},
  updated(){console.log(this,'9 updated')},
 
  // 销毁组件 或 组件缓存失活时触发，若这2个状态同时有，则按照下列 10 11 12的顺序触发！！
  beforeUnmount(){console.log(this,'10 beforeUnmount')}, // 在`销毁当前组件前`触发
  deactivated(){console.log(this,'11 deactivated')},
  unmounted(){console.log(this,'12 unmounted')}, // 当前组件销毁时，在其他激活的组件mounted生命周期前，才会触发当前销毁组件的unmounted
 
  errorCaptured(err, instance, info){
    // 捕获来自后代组件的错误时被调用。（ 注意是当前的组件所有后代组件！ ）
    // 此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
    console.log(err, instance, info,'errorCaptured')
    // 此钩子可以返回 false 以阻止该错误继续向上传播。
    return false // 如果我在main.ts里对 vue实例 设置了 `app.config.errorHandler=()=>{}`，此处return false则不会触发errorHandler
  },
})
</script>