<template lang="html">
  <el-dialog title="学生提交详情" width="80%" :visible="visible" @close="closeDialog">
    <p>
      <span>学生: {{ submission.stuName}}({{ submission.stuId }})</span>
      <span>提交时间: {{ formateDate(submission.date) }}</span>
    </p>
    <div>
      <p>提交内容:</p>
      <markdown-editor
        :value="submission.answer"
        :edit="false"
      />
      <file-list :files="submission.files" />
    </div>
    <div>
      <p v-if="submission.checked">
        <span>已审阅</span>
        <span>反馈结果: {{ submission.feedback || '无' }}</span>
      </p>
      <div v-else>
        <p>未审阅</p>
        <div>
          <p>填写反馈:</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10}"
            placeholder="请输入内容"
            v-model="feedback">
          </el-input>
        </div>
        <div class="submit-btn">
          <el-button type="primary" @click="submitFeedback">提交</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import FileList from '@/components/FileList';
import utils from '@/utils';
import { checkStuSub } from '../api';

export default {
  name: 'ShowStuSubDialog',
  props: {
    classId: {
      type: String,
      default: '',
    },
    createDate: {
      type: String,
      default: Date.now(),
    },
  },
  components: {
    MarkdownEditor,
    FileList,
  },
  data() {
    return {
      visible: false,
      submission: {
        userId: '',
        stuId: '',
        stuName: '',
        email: '',
        date: '',
        answer: '',
        file: '',
        checked: false,
        feedback: '',
      },
      feedback: '',
    };
  },
  methods: {
    closeDialog() {
      this.visible = false;
    },
    show(row) {
      this.visible = true;
      this.submission.userId = row.userId;
      this.submission.stuId = row.stuId;
      this.submission.stuName = row.stuName;
      this.submission.email = row.email;
      this.submission.date = row.date;
      this.submission.answer = row.answer;
      this.submission.files = row.files;
      this.submission.checked = row.checked;
      this.submission.feedback = row.feedback;
    },
    submitFeedback() {
      checkStuSub(
        this.classId,
        this.createDate,
        this.submission.userId,
        this.feedback,
      ).then(() => {
        this.visible = false;
        this.$emit('fetchData');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
