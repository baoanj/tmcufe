<template lang="html">
  <div v-if="$store.state.user.name && classs.classId">
    <vue-headful
      title="高校教学管理系统 | 班级"
    />
    <div>
      <router-link to="/">回主页</router-link>
    </div>
    <div>
      <p>
        <span>{{ classs.name }}</span>
        <span v-if="$store.state.user.role === 'teacher'">
          <el-button type="text" @click="showEditClassDialog()">编辑班级信息</el-button>
        </span>
      </p>
      <p>
        <span>班级Id: {{ classs.classId }}</span>
        <span>密码: {{ classs.password }}</span>
        <span>任课教师: {{ classs.teacherName }}</span>
      </p>
      <markdown-editor
        :value="classs.message"
        :edit="false"
      />
    </div>
    <el-tabs v-model="activeTabName">
      <el-tab-pane label="作业" name="homework">
        <div v-if="$store.state.user.role === 'teacher'">
          <el-button type="primary" @click="addHomework">创建作业</el-button>
        </div>
        <p>作业数量: {{ classs.homeworks.length }}</p>
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
  },
};
</script>

<style lang="css" scoped>
</style>
