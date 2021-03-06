<template lang="html">
  <div>
    <vue-headful
      :title="$route.meta.title"
    />
    <page-loading v-if="loading || error" :loading="loading" :error="error" />
    <div v-if="!loading && !error && $store.state.user.email && homework.createDate">
      <div class="hw-box">
        <div class="custom-card">
          <p>
            <breadcrumb
              class="breadcrumb"
              :paths="[
                { name: '主页', to: '/' },
                { name: '班级', to: `/class/${$route.params.classId}` },
                { name: '作业' },
              ]"
            />
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
                answerStatus(homework.hwAnswer.answer, homework.hwAnswer.files.length, isTA) }}
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
      <div v-if="$store.state.user.role === 'teacher' || isTA">
        <p class="tmcu-text">共 {{ homework.submissions.length }} 人提交</p>
        <submissions-table
          :submissions="homework.submissions"
          :classId="$route.params.classId"
          :createDate="homework.createDate"
          @fetchData="fetchData"
        />
      </div>
      <div v-if="$store.state.user.role === 'student' && !isTA">
        <div v-if="homework.submissions.length">
          <p class="tmcu-text">
            <el-tag size="small">已提交</el-tag>
            <span v-if="!homework.submissions[0].checked && expired === 2">
              <el-button type="text" @click="editingSub = homework.submissions[0]">编辑</el-button>
            </span>
            <span v-if="!homework.submissions[0].checked && expired === 2">
              <el-button type="text" :loading="cancelLoading" @click="deleteHwSub">撤销</el-button>
            </span>
          </p>
          <p class="tmcu-text">
            <span>提交时间: {{ formateDate(homework.submissions[0].date) }}</span>
          </p>
          <div class="tmcu-text">
            <p v-if="homework.submissions[0].checked">
              <el-tag size="small">已审阅</el-tag>
              <span>反馈结果: {{ homework.submissions[0].feedback || '无' }}</span>
            </p>
            <p v-else><el-tag type="warning" size="small">未审阅</el-tag></p>
          </div>
          <div v-if="editingSub">
            <p>
              <span class="tmcu-text">正在修改已提交作业</span>
              <el-button type="text" @click="editingSub = null">放弃修改</el-button>
            </p>
            <br />
            <submit-homework
              :classId="$route.params.classId"
              :createDate="homework.createDate"
              :text="editingSub.answer"
              :files="editingSub.files"
              :editing="true"
              :draft="homework.draft"
              @fetchData="fetchData"
              @fetchDataByDraft="fetchDataByDraft"
            />
          </div>
          <div v-else>
            <p class="tmcu-text">提交详情:</p>
            <br />
            <markdown-editor
              :value="homework.submissions[0].answer"
              :edit="false"
            />
            <file-list :files="homework.submissions[0].files" />
          </div>
        </div>
        <div v-else>
          <p><el-tag type="danger" size="small">未提交</el-tag></p>
          <br />
          <submit-homework
            v-if="expired === 2"
            :classId="$route.params.classId"
            :createDate="homework.createDate"
            text=""
            :files="[]"
            :editing="false"
            :draft="homework.draft"
            @fetchData="fetchData"
            @fetchDataByDraft="fetchDataByDraft"
          />
        </div>
      </div>
      <hw-answer-dialog
        ref="hwAnswerDialogRef"
        :classId="$route.params.classId"
        :createDate="homework.createDate"
        :isTA="isTA"
        @fetchData="fetchData"
      />
      <edit-homework-dialog
        ref="editHomeworkDialogRef"
        :classId="$route.params.classId"
        :createDate="homework.createDate"
        @fetchData="fetchData"
      />
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import FileList from '@/components/FileList';
import PageLoading from '@/components/PageLoading';
import Breadcrumb from '@/components/Breadcrumb';
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
    PageLoading,
    Breadcrumb,
  },
  computed: {
    expired() {
      if (this.homework.beginDate && this.homework.beginDate > Date.now()) {
        return 0;
      } else if (this.homework.endDate && this.homework.endDate < Date.now()) {
        return 1;
      }
      return 2;
    },
    isTA() {
      const userEmail = this.$store.state.user.email;
      for (let i = 0; i < this.homework.tas.length; i += 1) {
        if (this.homework.tas[i].email === userEmail) return true;
      }
      return false;
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
        tas: [],
        draft: null,
      },
      editingSub: null,
      cancelLoading: false,
      loading: false,
      error: false,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.error = false;
      getHwSubsData(this.$route.params.classId, this.$route.params.createDate)
        .then((data) => {
          this.loading = false;
          this.homework = data;
          this.editingSub = null;
        })
        .catch((error) => {
          this.loading = false;
          this.error = true;
          this.$message.error(error);
        });
    },
    fetchDataByDraft() {
      getHwSubsData(this.$route.params.classId, this.$route.params.createDate)
        .then((data) => {
          this.homework = data;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    deleteHwSub() {
      this.$confirm('确认撤销作业提交？撤销操作不可逆！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.cancelLoading = true;
        deleteHwSubApi(this.$route.params.classId, this.$route.params.createDate)
          .then(() => {
            this.cancelLoading = false;
            this.fetchData();
          })
          .catch((error) => {
            this.cancelLoading = false;
            this.$message.error(error);
          });
      }).catch(() => {});
    },
    formateDate(timestamp) {
      return timestamp ? utils.formateDate(+timestamp) : '--';
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
    answerStatus(role, answer, length, isTA) {
      if (answer || length) {
        return '查看答案';
      } else if (role === 'student' && !isTA) {
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

.breadcrumb {
  float: left;
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
