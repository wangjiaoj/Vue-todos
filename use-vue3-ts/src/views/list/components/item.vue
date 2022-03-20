<template>
  <div class="list-item" @click="goDetail">
    <h2>{{data.title}}</h2>
    <div>地址：{{data.address}}</div>
    <div><label for="">开始时间:{{data.ctime}}</label>
    <span>截止时间:{{data.etime}}</span>   </div>
      
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
      const goDetail = ()=>{
        router.push({
          path:'detail',
        })
      }
       // 暴露给 template
      return{
        goDetail
      }
  }
})
</script>
<style>
 
</style>
<style lang="less">
.list-item{
  width:345px;
  height: 150px;
  background: #1890ff;
  color: #fff;
  margin-bottom:10px;
  padding:10px 20px;
  text-align:left;
  h2{
    font-size: 18px;
    padding: 10px 0px;
  }
  div{
     font-size: 14px;
      padding: 10px 0px;
      span{
        float: right;
      }
  }
}

</style>