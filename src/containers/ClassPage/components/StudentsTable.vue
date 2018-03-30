<template lang="html">
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
          @click="viewStudentHwsSubs(scope.row.userId)"
          type="text"
          size="small"
        >查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
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
  methods: {
    viewStudentHwsSubs(userId) {
      console.log(this.classId, userId); //eslint-disable-line
    },
  },
};
</script>

<style lang="css">
</style>
