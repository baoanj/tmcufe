<template lang="html">
  <div>
    <vue-headful
      :title="$route.meta.title"
    />
    <page-loading v-if="loading || error" :loading="loading" :error="error" />
    <div v-if="!loading && !error && $store.state.user.email && classs.classId">
      <div>
        <div class="custom-card">
          <div>
            <breadcrumb class="breadcrumb" :paths="[{name: '主页', to: '/'}, {name: '班级'}]"/>
            <span class="class-name">{{ classs.name }}</span>
            <span v-if="$store.state.user.role === 'teacher'">
              <el-button class="el-text-btn" type="text" @click="showEditClassDialog()">
                <span>编辑班级信息</span>
                <i class="el-icon-edit"></i>
              </el-button>
            </span>
            <span class="class-ta tmcu-btn" @click="showClassTasDialog()">
              {{ $store.state.user.role | taStatus(classs.tas.length) }}
            </span>
          </div>
          <p>
            <span class="class-info tmcu-text">班级Id：{{ classs.classId }}</span>
            <span class="class-info tmcu-text">密码：{{ classs.password }}</span>
            <span class="class-info tmcu-text">任课教师：{{ classs.teacherName }}</span>
          </p>
        </div>
        <markdown-editor
          v-if="classs.message"
          :value="classs.message"
          :edit="false"
        />
      </div>
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="作业" name="homework">
          <div class="hw-container">
            <div v-if="$store.state.user.role === 'teacher' || isTA" class="hw-content">
              <span class="hw-total">作业数量: {{ classs.homeworks.length }}</span>
              <el-button v-if="!isTA" type="primary" @click="addHomework">创建作业</el-button>
              <el-button type="primary" @click="viewAllSubs">数据统计</el-button>
            </div>
            <div v-else class="hw-content">
              <span class="hw-total">作业数量: {{ classs.homeworks.length }}</span>
              <el-button type="primary" @click="viewStudentHwsSubs">数据统计</el-button>
            </div>
          </div>
          <div>
            <homework-item
              v-for="homework in reverseHomeworks"
              :key="homework.createDate"
              :classId="classs.classId"
              :homework="homework"
              :isTA="isTA"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="课件" name="courseware">
          <courseware-pane
            :coursewares="classs.coursewares"
            :classId="classs.classId"
            @fetchData="fetchData"
          />
        </el-tab-pane>
        <el-tab-pane v-if="$store.state.user.role === 'teacher' || isTA" label="学生" name="student">
          <p>学生数量: {{ classs.students.length }}</p>
          <div>
            <students-table
              :students="classs.students"
              :classId="classs.classId"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <add-homework-dialog
        :dialogVisible="addHwDialogVisible"
        :classId="classs.classId"
        @hideDialog="addHwDialogVisible = false"
        @fetchData="fetchData"
      />
      <edit-class-dialog
        ref="editClassDialogRef"
        @fetchData="fetchData"
      />
      <view-all-subs-dialog
        ref="viewAllSubsDialogRef"
      />
      <view-stu-subs-dialog
        ref="viewStuSubsDialogRef"
      />
      <class-tas-dialog
        ref="classTasDialogRef"
        :classId="classs.classId"
        @fetchData="fetchData"
      />
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import PageLoading from '@/components/PageLoading';
import Breadcrumb from '@/components/Breadcrumb';
import { getClassHwsData } from './api';
import AddHomeworkDialog from './components/AddHomeworkDialog';
import HomeworkItem from './components/HomeworkItem';
import StudentsTable from './components/StudentsTable';
import CoursewarePane from './components/CoursewarePane';
import EditClassDialog from './components/EditClassDialog';
import ViewAllSubsDialog from './components/ViewAllSubsDialog';
import ViewStuSubsDialog from './components/ViewStuSubsDialog';
import ClassTasDialog from './components/ClassTasDialog';

export default {
  name: 'ClassPage',
  created() {
    this.fetchData();
  },
  components: {
    AddHomeworkDialog,
    HomeworkItem,
    StudentsTable,
    CoursewarePane,
    MarkdownEditor,
    EditClassDialog,
    ViewAllSubsDialog,
    ViewStuSubsDialog,
    ClassTasDialog,
    PageLoading,
    Breadcrumb,
  },
  data() {
    return {
      classs: {
        classId: '',
        name: '',
        teacherName: '',
        password: '',
        message: '',
        students: [],
        homeworks: [],
        coursewares: [],
        tas: [],
      },
      activeTabName: 'homework',
      addHwDialogVisible: false,
      loading: false,
      error: false,
    };
  },
  computed: {
    reverseHomeworks() {
      return this.classs.homeworks.slice().reverse();
    },
    isTA() {
      const userEmail = this.$store.state.user.email;
      for (let i = 0; i < this.classs.tas.length; i += 1) {
        if (this.classs.tas[i].email === userEmail) return true;
      }
      return false;
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.error = false;
      getClassHwsData(this.$route.params.classId).then((data) => {
        this.loading = false;
        this.classs = data;
      }).catch((error) => {
        this.loading = false;
        this.error = true;
        this.$message.error(error);
      });
    },
    addHomework() {
      this.addHwDialogVisible = true;
    },
    showEditClassDialog() {
      this.$refs.editClassDialogRef.show(this.classs);
    },
    viewAllSubs() {
      this.$refs.viewAllSubsDialogRef.show(this.classs.homeworks);
    },
    viewStudentHwsSubs() {
      this.$refs.viewStuSubsDialogRef.show(
        this.classs.classId,
        this.classs.students[0].userId,
        this.classs.students[0].name,
        this.classs.students[0].stuId,
      );
    },
    showClassTasDialog() {
      this.$refs.classTasDialogRef.show(this.classs.tas);
    },
  },
  filters: {
    taStatus(role, length) {
      if (length) {
        return '查看助教';
      } else if (role === 'student') {
        return '暂无助教';
      }
      return '添加助教';
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

.class-name {
  color: #606266;
  font-size: 20px;
  font-weight: bold;
}

.el-text-btn {
  padding: 0;
}

.class-info {
  padding-left: 10px;
}

.hw-container {
  padding: 10px;
}

.hw-content {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px;
}

.hw-total {
  color: #606266;
  font-size: 14px;
  margin-right: 20px;
}

.class-ta {
  float: right;
}
</style>
