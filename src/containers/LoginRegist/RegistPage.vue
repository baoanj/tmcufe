<template lang="html">
  <div class="regist-box">
    <vue-headful
      :title="$route.meta.title"
    />
    <div v-if="success" class="success-msg">
      <span class="tmcu-text">
        {{ mailLoading ? '' : `邮件已发送到 ${ruleForm.email} 邮箱激活后才能登录` }}
      </span>
      <el-button type="text" :loading="mailLoading" @click="tryAgain">
        {{ mailLoading ? '正在发送...' : '没收到?重新发送' }}
      </el-button>
    </div>
    <div v-else>
      <p class="regist-title">用户注册</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        @keyup.enter.native="submitForm('ruleForm')"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" auto-complete="on" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" auto-complete="on" />
        </el-form-item>
        <el-form-item v-show="ruleForm.role === 'student'" label="学号" prop="stuId">
          <el-input v-model="ruleForm.stuId" auto-complete="on" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="6-20个字符,数字/大小写字母/标点符号,不能有空格"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" />
        </el-form-item>
        <el-form-item class="captcha-form-item" label="验证码" prop="captcha">
          <el-input class="captcha-input" v-model="ruleForm.captcha" />
          <span @click="getCaptchaSVG" v-html="captchaSVG"></span>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="ruleForm.role">
            <el-radio label="student">学生</el-radio>
            <el-radio label="teacher">老师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button
            class="submit-btn"
            type="primary"
            :loading="loading"
            @click="submitForm('ruleForm')"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
import { registUser, checkEmailExist, getCaptcha, checkCaptcha, sendEmailAgain } from './api';

export default {
  name: 'RegistPage',
  created() {
    this.getCaptchaSVG();
  },
  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else if (!utils.validEmail(value)) {
        callback(new Error('邮箱格式有误'));
      } else {
        checkEmailExist(value).then(() => {
          callback();
        }, (error) => {
          callback(new Error(error));
        });
      }
    };
    const checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    const checkStuId = (rule, value, callback) => {
      if (!value && this.ruleForm.role === 'student') {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!utils.validPassword2(value)) {
        callback(new Error('6-20个字符,支持数字/大小写字母/标点符号,不能有空格'));
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
        name: '',
        stuId: '',
        password: '',
        checkPass: '',
        captcha: '',
        role: 'student',
      },
      rules: {
        email: [
          { required: true, validator: checkEmail, trigger: 'blur' },
        ],
        name: [
          { required: true, validator: checkName, trigger: 'blur' },
        ],
        stuId: [
          { required: true, validator: checkStuId, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
        captcha: [
          { required: true, validator: validateCaptcha, trigger: 'blur' },
        ],
      },
      captchaSVG: '',
      success: false,
      mailLoading: false,
      loading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          registUser({
            name: this.ruleForm.name,
            stuId: this.ruleForm.stuId,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            role: this.ruleForm.role,
            captcha: this.ruleForm.captcha,
            host: window.location.host,
          }).then(() => {
            this.loading = false;
            this.success = true;
          }).catch((error) => {
            this.loading = false;
            this.$message.error(error);
            this.getCaptchaSVG();
          });
        }
      });
    },
    getCaptchaSVG() {
      getCaptcha().then((svg) => {
        this.captchaSVG = svg;
      }).catch((error) => {
        this.captchaSVG = '获取验证码失败';
        this.$message.error(error);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    tryAgain() {
      this.mailLoading = true;
      sendEmailAgain({
        email: this.ruleForm.email,
        host: window.location.host,
      }).then(() => {
        this.$message.success('发送成功');
        this.mailLoading = false;
      }).catch((error) => {
        this.$message.error(error);
        this.mailLoading = false;
      });
    },
  },
};
</script>

<style lang="css" scoped>
.regist-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
}

.regist-box {
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

.success-msg {
  text-align: center;
  margin-bottom: 20px;
}
</style>

<style lang="css">
.captcha-form-item > .el-form-item__content {
  line-height: normal;
}
</style>
