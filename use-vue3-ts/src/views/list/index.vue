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
      <ListItem v-for="(item,index) in list.data" :key="index" :data="item"></ListItem>
    </div>
   
  </div>
</template>

<script lang="ts" setup>
  import ListItem from './components/listItem';
  import useDataList from './useDataList';
  import {get_surveyData} from '@/api/list/index'; 
  import type {listType} from './types';
  const edit = ref(null);
  let text = ref("my活动");
  const {userInfo,fileName} =  useDataList();
  const list:listType = reactive({
    data: []
  })
  onMounted(() => {
    console.log('edit',edit);
    get_surveyData().then((res:any)=>{
        list.data = res.list; 
        console.log('reactive',list);
    }).catch()
  })
      
   
 
</script>
<style lang="less">

@import './styl/index.less'  ;
</style>
