<template lang="html">
  <van-popup
    :show="showPicker" 
    @click-overlay="close" 
    position="bottom"
  >
      <div class="button-row">
          <span  @click="onComfirm">确定</span>
          <span>{{title}}</span>
          <span  @click="close">取消</span>
      </div>
      <div class="group-list">
        <van-checkbox-group :value="value">
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
              <!-- <van-checkbox :name="item.value" ref="checkboxes"  @click.stop/> -->
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
    value: {
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
  // setup(){

  // }
  methods: {
    close() {
      this.$emit('show', false);
    },
    toggle(index) {
      let first = this.$refs.checkboxes[0];
        console.log(`first.checked.value:${first.checked.value},toggle:${!first.checked.value}` )
        first.toggle(!first.checked.value)
        //first.toggle(!first.checked.value)
      // console.log(this.$refs.checkboxes.find((item) => item.name === index).toggle)
      this.$refs.checkboxes.find((item) => item.name === index).toggle()
    },
    onComfirm(){
      this.$refs.checkboxes.map(item=>{
        console.log(` item.name:${ item.name}, item.value:${item.checked.value}`)
      })
      console.log( this.value)
       
      //  this.$emit('show', false);
    }
  },
  watch: {
    result(newVal) {
      console.log(newVal)
    }
  }
}
</script>

<style lang="less" scoped>
.button-row{
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
