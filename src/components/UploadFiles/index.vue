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
    <ul>
      <li
        :key="file.name"
        v-for="file in files"
      >{{ file.name }}<span @click="removeFile(file.name)"> x</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UploadFiles',
  props: {
    files: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      fileList: this.files,
    };
  },
  watch: {
    fileList(newVal) {
      this.$emit('change', newVal);
    },
    files(newVal) {
      this.fileList = newVal;
    },
  },
  methods: {
    customUpload({ file }) {
      for (let i = 0; i < this.fileList.length; i += 1) {
        if (this.fileList[i].name === file.name) {
          this.$message.error('文件已存在');
          return;
        }
      }
      if (file.size > 10 * 1024 * 1024) {
        this.$message.error('文件不能大于10M');
        return;
      }
      if (this.fileList.length >= 10) {
        this.$message.error('最多只能上传10个文件');
        return;
      }
      this.fileList.push(file);
    },
    removeFile(name) {
      this.fileList = this.fileList.filter(item => item.name !== name);
    },
  },
};
</script>

<style lang="css">
</style>
