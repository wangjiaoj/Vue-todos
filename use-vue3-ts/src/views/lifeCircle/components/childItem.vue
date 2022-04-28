<template>
  <h2>child 子级组件</h2>
  <h3>{{ name }}</h3>
  <button @click="updateName">更新name</button>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
} from "vue";

export default defineComponent({
  name: "childItem",
  //vue2中的生命周期钩子
  beforeCreate() {
    console.log("child vue2 中的生命周期 beforeCreate");
  },
  created() {
    console.log("child vue2 中的生命周期 created");
  },
  beforeMount() {
    console.log("child vue2 中的生命周期 beforeMount");
  },
  mounted() {
    console.log("child vue2 中的生命周期 mounted");
  },
  beforeUpdate() {
    console.log("child vue2 中的生命周期 beforeUpdate");
  },
  updated() {
    console.log("child vue2 中的生命周期 updated");
  },
  // vue2中的 beforeDestroy与 destroyed已经改名 无法使用
  beforeUnmount() {
    console.log("child vue2 中的生命周期 beforeDestroy(beforeUnmount)");
  },
  unmounted() {
    console.log("child vue2 中的生命周期 destroyed(unmounted)");
  },
  setup() {
    console.log("child vue3中的setup");
    const name = ref("hhh");
    const updateName = () => {
      name.value += "6……6………6";
    };
    onBeforeMount(() => {
      console.log("child vue3 中的生命周期 onBeforeMount");
    });
    onMounted(() => {
      console.log("child vue3 中的生命周期 onMounted");
    });
    onBeforeUpdate(() => {
      console.log("child vue3 中的生命周期 onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("child vue3 中的生命周期 onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("child vue3 中的生命周期 onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("child vue3 中的生命周期 onUnmounted");
    });
    return {
      name,
      updateName,
    };
  },
});
</script>
