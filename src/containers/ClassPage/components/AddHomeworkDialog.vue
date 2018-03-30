<template lang="html">
  <el-dialog title="创建作业" :visible="dialogVisible" @close="closeDialog">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="作业标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作业详情" prop="description">
        <el-input
          type="textarea"
          :rows="2"
          v-model="ruleForm.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="beginDate">
        <el-date-picker
          v-model="ruleForm.beginDate"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          type="datetime"
          placeholder="选择日期时间"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          class="submit-btn"
          type="primary"
          @click="submitForm('ruleForm')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addHomework } from '../api';

export default {
  name: 'AddHomeworkDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    classId: {
      type: String,
      default: '',
    },
  },
  data() {
    const checkTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    const checkDate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        title: '',
        description: '',
        beginDate: '',
        endDate: '',
      },
      rules: {
        title: [
          { validator: checkTitle, trigger: 'blur' },
        ],
        description: [
          { validator: checkTitle, trigger: 'blur' },
        ],
        beginDate: [
          { validator: checkDate, trigger: 'blur' },
        ],
        endDate: [
          { validator: checkDate, trigger: 'blur' },
        ],
      },
      pickerOptions: {
        shortcuts: [{
          text: '三天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + (3600 * 1000 * 24 * 3));
            picker.$emit('pick', date);
          },
        }, {
          text: '五天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + (3600 * 1000 * 24 * 5));
            picker.$emit('pick', date);
          },
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + (3600 * 1000 * 24 * 7));
            picker.$emit('pick', date);
          },
        }, {
          text: '两周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + (3600 * 1000 * 24 * 14));
            picker.$emit('pick', date);
          },
        }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addHomework(this.classId, {
            createDate: Date.now(),
            title: this.ruleForm.title,
            description: this.ruleForm.description,
            beginDate: this.ruleForm.beginDate.getTime(),
            endDate: this.ruleForm.endDate.getTime(),
          }).then(() => {
            this.$emit('hideDialog');
            this.$emit('fetchData');
          }).catch((error) => {
            this.$message.error(error);
          });
        }
      });
    },
    closeDialog() {
      this.resetForm('ruleForm');
      this.$emit('hideDialog');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="css" scoped>
.submit-btn {
  float: right;
}
</style>
