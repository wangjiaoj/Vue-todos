<template>
   vue2与vue3中生命周期执行顺序的区别
  <h1>App父级组件</h1>
  <button @click="childShow = !childShow">切换child子组件的显示</button>
  <hr />
  <childItem v-if="childShow" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
//引入子组件
import childItem from "./components/childItem.vue";
export default defineComponent({
  name: "App",
  components: {
    childItem,
  },

  setup() {
 
    const childShow = ref(true);

    return {
      childShow,
    };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

