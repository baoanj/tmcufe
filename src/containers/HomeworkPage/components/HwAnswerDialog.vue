<template lang="html">
  <el-dialog title="答案" width="80%" :visible="visible" @close="closeDialog">
    <div v-if="user.role === 'student'">
      <div v-if="staticAnswer || staticFileList.length">
        <markdown-editor
          v-if="staticAnswer"
          :value="staticAnswer"
          :edit="false"
        />
        <file-list :files="staticFileList" />
      </div>
      <p v-else>暂无答案</p>
    </div>
    <div v-if="user.role === 'teacher'">
      <div v-if="!editable && (staticAnswer || staticFileList.length)">
        <markdown-editor
          :value="staticAnswer"
          :edit="false"
        />
        <file-list :files="staticFileList" />
        <el-button @click="editable = true">编辑</el-button>
        <el-button @click="deleteAnswer" :loading="loading">
          {{ loading ? '删除中...' : '删除'}}
        </el-button>
      </div>
      <div v-else>
        <markdown-editor
          :value="answer"
          @change="(val) => answer = val"
        />
        <upload-files :files="fileList" @change="val => fileList = val" />
        <el-button @click="submitHwAnswer" :loading="loading">
          {{ loading ? '提交中...' : '提交' }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadFiles from '@/components/UploadFiles';
import FileList from '@/components/FileList';
import SimpleFormData from '@/utils/simpleFormData';
import utils from '@/utils';
import { uploadHwAnswer, deleteHwAnswer } from '../api';

export default {
  name: 'AddHomeworkDialog',
  props: {
    classId: {
      type: String,
      default: '',
    },
    createDate: {
      type: String,
      default: '',
    },
  },
  computed: mapState([
    'user',
  ]),
  components: {
    MarkdownEditor,
    UploadFiles,
    FileList,
  },
  data() {
    return {
      answer: '',
      staticAnswer: '',
      fileList: [],
      staticFileList: [],
      editable: false,
      visible: false,
      loading: false,
    };
  },
  methods: {
    show(hwAnswer) {
      this.answer = hwAnswer.answer;
      this.staticAnswer = hwAnswer.answer;
      this.fileList = hwAnswer.files.map(item => ({
        name: item.name,
        filename: item.filename,
      }));
      this.staticFileList = hwAnswer.files.map(item => ({
        name: item.name,
        filename: item.filename,
      }));
      this.editable = false;
      this.visible = true;
    },
    submitHwAnswer() {
      const realFileList = this.fileList.filter(item => utils.isFile(item));
      const existFiles = this.fileList.filter(item => utils.isPureObject(item));
      const formData = new SimpleFormData({
        files: realFileList,
        existFiles: JSON.stringify(existFiles),
        answer: this.answer,
      });
      this.loading = true;
      uploadHwAnswer(this.classId, this.createDate, formData).then(() => {
        this.visible = false;
        this.loading = false;
        this.$emit('fetchData');
        this.$message.success('上传成功');
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error);
      });
    },
    deleteAnswer() {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.loading = true;
        deleteHwAnswer(this.classId, this.createDate).then(() => {
          this.visible = false;
          this.loading = false;
          this.$emit('fetchData');
          this.$message.success('删除成功');
        }).catch((error) => {
          this.loading = false;
          this.$message.error(error);
        });
      }).catch(() => {});
    },
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>

<style lang="css" scoped>
.submit-btn {
  float: right;
}
</style>
