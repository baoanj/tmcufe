<template lang="html">
  <div>
    <markdown-editor
      :value="answer"
      @change="(val) => answer = val"
    />
    <br />
    <upload-files :files="fileList" @change="val => fileList = val" />
      <br />
    <div class="submit-btn">
      <el-button @click="resetAnswer">清空</el-button>
      <el-button
        v-if="editing"
        type="primary"
        :loading="loading"
        @click="updateAnswer"
      >提交</el-button>
      <el-button
        v-else
        type="primary"
        :loading="loading"
        @click="submitAnswer"
      >提交</el-button>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadFiles from '@/components/UploadFiles';
import SimpleFormData from '@/utils/simpleFormData';
import utils from '@/utils';
import { submitHw, updateAnswerApi } from '../api';

export default {
  name: 'SubmitHomework',
  components: {
    MarkdownEditor,
    UploadFiles,
  },
  props: {
    classId: {
      type: String,
      default: '',
    },
    createDate: {
      type: String,
      default: Date.now(),
    },
    text: {
      type: String,
      default: Date.now(),
    },
    files: {
      type: Array,
      default() {
        return [];
      },
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      answer: this.text,
      fileList: this.files,
      loading: false,
    };
  },
  methods: {
    submitAnswer() {
      const formData = new SimpleFormData({
        files: this.fileList,
        answer: this.answer,
        date: Date.now(),
      });
      this.loading = true;
      submitHw(this.classId, this.createDate, formData)
        .then(() => {
          this.loading = false;
          this.$emit('fetchData');
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    updateAnswer() {
      const realFileList = this.fileList.filter(item => utils.isFile(item));
      const existFiles = this.fileList.filter(item => utils.isPureObject(item));
      const formData = new SimpleFormData({
        files: realFileList,
        existFiles: JSON.stringify(existFiles),
        answer: this.answer,
        date: Date.now(),
      });
      this.loading = true;
      updateAnswerApi(this.classId, this.createDate, formData)
        .then(() => {
          this.loading = false;
          this.$emit('fetchData');
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    resetAnswer() {
      this.answer = '';
      this.fileList = [];
    },
  },
};
</script>

<style lang="css">
</style>
