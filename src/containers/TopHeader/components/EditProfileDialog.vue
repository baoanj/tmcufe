<template lang="html">
  <el-dialog title="修改个人信息" width="50%" :visible="visible" @close="closeDialog">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="stuId">
        <el-input v-model="ruleForm.stuId" auto-complete="on"></el-input>
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
import { editNameStuId } from '../api';

export default {
  name: 'EditProfileDialog',
  data() {
    const checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    const validateStuId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      loading: false,
      ruleForm: {
        name: '',
        stuId: '',
      },
      rules: {
        name: [
          { required: true, validator: checkName, trigger: 'blur' },
        ],
        stuId: [
          { required: true, validator: validateStuId, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    show(name, stuId) {
      this.ruleForm.name = name;
      this.ruleForm.stuId = stuId;
      this.visible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          editNameStuId({
            name: this.ruleForm.name,
            stuId: this.ruleForm.stuId,
          }).then(() => {
            this.visible = false;
            this.loading = false;
            this.$store.dispatch('refreshHeader');
          }).catch((error) => {
            this.loading = false;
            this.$message.error(error);
          });
        }
      });
    },
    closeDialog() {
      this.visible = false;
      this.$refs.ruleForm.clearValidate();
    },
  },
};
</script>

<style lang="css" scoped>
.submit-btn {
  float: right;
}
</style>
