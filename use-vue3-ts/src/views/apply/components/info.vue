<template>
    <div class="block-double-row-info">
        <div class="div-wrap">
            <div class="title">公司信息  </div>
            <van-cell-group >
                <van-field v-model="formInfo.companyName" :disabled="true" label="公司名称"  placeholder="请输入"/>
                <van-field v-model="formInfo.legalPerson" :disabled="true" label="法人代表" placeholder="请输入"/>
                <van-field v-model="formInfo.registerDate" :disabled="false"  is-link readonly label="注册日期" @click="showCalendar = true" />
              
            </van-cell-group>
        </div>
 
           
        <div class="div-wrap">
            <div class="title">水平 </div>
            <van-cell-group>
                <van-field v-model="formInfo.sciIdenty" :disabled="true" readonly label="企业认定" placeholder="请选择"   @click="showIdentyPicker = true"/>
                <van-field v-model="formInfo.receiveInvest"  :disabled="false" label="获得投资" placeholder="请输入"/>
                <van-field v-model="taxCreditLevelName" :disabled="false" readonly label="信用评级" placeholder="请选择"  @click="showLevelPicker = true"/>
            </van-cell-group>
        </div>

        <div class="apply-wrap">
          <div class="apply-btn" :class="{'active': !aplBtnObj.disabled}" @click="handleApply()">{{aplBtnObj.text}}</div>
        </div>

      <van-calendar  v-model:show="showCalendar" @confirm="onConfirmCalendar" />
      <popPicker title="信用评级" :showPicker="showLevelPicker" :options="levelColumns"  @show="onChangeLevelShow"  @confirm="onLevelConfirm"/>
      <popMultiPicker title="企业认定" :defValue="sciIdentyPickerValue" :showPicker="showIdentyPicker"  :options="sciIdentyColumns" @show="onChangeIdentyShow" @confirm="onIdentyConfirm" />
    </div>
</template>


<script lang="ts" setup>
    import {sciIdentyColumns,levelColumns} from  '../config/selectData.js'
    import popMultiPicker from '@/components/popupMultiPicker/index'
    import popPicker from '@/components/popupPicker/index'
 
    const route = useRoute();

    const props = defineProps<{
        baseInfo: any,
        isInfoSubmited:boolean
    }>()
   const emit = defineEmits<{
    (e: 'submit', id: any): void
    }>()



    /***表单数据***/
    let formInfo = reactive({});
    //form表单数据合并
    watchEffect(()=>{
        console.log('watch-----baseInfo',props.baseInfo)
        Object.assign(formInfo,props.baseInfo||{})  
        console.log(formInfo)
    })


    /***申请按钮***/
    const aplBtnObj = reactive({
        disabled:false,
        text:"立即查询"
    })
    watchEffect(()=>{
        if(props.isInfoSubmited){
           aplBtnObj.disabled = false;
           aplBtnObj.text = '查看申请'
        } 
    })
    const handleApply = ()=>{
        emit('submit',formInfo)
        console.log('submit-baseInfo')
    }



    //企业认定情况
    const showIdentyPicker = ref(false);
    const sciIdentyPickerValue = computed(() =>formInfo.sciIdenty?formInfo.sciIdenty.split(','):[])
    const onChangeIdentyShow = (e)=>{
      showIdentyPicker.value = false;
    }
    const onIdentyConfirm = (item)=>{
         formInfo.sciIdenty = Object.values(item).join(',');
         showIdentyPicker.value  = false;
    }
    
 


    //信用评级
    const showLevelPicker = ref(false);
    const taxCreditLevelName = computed(() => {
        if(formInfo.taxCredit||formInfo.taxCredit===0){
           let ct = levelColumns.find((item:{label: string, value: number})=> item.value == formInfo.taxCredit) 
             return ct.label;
        }else{
            return ''
        }
    })
    const onLevelConfirm = (item)=>{
        formInfo.taxCredit = item.value;
        showLevelPicker.value = false;
    }
    const onChangeLevelShow = (e)=>{
       showLevelPicker.value  = false
    }
  

    //注册日期
    const showCalendar = ref(false);
    const formatDate = (date:Date) => `${new Date(date).Format('yyyy/MMM/dd')}`;
    const onConfirmCalendar = (value:Date)=>{
        showCalendar.value = false;
        formInfo.registerDate = formatDate(value);
    }
      
    
</script>

<style lang="less" scoped>
    @import '~assets/init.less';
    .block-double-row-info{
        :deep(.van-field) {
             display: block !important;
            .van-field__label{
                 width:100%;
            }
        }
       
    }
    .div-wrap {
        min-height: 50px;
        padding: 0px;
        background: #fff;
        margin-bottom: 8px;

        .title {
            font-size: 18px;
            font-weight: 600;
             margin-bottom: 6px;
            height: 57px;
            line-height: 55px;
            padding: 0px 16px;
            background: #FFFFFF;
            text-align: left;
            box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.12);
        }
        
        .van-cell-group{
            // padding: 0px 16px;
        }
    }

       .apply-wrap {
        position: fixed;
        bottom: 0px;
        width: 100%;
        padding: 12px 16px;
        text-align: center;
        background: #fff;
        .apply-btn {
            height: 43px;
            line-height: 43px;
            background: #f0f1f3;
            color: #CDD0D7;
            font-size:18px;
            &.active {
                background: #306CFF;
                color: #fff
            }
        }
    }
</style>
