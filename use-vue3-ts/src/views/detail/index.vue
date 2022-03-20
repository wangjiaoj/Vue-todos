<template>
  <div class="detail-page">
    <p>{{text}}</p>
    <p>{{name}}</p>
    <span>{{role}}</span>
    <div v-for="item in list" :key="item.id">{{item.id}}</div>
  
  </div>
</template>

<script lang="ts">
 
import {ref,reactive,defineComponent,onMounted}from 'vue';
import {useRouter, useRoute } from 'vue-router'
import useSomeData from './useSomeData' 
export default defineComponent({
  components:{
  },
  setup(props,context) {
      const router = useRouter()
      const route = useRoute()
      // 现在userInfo和projectList都已经被ref包裹了一层
      // 这层包裹会在template中自动解开
     const { userInfo, projectList } = useSomeData()
     let text = ref("my活动");
      return {
        text,
        name: userInfo.value.name, // ???好了吗

        role: userInfo.value.role, // ???好了吗

        list: projectList // ???好了吗

      } 
  }
})
</script>
<style lang="less">
 
</style>
