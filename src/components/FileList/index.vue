<template lang="html">
  <ul>
    <li :key="file.filename" v-for="file in files">
      <a
        :href="`/api/general/download/${file.filename}/${file.name}`"
      >{{ file.name }}</a>
    </li>
  </ul>
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

<style lang="css">
</style>
