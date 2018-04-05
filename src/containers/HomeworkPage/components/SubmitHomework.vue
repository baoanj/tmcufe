<template lang="html">
  <div>
    <markdown-editor
      value="answer"
      @change="(val) => answer = val"
    />
    <upload-files :files="fileList" @change="val => fileList = val" />
    <div class="submit-btn">
      <el-button type="primary" @click="submitAnswer">提交</el-button>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadFiles from '@/components/UploadFiles';
import SimpleFormData from '@/utils/simpleFormData';
import { submitHw } from '../api';

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
      type: Number,
      default: Date.now(),
    },
  },
  data() {
    return {
      answer: '',
      fileList: [],
    };
  },
  methods: {
    submitAnswer() {
      const formData = new SimpleFormData({
        files: this.fileList,
        answer: this.answer,
        date: Date.now(),
      });
      submitHw(this.classId, this.createDate, formData)
        .then(() => {
          this.$emit('fetchData');
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
  },
};
</script>

<style lang="css">
</style>
