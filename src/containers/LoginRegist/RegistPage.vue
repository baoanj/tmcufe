<template lang="html">
  <div class="regist-box">
    <p>用户注册</p>
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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item v-show="ruleForm.role === 'student'" label="学号" prop="stuId">
        <el-input v-model="ruleForm.stuId" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="ruleForm.role">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { registUser, checkEmailExist } from './api';

export default {
  name: 'RegistPage',
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else if (!/^[a-zA-Z0-9\-_]+@([a-zA-Z0-9]+\.)+[a-z]{2,4}$/.test(value)) {
        callback(new Error('邮箱格式有误'));
      } else {
        checkEmailExist(value).then(() => {
          callback();
        }, (error) => {
          callback(new Error(error));
        });
      }
    };
    const checkText = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: '',
        name: '',
        stuId: '',
        password: '',
        checkPass: '',
        role: 'student',
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' },
        ],
        name: [
          { validator: checkText, trigger: 'blur' },
        ],
        stuId: [
          { validator: checkText, trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          registUser({
            name: this.ruleForm.name,
            stuId: this.ruleForm.stuId,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            role: this.ruleForm.role,
          }).then(() => {
            this.$router.push('login');
          }).catch((error) => {
            this.$message.error(error);
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="css" scoped>
.regist-box {
  width: 500px;
  margin: 0 auto;
}
</style>
