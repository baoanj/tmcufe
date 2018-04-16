<template lang="html">
  <div>
    <el-table
      :data="students"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="stuId"
        label="学号"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="viewStudentHwsSubs(scope.row)"
            type="text"
            size="small"
          >查看作业提交统计</el-button>
        </template>
      </el-table-column>
    </el-table>
    <view-stu-subs-dialog
      ref="viewStuSubsDialogRef"
    />
  </div>
</template>

<script>
import ViewStuSubsDialog from './ViewStuSubsDialog';

export default {
  name: 'StudentsTable',
  props: {
    students: {
      type: Array,
      default() {
        return [];
      },
    },
    classId: {
      type: String,
      default: '',
    },
  },
  components: {
    ViewStuSubsDialog,
  },
  methods: {
    viewStudentHwsSubs(row) {
      this.$refs.viewStuSubsDialogRef.show(this.classId, row.userId, row.name, row.stuId);
    },
  },
};
</script>

<style lang="css">
</style>
