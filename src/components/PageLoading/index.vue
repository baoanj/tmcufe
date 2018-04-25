<template lang="html">
  <div v-loading="loading" class="page-loading">
    <div v-if="error" class="app-logo"></div>
  </div>
</template>

<script>
export default {
  name: 'PageLoading',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="css" scoped>
.page-loading {
  width: 100%;
  height: calc(100vh - 100px);
}

.app-logo {
  width: 100%;
  height: 100%;
  background-image: url('/static/logo.png');
  background-position: center;
  background-repeat: no-repeat;
}
</style>
