<template>
  <div class="home">
    <h2>{{data.title}}</h2>
    <div>{{data.detail}}</div>
    {{text}}
  </div>
</template>

<script lang="ts">
 
import {ref,defineComponent}from 'vue';
import {useRouter, useRoute } from 'vue-router'
export default defineComponent({
    props:["data"],
    setup(props) {
      const router = useRouter()
      const route = useRoute()
      let text = ref("你好");
       // 暴露给 template
      return{
        router,
        route,
        text
      }
  }
})
</script>
