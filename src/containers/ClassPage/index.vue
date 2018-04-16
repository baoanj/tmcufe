<template lang="html">
  <div v-if="$store.state.user.name && classs.classId">
    <vue-headful
      title="高校教学管理系统 | 班级"
    />
    <div>
      <div class="custom-card">
        <div>
          <router-link class="card-text-btn" to="/">
            <i class="el-icon-arrow-left"></i>
            <span>回主页</span>
          </router-link>
          <span class="class-name">{{ classs.name }}</span>
          <span v-if="$store.state.user.role === 'teacher'">
            <el-button class="el-text-btn" type="text" @click="showEditClassDialog()">
              <span>编辑班级信息</span>
              <i class="el-icon-edit"></i>
            </el-button>
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
          <div class="hw-content" v-if="$store.state.user.role === 'teacher'">
            <span class="hw-total">作业数量: {{ classs.homeworks.length }}</span>
            <el-button type="primary" @click="addHomework">创建作业</el-button>
            <el-button type="primary" @click="viewAllSubs">数据统计</el-button>
          </div>
        </div>
        <div>
          <homework-item
            v-for="homework in reverseHomeworks"
            :key="homework.createDate"
            :classId="classs.classId"
            :homework="homework"
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
      <el-tab-pane v-if="$store.state.user.role === 'teacher'" label="学生" name="student">
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
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import { getClassHwsData } from './api';
import AddHomeworkDialog from './components/AddHomeworkDialog';
import HomeworkItem from './components/HomeworkItem';
import StudentsTable from './components/StudentsTable';
import CoursewarePane from './components/CoursewarePane';
import EditClassDialog from './components/EditClassDialog';
import ViewAllSubsDialog from './components/ViewAllSubsDialog';

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
      },
      activeTabName: 'homework',
      addHwDialogVisible: false,
    };
  },
  computed: {
    reverseHomeworks() {
      return this.classs.homeworks.slice().reverse();
    },
  },
  methods: {
    fetchData() {
      getClassHwsData(this.$route.params.classId).then((data) => {
        this.classs = data;
      }).catch((error) => {
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
</style>
