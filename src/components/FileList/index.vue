<template lang="html">
  <div>
    <p class="note tmcu-text" v-if="files.length">附件：</p>
    <ul class="file-list">
      <li :key="file.filename" v-for="file in files">
        <a
          class="tmcu-btn"
          :href="`/api/general/download/${file.filename}/${file.name}`"
        >
          <i class="el-icon-document"></i>
          <span>{{ file.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FileList',
  props: {
    files: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
  },
};
</script>

<style lang="css" scoped>
.note {
  font-weight: bold;
}

.file-list {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>
