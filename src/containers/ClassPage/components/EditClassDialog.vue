<template lang="html">
  <fullscreen-dialog
    title="修改班级信息"
    :visible="visible"
    @close="closeDialog"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="班级Id">
        <p>{{ classId }}</p>
      </el-form-item>
      <el-form-item label="班级名称" prop="name">
        <el-input v-model="ruleForm.name" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="其他信息" prop="message">
        <markdown-editor
          :value="ruleForm.message"
          @change="(val) => ruleForm.message = val"
        />
      </el-form-item>
      <el-form-item label="任课教师" prop="teacherName">
        <el-input v-model="ruleForm.teacherName" auto-complete="on"></el-input>
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
  </fullscreen-dialog>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import FullscreenDialog from '@/components/FullscreenDialog';
import { updateClassMsg } from '../api';

export default {
  name: 'EditClassDialog',
  components: {
    MarkdownEditor,
    FullscreenDialog,
  },
  data() {
    const checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        callback();
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
      classId: '',
      visible: false,
      loading: false,
      ruleForm: {
        name: '',
        teacherName: '',
        password: '',
        message: '',
      },
      rules: {
        name: [
          { required: true, validator: checkName, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    show(classs) {
      this.classId = classs.classId;
      this.ruleForm.name = classs.name;
      this.ruleForm.teacherName = classs.teacherName;
      this.ruleForm.password = classs.password;
      this.ruleForm.message = classs.message;
      this.visible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          updateClassMsg(this.classId, {
            name: this.ruleForm.name,
            teacherName: this.ruleForm.teacherName,
            password: this.ruleForm.password,
            message: this.ruleForm.message,
          }).then(() => {
            this.visible = false;
            this.loading = false;
            this.$emit('fetchData');
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
