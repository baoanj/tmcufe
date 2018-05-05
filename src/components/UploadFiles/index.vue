<template lang="html">
  <div>
    <el-upload
      action="\\"
      drag
      :show-file-list="false"
      :http-request="customUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip">最多可上传10个文件，每个不能超过10M</div>
    </el-upload>
    <ul class="file-list">
      <li
        class="tmcu-text"
        :key="file.name"
        v-for="file in files"
      >
        <i class="el-icon-document"></i>
        <span>{{ file.name }}</span>
        <span class="tmcu-btn" @click="removeFile(file.name)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UploadFiles',
  model: {
    prop: 'files',
    event: 'change',
  },
  props: {
    files: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    customUpload({ file }) {
      for (let i = 0; i < this.files.length; i += 1) {
        if (this.files[i].name === file.name) {
          this.$message.error('文件已存在');
          return;
        }
      }
      if (file.size > 10 * 1024 * 1024) {
        this.$message.error('文件不能大于10M');
        return;
      }
      if (this.files.length >= 10) {
        this.$message.error('最多只能上传10个文件');
        return;
      }
      this.$emit('change', this.files.concat(file));
    },
    removeFile(name) {
      this.$emit('change', this.files.filter(item => item.name !== name));
    },
  },
};
</script>

<style lang="css" scoped>
.file-list {
  list-style: none;
}
</style>
