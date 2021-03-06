<template lang="html">
  <fullscreen-dialog
    title="答案"
    :visible="visible"
    @close="closeDialog"
  >
    <div v-if="$store.state.user.role === 'student' && !isTA">
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
    <div v-if="$store.state.user.role === 'teacher' || isTA">
      <div v-if="!editable && (staticAnswer || staticFileList.length)">
        <div>
          <el-button @click="editable = true">编辑</el-button>
          <el-button @click="deleteAnswer" :loading="loading">
            {{ loading ? '删除中...' : '删除'}}
          </el-button>
        </div>
        <br />
        <markdown-editor
          :value="staticAnswer"
          :edit="false"
        />
        <file-list :files="staticFileList" />
      </div>
      <div v-else>
        <div>
          <el-button
            v-if="staticAnswer || staticFileList.length"
            @click="cancelEdit"
          >取消编辑</el-button>
          <el-button @click="submitHwAnswer" :loading="loading">
            {{ loading ? '提交中...' : '提交' }}
          </el-button>
        </div>
        <br />
        <markdown-editor
          :value="answer"
          @change="(val) => answer = val"
        />
        <br />
        <div>
          <upload-files v-model="fileList" />
        </div>
      </div>
    </div>
  </fullscreen-dialog>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadFiles from '@/components/UploadFiles';
import FileList from '@/components/FileList';
import FullscreenDialog from '@/components/FullscreenDialog';
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
    isTA: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MarkdownEditor,
    UploadFiles,
    FileList,
    FullscreenDialog,
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
    cancelEdit() {
      this.editable = false;
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
