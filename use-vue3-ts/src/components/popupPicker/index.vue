<template lang="html">

    <van-popup
        :show="showPicker" 
        @click-overlay="close" 
        position="bottom"
    >
        <van-picker
        :title="title"
        :columns="labels"
        @cancel="close"
        @confirm="onConfirm"
        />
    </van-popup>

 
</template>

<script>
export default {
  props: {
    showPicker: Boolean,
    disabled: Boolean,
    title: String,
    options: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data(){
      return{
      }
  },
  methods: {
    close() {
      this.$emit('show', false);
    },
    onConfirm(label, index) {
       this.$emit('confirm', this.options[index]);
    },
  },
  computed: {
    labels() {
      return this.options.map(item => item.label)
    },
   
  }
}
</script>

<style lang="less">
</style>
