<template lang="html">
  <div v-if="$store.state.user.name && homework.createDate">
    <vue-headful
      title="高校教学管理系统 | 作业"
    />
    <div class="hw-box">
      <div class="custom-card">
        <p>
          <router-link class="card-text-btn" :to="`/class/${$route.params.classId}`">
            <i class="el-icon-arrow-left"></i>
            <span>回班级主页</span>
          </router-link>
          <span class="hw-title">{{ homework.title }}</span>
          <span :class="`hw-stauts-${expired}`">{{ expired | hwStatus }}</span>
          <span v-if="$store.state.user.role === 'teacher'">
            <el-button type="text" @click="showEditHomeworkDialog()">
              <span>编辑作业信息</span>
              <i class="el-icon-edit"></i>
            </el-button>
          </span>
          <span class="hw-answer tmcu-btn" @click="showHwAnswerDialog()">
            {{ $store.state.user.role |
              answerStatus(homework.hwAnswer.answer, homework.hwAnswer.files.length) }}
          </span>
        </p>
        <p>
          <span class="hw-info tmcu-text">创建时间: {{ formateDate(homework.createDate) }}</span>
          <span class="hw-info tmcu-text">开始时间: {{ formateDate(homework.beginDate) }}</span>
          <span class="hw-info tmcu-text">截止时间: {{ formateDate(homework.endDate) }}</span>
        </p>
      </div>
      <markdown-editor
        :value="homework.description"
        :edit="false"
      />
      <file-list :files="homework.files" />
    </div>
    <div v-if="$store.state.user.role === 'teacher'">
      <p class="tmcu-text">共 {{ homework.submissions.length }} 人提交</p>
      <submissions-table
        :submissions="homework.submissions"
        :classId="$route.params.classId"
        :createDate="homework.createDate"
        @fetchData="fetchData"
      />
    </div>
    <div v-if="$store.state.user.role === 'student'">
      <div v-if="homework.submissions.length">
        <p class="tmcu-text">
          <span>已提交</span>
          <span v-if="!homework.submissions[0].checked && expired === 2">
            <el-button type="text" @click="editingSub = homework.submissions[0]">编辑</el-button>
          </span>
          <span v-if="!homework.submissions[0].checked && expired === 2">
            <el-button type="text" :loading="loading" @click="deleteHwSub">撤销</el-button>
          </span>
        </p>
        <p class="tmcu-text">
          <span>姓名: {{ homework.submissions[0].stuName }}</span>
          <span>学号: {{ homework.submissions[0].stuId }}</span>
          <span>提交时间: {{ formateDate(homework.submissions[0].date) }}</span>
        </p>
        <div class="tmcu-text">
          <p v-if="homework.submissions[0].checked">
            <span>老师已审阅</span>
            <span>反馈结果: {{ homework.submissions[0].feedback || '无' }}</span>
          </p>
          <p v-else>老师还未审阅</p>
        </div>
        <div v-if="editingSub">
          <p>
            <span class="tmcu-text">修改已提交作业</span>
            <el-button type="text" @click="editingSub = null">放弃修改</el-button>
          </p>
          <submit-homework
            :classId="$route.params.classId"
            :createDate="homework.createDate"
            :text="editingSub.answer"
            :files="editingSub.files"
            :editing="true"
            @fetchData="fetchData"
          />
        </div>
        <div v-else>
          <p class="tmcu-text">提交详情:</p>
          <markdown-editor
            :value="homework.submissions[0].answer"
            :edit="false"
          />
          <file-list :files="homework.submissions[0].files" />
        </div>
      </div>
      <div v-else>
        <p class="tmcu-text">未提交</p>
        <submit-homework
          v-if="expired === 2"
          :classId="$route.params.classId"
          :createDate="homework.createDate"
          text=""
          :files="[]"
          :editing="false"
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
    <edit-homework-dialog
      ref="editHomeworkDialogRef"
      :classId="$route.params.classId"
      :createDate="homework.createDate"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import FileList from '@/components/FileList';
import utils from '@/utils';
import { getHwSubsData, deleteHwSubApi } from './api';
import SubmissionsTable from './components/SubmissionsTable';
import SubmitHomework from './components/SubmitHomework';
import HwAnswerDialog from './components/HwAnswerDialog';
import EditHomeworkDialog from './components/EditHomeworkDialog';

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
    EditHomeworkDialog,
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
      editingSub: null,
      loading: false,
    };
  },
  methods: {
    fetchData() {
      getHwSubsData(this.$route.params.classId, this.$route.params.createDate)
        .then((data) => {
          this.homework = data;
          this.editingSub = null;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    deleteHwSub() {
      this.loading = true;
      deleteHwSubApi(this.$route.params.classId, this.$route.params.createDate)
        .then(() => {
          this.loading = false;
          this.fetchData();
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error(error);
        });
    },
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
    showHwAnswerDialog() {
      this.$refs.hwAnswerDialogRef.show(this.homework.hwAnswer);
    },
    showEditHomeworkDialog() {
      this.$refs.editHomeworkDialogRef.show(this.homework);
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

<style lang="css" scoped>
.custom-card {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.card-text-btn {
  float: left;
  font-size: 14px;
  text-decoration: none;
  color: #409eff;
  white-space: nowrap;
  transition: all 0.2s;
}

.card-text-btn:hover {
  color: #66b1ff;
}

.hw-box {
  margin-bottom: 20px;
}

.hw-title {
  color: #606266;
  font-size: 20px;
  font-weight: bold;
}

.hw-info {
  padding-left: 10px;
}

.hw-stauts-0 {
  border: 1px solid #E6A23C;
  border-radius: 3px;
  font-size: 14px;
  color: #E6A23C;
  padding: 2px 3px;
}

.hw-stauts-1 {
  border: 1px solid #909399;
  border-radius: 3px;
  font-size: 14px;
  color: #909399;
  padding: 2px 3px;
}

.hw-stauts-2 {
  border: 1px solid #67C23A;
  border-radius: 3px;
  font-size: 14px;
  color: #67C23A;
  padding: 2px 3px;
}

.hw-answer {
  float: right;
}
</style>
