<template lang="html">
  <el-dialog title="添加班级" :visible="dialogVisible" @close="closeDialog">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="班级Id" prop="classId">
        <el-input v-model="ruleForm.classId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          class="submit-btn"
          type="primary"
          :loading="loading"
          @click="submitForm('ruleForm')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { enterClass, checkClassIdUnique } from '../api';

export default {
  name: 'EnterClassDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const checkClassId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else {
        checkClassIdUnique(value).then(() => {
          callback(new Error('班级Id不存在'));
        }, () => {
          callback();
        });
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        classId: '',
        password: '',
      },
      rules: {
        classId: [
          { required: true, validator: checkClassId, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          enterClass({
            classId: this.ruleForm.classId,
            password: this.ruleForm.password,
          }).then(() => {
            this.loading = false;
            this.$emit('hideDialog');
            this.$emit('fetchData');
          }).catch((error) => {
            this.loading = false;
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
