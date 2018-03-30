<template lang="html">
  <div v-if="user.name">
    <div>
      <router-link to="/">回主页</router-link>
    </div>
    <div>
      <p>{{ classs.name }}</p>
      <p>
        <span>班级Id: {{this.$route.params.classId}}</span>
        <span>密码: {{ classs.password }}</span>
        <span>任课教师: {{ classs.teacherName }}</span>
      </p>
    </div>
    <div v-if="user.role === 'student'">
      <p>作业数量: {{ classs.homeworks.length }}</p>
      <homework-item
        v-for="homework in classs.homeworks"
        :key="homework.createDate"
        :homework="homework"
      />
    </div>
    <el-tabs v-if="user.role === 'teacher'" v-model="activeTabName">
      <el-tab-pane label="作业" name="homework">
        <div>
          <el-button type="primary" @click="addHomework">创建作业</el-button>
        </div>
        <div>
          <homework-item
            v-for="homework in classs.homeworks"
            :key="homework.createDate"
            :homework="homework"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="学生" name="student">
        <p>学生数量: {{ classs.students.length }}</p>
        <div>
          <students-table
            :students="classs.students"
            :classId="this.$route.params.classId"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <add-homework-dialog
      :dialogVisible="addHwDialogVisible"
      :classId="this.$route.params.classId"
      @hideDialog="addHwDialogVisible = false"
      @fetchData="fetchData()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getClassHwsData } from './api';
import AddHomeworkDialog from './components/AddHomeworkDialog';
import HomeworkItem from './components/HomeworkItem';
import StudentsTable from './components/StudentsTable';

export default {
  name: 'ClassPage',
  created() {
    this.fetchData();
  },
  components: {
    AddHomeworkDialog,
    HomeworkItem,
    StudentsTable,
  },
  computed: mapState([
    'user',
  ]),
  data() {
    return {
      classs: {
        name: '',
        teacherName: '',
        password: '',
        students: [],
        homeworks: [],
      },
      activeTabName: 'homework',
      addHwDialogVisible: false,
    };
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
  },
};
</script>

<style lang="css" scoped>
</style>
