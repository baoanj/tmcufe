<template lang="html">
  <div v-if="user.name">
    <div>
      <el-button
        v-if="user.role === 'teacher'"
        type="primary"
        @click="addClass"
      >新建班级</el-button>
      <el-button
        v-if="user.role === 'student'"
        type="primary"
        @click="enterClass"
      >添加班级</el-button>
    </div>
    <div>
      <class-card
        v-for="classs in classes" :key="classs.classId"
        :classs="classs"
      />
    </div>
    <add-class-dialog
      v-if="user.role === 'teacher'"
      :dialogVisible="addClassDialogVisible"
      @hideDialog="addClassDialogVisible = false"
      @fetchData="fetchData()"
    />
    <enter-class-dialog
      v-if="user.role === 'student'"
      :dialogVisible="enterClassDialogVisible"
      @hideDialog="enterClassDialogVisible = false"
      @fetchData="fetchData()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getClasses } from './api';
import ClassCard from './components/ClassCard';
import AddClassDialog from './components/AddClassDialog';
import EnterClassDialog from './components/EnterClassDialog';

export default {
  name: 'Home',
  components: {
    ClassCard,
    AddClassDialog,
    EnterClassDialog,
  },
  created() {
    this.fetchData();
  },
  computed: mapState([
    'user',
  ]),
  data() {
    return {
      classes: [],
      addClassDialogVisible: false,
      enterClassDialogVisible: false,
    };
  },
  methods: {
    fetchData() {
      getClasses().then((data) => {
        this.classes = data.reverse();
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    addClass() {
      this.addClassDialogVisible = true;
    },
    enterClass() {
      this.enterClassDialogVisible = true;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
