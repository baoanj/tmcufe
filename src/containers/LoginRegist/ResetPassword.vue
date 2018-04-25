<template lang="html">
  <div class="reset-box">
    <vue-headful
      :title="$route.meta.title"
    />
    <div v-if="valid">
      <p class="reset-title">重置密码</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="新密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="6-20个字符，支持数字,大小写字母和标点符号,不能有空格"
          />
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
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
    <div v-else class="invalid-msg">
      <p class="tmcu-text">{{ invalidMsg }}</p>
    </div>
  </div>
</template>

<script>
import { resetPass, checkResetValid } from './api';

export default {
  name: 'ResetPassword',
  created() {
    checkResetValid(this.$route.params.resetId).then(() => {
      this.valid = true;
      this.invalidMsg = '';
    }).catch((error) => {
      this.valid = false;
      this.invalidMsg = error;
    });
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (!/^\S{6,20}$/.test(value)) {
        callback(new Error('6-20个字符，支持数字/大小写字母/标点符号,不能有空格'));
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
      loading: false,
      valid: true,
      invalidMsg: '',
      ruleForm: {
        password: '',
        checkPass: '',
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          resetPass(this.$route.params.resetId, {
            password: this.ruleForm.password,
          }).then(() => {
            this.loading = false;
            this.$message.success('重置成功，请登录');
            this.$router.push('/login');
          }).catch((error) => {
            this.loading = false;
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
.reset-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
}

.reset-box {
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

.invalid-msg {
  text-align: center;
  margin-bottom: 20px;
}
</style>
