<template lang="html">
  <div class="login-box">
    <p>用户登录</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { loginUser, checkEmailExist } from './api';

export default {
  name: 'LoginPage',
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else if (!/^[a-zA-Z0-9\-_]+@([a-zA-Z0-9]+\.)+[a-z]{2,4}$/.test(value)) {
        callback(new Error('邮箱格式有误'));
      } else {
        checkEmailExist(value).then(() => {
          callback(new Error('该邮箱未注册'));
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
        email: '',
        password: '',
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginUser({
            email: this.ruleForm.email,
            password: this.ruleForm.password,
          }).then(() => {
            this.refreshHeader();
            this.$router.push('/');
          }).catch((error) => {
            this.$message.error(error);
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapActions([
      'refreshHeader',
    ]),
  },
};
</script>

<style lang="css" scoped>
.login-box {
  width: 500px;
  margin: 0 auto;
}
</style>
