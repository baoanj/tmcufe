<template lang="html">
  <el-dialog
    :title="title"
    :fullscreen="true"
    :center="true"
    :visible="visible"
    :show-close="false"
  >
    <slot></slot>
    <el-button
      class="close"
      type="primary"
      icon="el-icon-close"
      circle
      @click="$emit('close')"
    ></el-button>
  </el-dialog>
</template>

<script>
export default {
  name: 'FullscreenDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="css" scoped>
.close {
  position: fixed;
  top: 20px;
  left: 20px;
}
</style>
