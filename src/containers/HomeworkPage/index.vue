<template lang="html">
  <div v-if="user.name && homework.createDate">
    <vue-headful
      title="高校教学管理系统 | 作业"
    />
    <div>
      <router-link :to="`/class/${$route.params.classId}`">回班级主页</router-link>
    </div>
    <div>
      <p>{{ homework.title }}</p>
      <markdown-editor
        :value="homework.description"
        :edit="false"
      />
      <p>
        <span>创建时间: {{ formateDate(homework.createDate) }}</span>
        <span>开始时间: {{ formateDate(homework.beginDate) }}</span>
        <span>结束时间: {{ formateDate(homework.endDate) }}</span>
        <span>状态: {{ expired | hwStatus }}</span>
      </p>
      <file-list :files="homework.files" />
      <el-button @click="showHwAnswerDialog()">
        {{ user.role | answerStatus(homework.hwAnswer.answer, homework.hwAnswer.files.length) }}
      </el-button>
    </div>
    <div v-if="user.role === 'teacher'">
      <p>提交人数: {{ homework.submissions.length }}</p>
      <submissions-table
        :submissions="homework.submissions"
        :classId="$route.params.classId"
        :createDate="homework.createDate"
        @fetchData="fetchData"
      />
    </div>
    <div v-if="user.role === 'student'">
      <div v-if="homework.submissions.length">
        <p>
          <span>已提交</span>
          <el-button v-if="!homework.submissions[0].checked && expired === 2">编辑</el-button>
          <el-button v-if="!homework.submissions[0].checked && expired === 2">撤销</el-button>
        </p>
        <p>
          <span>姓名: {{ homework.submissions[0].stuName }}</span>
          <span>学号: {{ homework.submissions[0].stuId }}</span>
          <span>提交时间: {{ formateDate(homework.submissions[0].date) }}</span>
        </p>
        <div>
          <p v-if="homework.submissions[0].checked">
            <span>老师已审阅</span>
            <span>反馈结果: {{ homework.submissions[0].feedback || '无' }}</span>
          </p>
          <p v-else>老师还未审阅</p>
        </div>
        <p>提交详情</p>
        <markdown-editor
          :value="homework.submissions[0].answer"
          :edit="false"
        />
        <file-list :files="homework.submissions[0].files" />
      </div>
      <div v-else>
        <p>未提交</p>
        <submit-homework
          v-if="expired === 2"
          :classId="$route.params.classId"
          :createDate="homework.createDate"
          @fetchData="fetchData"
        />
      </div>
    </div>
    <hw-answer-dialog
      ref="hwAnswerDialogRef"
      :classId="$route.params.classId"
      :createDate="homework.createDate"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MarkdownEditor from '@/components/MarkdownEditor';
import FileList from '@/components/FileList';
import utils from '@/utils';
import { getHwSubsData } from './api';
import SubmissionsTable from './components/SubmissionsTable';
import SubmitHomework from './components/SubmitHomework';
import HwAnswerDialog from './components/HwAnswerDialog';

export default {
  name: 'HomeworkPage',
  created() {
    this.fetchData();
  },
  components: {
    SubmissionsTable,
    SubmitHomework,
    MarkdownEditor,
    FileList,
    HwAnswerDialog,
  },
  computed: {
    expired() {
      if (this.homework.beginDate > Date.now()) {
        return 0;
      } else if (this.homework.endDate < Date.now()) {
        return 1;
      }
      return 2;
    },
    ...mapState([
      'user',
    ]),
  },
  data() {
    return {
      homework: {
        createDate: '',
        beginDate: '',
        endDate: '',
        title: '',
        description: '',
        submissions: [],
        files: [],
        hwAnswer: {
          answer: '',
          files: [],
        },
      },
    };
  },
  methods: {
    fetchData() {
      getHwSubsData(this.$route.params.classId, this.$route.params.createDate)
        .then((data) => {
          this.homework = data;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
    showHwAnswerDialog() {
      this.$refs.hwAnswerDialogRef.show(this.homework.hwAnswer);
    },
  },
  filters: {
    hwStatus(val) {
      if (val === 0) {
        return '未开始';
      } else if (val === 1) {
        return '已截止';
      }
      return '进行中';
    },
    answerStatus(role, answer, length) {
      if (answer || length) {
        return '查看答案';
      } else if (role === 'student') {
        return '暂无答案';
      }
      return '上传答案';
    },
  },
};
</script>

<style lang="css">
</style>
