<template lang="html">
  <van-popup
    :show="showPicker" 
    @click-overlay="close" 
    position="bottom"
  >
      <div class="multi-pop-header">
          <span  @click="onComfirm">确定</span>
          <span>{{title}}</span>
          <span  @click="close">取消</span>
      </div>
      <div class="group-list">
        <van-checkbox-group v-model="value">
          <van-cell-group>
            <van-cell
              v-for="(item) in options"
              clickable
              :key="item.value"
              :title="item.label"
              @click="toggle(item.value)"
            >
            <template #right-icon>
              <van-checkbox
                :name="item.value"
                 ref="checkboxes" 
                @click.stop
              />
          </template>
      
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div> 
  </van-popup>

</template>

<script>
export default {
  props: {
    showPicker: Boolean,
    title: String,
    defValue: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
     return{
       value:[]
     }
  },
  methods: {
    close() {
      this.$emit('show', false);
    },
    toggle(index) {
      this.$refs.checkboxes.find((item) => item.name === index).toggle()
    },
    onComfirm(){
      // this.$refs.checkboxes.map(item=>{
      //   console.log(` item.name:${ item.name}, item.value:${item.checked.value}`)
      // })
     
       this.$emit('confirm', this.value);
    }
  },
  watch: {
    defValue(newData){
       console.log('watch--defValue',newData)
       this.value = newData
    }
  }
}
</script>

<style lang="less" scoped>
.multi-pop-header{
   padding-top:20px; 
   padding-bottom:20px;
   display:flex;
   justify-content: space-around;
  //  align-item:
}
.group-list{
  max-height:400px;
  overflow-y:auto;
}
</style>
