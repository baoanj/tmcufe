<template lang="html">
  <div>
    <el-table
      :data="submissions"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="stuId"
        label="学号"
      ></el-table-column>
      <el-table-column
        prop="stuName"
        label="姓名"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="提交时间"
        :formatter="formatterDate"
      ></el-table-column>
      <el-table-column
        prop="checked"
        label="状态"
        :formatter="formatterStatus"
      ></el-table-column>
      <el-table-column
        prop="feedback"
        label="反馈"
        :formatter="formatterFeedback"
      ></el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            @click="viewStudentHwSub(scope.row)"
            type="text"
            size="small"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <show-stu-sub-dialog
      ref="showStuSubDialogRef"
      :classId="classId"
      :createDate="createDate"
      @fetchData="$emit('fetchData')"
    />
  </div>
</template>

<script>
import utils from '@/utils';
import ShowStuSubDialog from './ShowStuSubDialog';

export default {
  name: 'SubmissionsTable',
  props: {
    submissions: {
      type: Array,
      default() {
        return [];
      },
    },
    classId: {
      type: String,
      default: '',
    },
    createDate: {
      type: String,
      default: Date.now(),
    },
  },
  components: {
    ShowStuSubDialog,
  },
  methods: {
    viewStudentHwSub(row) {
      this.$refs.showStuSubDialogRef.show(row);
    },
    formatterDate(row, column, cellValue) {
      return this.formateDate(cellValue);
    },
    formatterStatus(row, column, cellValue) {
      return cellValue ? '已审阅' : '未审阅';
    },
    formatterFeedback(row, column, cellValue) {
      return (row.checked && cellValue) || (row.checked && '无') || '--';
    },
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
  },
};
</script>

<style lang="css">
</style>
