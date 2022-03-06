<template>
  <div class="home">
    {{text}}
    <Item v-for="(item,index) in list" :key="index" :data="item"></Item>
  </div>
</template>

<script lang="ts">
 
import {ref,defineComponent}from 'vue';
import {useRouter, useRoute } from 'vue-router'
import Item from './components/index.vue';
export default defineComponent({
  components:{
  'Item':Item
  },
  setup(props) {
      const router = useRouter()
      const route = useRoute()
      let text = ref("你好");
      let list = ref([{title:"product001",detail:"my detail story"},
      {title:"product001",detail:"my detail story"},
      {title:"product001",detail:"my detail story"}])
      return{
        router,
        route,
        text,
        list
      }
  }
})
</script>
