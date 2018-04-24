<template lang="html">
  <fullscreen-dialog
    :title="`${submission.stuName}(${submission.stuId})提交详情`"
    :visible="visible"
    @close="closeDialog"
  >
    <div>
      <p v-if="submission.checked">
        <el-tag size="small">已审阅</el-tag>
        <span>反馈结果: {{ submission.feedback || '无' }}</span>
      </p>
      <p v-else><el-tag type="warning" size="small">未审阅</el-tag></p>
    </div>
    <br />
    <p>提交时间: {{ formateDate(submission.date) }}</p>
    <div>
      <markdown-editor
        :value="submission.answer"
        :edit="false"
      />
      <file-list :files="submission.files" />
    </div>
    <br />
    <div v-if="!submission.checked">
      <div>
        <p>填写反馈:</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10}"
          placeholder="请输入反馈（可选）"
          v-model="feedback">
        </el-input>
      </div>
      <br />
      <div class="submit-btn">
        <el-button type="primary" :loading="loading" @click="submitFeedback">提交</el-button>
      </div>
    </div>
  </fullscreen-dialog>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import FileList from '@/components/FileList';
import FullscreenDialog from '@/components/FullscreenDialog';
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
    FullscreenDialog,
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
      loading: false,
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
      this.loading = true;
      checkStuSub(
        this.classId,
        this.createDate,
        this.submission.userId,
        this.feedback,
      ).then(() => {
        this.loading = false;
        this.visible = false;
        this.$emit('fetchData');
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error);
      });
    },
    formateDate(timestamp) {
      return timestamp ? utils.formateDate(+timestamp) : '--';
    },
  },
};
</script>

<style lang="css" scoped>
</style>
