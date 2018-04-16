<template lang="html">
  <div class="login-box">
    <vue-headful
      title="高校教学管理系统 | 登录"
    />
    <p class="login-title">用户登录</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item class="captcha-form-item" label="验证码" prop="captcha">
        <el-input class="captcha-input" v-model="ruleForm.captcha"></el-input>
        <span @click="getCaptchaSVG" v-html="captchaSVG"></span>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button
          class="submit-btn"
          type="primary"
          @click="submitForm('ruleForm')"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginUser, checkEmailExist, getCaptcha, checkCaptcha } from './api';

export default {
  name: 'LoginPage',
  created() {
    this.getCaptchaSVG();
  },
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
    const validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (!/^[a-zA-Z0-9]{4}$/.test(value)) {
        callback(new Error('验证码格式错误'));
      } else {
        checkCaptcha(value).then(() => {
          callback();
        }).catch((error) => {
          callback(new Error(error));
        });
      }
    };
    return {
      ruleForm: {
        email: '',
        password: '',
        captcha: '',
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        captcha: [
          { validator: validateCaptcha, trigger: 'blur' },
        ],
      },
      captchaSVG: '',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginUser({
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            captcha: this.ruleForm.captcha,
          }).then(() => {
            this.$store.dispatch('refreshHeader');
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
    getCaptchaSVG() {
      getCaptcha().then((svg) => {
        this.captchaSVG = svg;
      }).catch((error) => {
        this.captchaSVG = '获取验证码失败';
        this.$message.error(error);
      });
    },
  },
};
</script>

<style lang="css" scoped>
.login-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
}

.login-box {
  width: 500px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 2.4rem -0.4rem #9da5ab;
  padding: 20px 30px 1px 0;
}

.submit-btn {
  float: right;
}

.captcha-input {
  width: 50%;
  vertical-align: top;
}
</style>

<style lang="css">
.captcha-form-item > .el-form-item__content {
  line-height: normal;
}
</style>
