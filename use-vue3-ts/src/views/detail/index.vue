<template>
  <div class="detail-page">
    <h2>标题：{{text}}</h2>
    <p>用户名：{{userInfo.name}}</p>
    <p>用户角色：{{userInfo.role}}</p>
    <h3>列表：</h3>
    <div class="list-item" v-for="item in list" :key="item.id" @click="goApply(item)">{{item.address}}</div>
  
  </div>
</template>

<script lang="ts">
import useSomeData from './useSomeData' 
export default defineComponent({
  components:{
  },
  setup(props,context) {
      // 现在userInfo和projectList都已经被ref包裹了一层
      // 这层包裹会在template中自动解开
     const { userInfo, projectList } = useSomeData()
     let text = ref("my活动");
     let router = useRouter();
     const goApply = (item:any)=>{
         router.push({
           path:'apply',
           params:{
             id:item.id
           }
         })
     }
      return {
        text,
        userInfo,
        /**
         * 不要随便解构响应式对象,
         * 或者从响应式对象中取参数直接当作一个响应式对象
         * 都会导致丧失响应性
        */
        
        list: projectList ,
        goApply
      } 
  }
})
</script>
<style lang="less" scoped>
@import '~@/assets/init.less';
 .detail-page{
   text-align: left;
   height: 100%;
   overflow-y: auto;
   .common_scroll_bar();
   width:345px;
   margin: 0 auto;
   font-size: 14px;
 }
 h2{
   font-size: 20px;
 }
 h3{
   font-size: 18px;
 }
  p{
     font-size: 16px;
  }
 .list-item{
  width:345px;
  height: 50px;
  background: #1890ff;
  color: #fff;
  margin-bottom:10px;
  padding:10px 20px;
  text-align:left;
 }
</style>
