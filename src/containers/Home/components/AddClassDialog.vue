<template lang="html">
  <fullscreen-dialog
    title="新建班级"
    :visible="dialogVisible"
    @close="closeDialog"
  >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="班级Id" prop="classId">
        <el-input
          v-model="ruleForm.classId"
          :maxlength="20"
          placeholder="唯一，6-20个字符"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          :maxlength="20"
          placeholder="公开给班里学生，6-20个字符"
        />
      </el-form-item>
      <el-form-item label="班级名称" prop="name">
        <el-row>
          <el-col :span="20">
            <el-input
              v-model="ruleForm.name"
              placeholder="30字以内"
              :clearable="true"
              :maxlength="30"></el-input>
          </el-col>
          <el-col :span="4">
            <span style="padding-left: 5px">{{ruleForm.name.length}}/30</span>
          </el-col>
        </el-row>
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
import utils from '@/utils';
import MarkdownEditor from '@/components/MarkdownEditor';
import FullscreenDialog from '@/components/FullscreenDialog';
import { addClass, checkClassIdUnique } from '../api';

export default {
  name: 'AddClassDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MarkdownEditor,
    FullscreenDialog,
  },
  data() {
    const checkClassId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填'));
      } else if (!utils.validClassId(value)) {
        callback(new Error('6-20个字符'));
      } else {
        checkClassIdUnique(value).then(() => {
          callback();
        }, (error) => {
          callback(new Error(error));
        });
      }
    };
    const checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填'));
      } else if (!utils.validClassPass(value)) {
        callback(new Error('6-20个字符'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        classId: '',
        name: '',
        teacherName: '',
        password: '',
        message: '',
      },
      rules: {
        classId: [
          { required: true, validator: checkClassId, trigger: 'blur' },
        ],
        name: [
          { required: true, validator: checkName, trigger: 'blur' },
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
          addClass({
            classId: this.ruleForm.classId,
            name: this.ruleForm.name,
            teacherName: this.ruleForm.teacherName,
            password: this.ruleForm.password,
            message: this.ruleForm.message,
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
