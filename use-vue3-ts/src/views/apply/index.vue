<template>
    <div class="page-info">
        
        <baseInfo :baseInfo="info"   @submit="onSubmit"/>         
     
    </div>
</template>


<script lang="ts" setup>
    import type {infoType} from  './types/index';
    import type resultType from '@/common/types/result'
    import baseInfo from './components/info.vue'
    const route = useRoute();

    
    /***表单数据***/
    let info:infoType = reactive({
        companyName: "22222",  
        legalPerson: "",   
        registerDate: "",  

        sciIdenty: "",  
        receiveInvest: "",  
        taxCreditLevelName: "",  
    });
    //form表单数据合并
    const getData = (res:any)=>{
          Object.assign(info,res.data||{})  
    }
    const onSubmit= (data)=>{
     //todo
    }

 

 
 
      
    
</script>

<style lang="less" scoped>
    @import '~assets/init.less';

    
</style>
