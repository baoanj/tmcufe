<template lang="html">
  <div>
    <span :key="path.name" v-for="(path, index) in paths" class="breadcrumb-item">
      <span v-if="index" class="separator">/</span>
      <span v-if="path.to">
        <router-link class="tmcu-btn" :to="path.to">
          {{ path.name }}
        </router-link>
      </span>
      <span v-else class="tmcu-text">{{ path.name }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    paths: {
      type: Array,
    },
  },
};
</script>

<style lang="css" scoped>
.breadcrumb-item {
  display: inline-block;
  line-height: 16px;
}

.breadcrumb-item > span {
  float: left;
}

.separator {
  color: #c0c4cc;
  margin: 0 2px;
}
</style>
