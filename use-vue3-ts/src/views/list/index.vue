<template>
  <div class="list-page">
    <div>

    {{userInfo.name}}
    {{fileName}}
    </div>
    <div ref="edit" class="list-bg">
        <h2>{{text}}</h2>
        <div class="search-container">
          <van-search placeholder="请输入"></van-search>
        </div>      
    </div>
    <div class="list">
      <Item v-for="(item,index) in list.data" :key="index" :data="item"></Item>
    </div>
   
  </div>
</template>

<script lang="ts">
 
import {ref,reactive,defineComponent,onMounted}from 'vue';
import Item from './components/item.vue';
import useDataList from './useDataList';
import {get_surveyData} from '@/api/list/index'; 

export default defineComponent({
  components:{
  'Item':Item
  },
  setup(props,context) {
    const edit = ref(null);
    let text = ref("my活动");
    const {userInfo,fileName} =  useDataList();
    const data = [{title:"product001",detail:"my detail story"},
    {title:"product002",detail:"my detail story"},
    {title:"product003",detail:"my detail story"}]
    const list = reactive({
     data: data
    })
    onMounted(() => {
      console.log('edit',edit);
      get_surveyData().then((res:any)=>{
          list.data = res.list; 
          console.log('reactive',list);
      }).catch()
    })
      
      return{
        text,
        list,
        userInfo,fileName,
        edit
      }
  }
})
</script>
<style lang="less">

@import './styl/index.less'  ;
</style>
