<template lang="html">
  <div v-if="user.name && homework.createDate">
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
        <span>状态: {{ expired | status }}</span>
      </p>
      <file-list :files="homework.files" />
      <el-button @click="hwAnswerDialogVisible = true">查看答案</el-button>
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
          <el-button v-if="!homework.submissions[0].checked">撤销提交</el-button>
        </p>
        <p>
          <span>姓名: {{ homework.submissions[0].stuName }}</span>
          <span>学号: {{ homework.submissions[0].stuId }}</span>
          <span>提交时间: {{ homework.submissions[0].date }}</span>
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
      :dialogVisible="hwAnswerDialogVisible"
      :hwAnswer="hw.hwAnswer"
      :classId="$route.params.classId"
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
      hwAnswerDialogVisible: false,
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
  },
  filters: {
    status(val) {
      if (val === 0) {
        return '未开始';
      } else if (val === 1) {
        return '已截止';
      }
      return '进行中';
    },
  },
};
</script>

<style lang="css">
</style>
