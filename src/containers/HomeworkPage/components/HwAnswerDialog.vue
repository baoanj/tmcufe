<template lang="html">
  <el-dialog title="答案" width="80%" :visible="dialogVisible" @close="closeDialog">
    <markdown-editor
      :value="ruleForm.description"
      @change="(val) => ruleForm.description = val"
    />
    <upload-files :files="fileList" @change="val => fileList = val" />
  </el-dialog>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadFiles from '@/components/UploadFiles';
import FileList from '@/components/FileList';
import SimpleFormData from '@/utils/simpleFormData';
import { submitHwAnswer } from '../api';

export default {
  name: 'AddHomeworkDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    classId: {
      type: String,
      default: '',
    },
    hwAnswer: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    MarkdownEditor,
    UploadFiles,
    FileList,
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    submitForm() {
      const formData = new SimpleFormData({
        files: this.fileList,
        createDate: Date.now(),
        title: this.ruleForm.title,
        description: this.ruleForm.description,
        beginDate: this.ruleForm.beginDate.getTime(),
        endDate: this.ruleForm.endDate.getTime(),
      });
      submitHwAnswer(this.classId, formData).then(() => {
        this.$emit('hideDialog');
        this.$emit('fetchData');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    closeDialog() {
      this.resetForm('ruleForm');
      this.$emit('hideDialog');
    },
  },
};
</script>

<style lang="css" scoped>
.submit-btn {
  float: right;
}
</style>
