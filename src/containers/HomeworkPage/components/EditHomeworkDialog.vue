<template lang="html">
  <el-dialog title="修改作业信息" width="80%" :visible="visible" @close="closeDialog">
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
        <markdown-editor
          :value="ruleForm.description"
          @change="(val) => ruleForm.description = val"
        />
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
      <upload-files :files="fileList" @change="val => fileList = val" />
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
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadFiles from '@/components/UploadFiles';
import SimpleFormData from '@/utils/simpleFormData';
import utils from '@/utils';
import { updateHomeworkMsg } from '../api';

export default {
  name: 'EditHomeworkDialog',
  components: {
    MarkdownEditor,
    UploadFiles,
  },
  props: {
    classId: {
      type: String,
      default: '',
    },
    createDate: {
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
      visible: false,
      loading: false,
      fileList: [],
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
    show(homework) {
      this.fileList = homework.files;
      this.ruleForm.title = homework.title;
      this.ruleForm.description = homework.description;
      this.ruleForm.beginDate = new Date(+homework.beginDate);
      this.ruleForm.endDate = new Date(+homework.endDate);
      this.visible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const realFileList = this.fileList.filter(item => utils.isFile(item));
          const existFiles = this.fileList.filter(item => utils.isPureObject(item));
          const formData = new SimpleFormData({
            files: realFileList,
            existFiles: JSON.stringify(existFiles),
            title: this.ruleForm.title,
            description: this.ruleForm.description,
            beginDate: this.ruleForm.beginDate.getTime(),
            endDate: this.ruleForm.endDate.getTime(),
          });
          this.loading = true;
          updateHomeworkMsg(this.classId, this.createDate, formData).then(() => {
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
