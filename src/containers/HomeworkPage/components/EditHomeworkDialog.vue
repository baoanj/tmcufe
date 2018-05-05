<template lang="html">
  <fullscreen-dialog
    title="修改作业信息"
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
      <el-form-item label="作业标题" prop="title">
        <el-row>
          <el-col :span="22">
            <el-input
              v-model="ruleForm.title"
              placeholder="50字以内"
              :clearable="true"
              :maxlength="50"
            />
          </el-col>
          <el-col :span="2">
            <span style="padding-left: 5px">{{ruleForm.title.length}}/50</span>
          </el-col>
        </el-row>
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
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endDate">
        <el-date-picker
          v-model="ruleForm.endDate"
          type="datetime"
          placeholder="选择日期时间"
          default-time="23:59:59"
          :picker-options="pickerOptions2"
        ></el-date-picker>
      </el-form-item>
      <div class="form-item-upload">
        <upload-files v-model="fileList" />
      </div>
      <el-form-item>
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          class="submit-btn"
          type="primary"
          @click="submitForm('ruleForm')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </fullscreen-dialog>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';
import UploadFiles from '@/components/UploadFiles';
import FullscreenDialog from '@/components/FullscreenDialog';
import SimpleFormData from '@/utils/simpleFormData';
import utils from '@/utils';
import { updateHomeworkMsg } from '../api';

export default {
  name: 'EditHomeworkDialog',
  components: {
    MarkdownEditor,
    UploadFiles,
    FullscreenDialog,
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
    const checkBeginDate = (rule, value, callback) => {
      if (this.ruleForm.endDate && this.ruleForm.beginDate &&
        this.ruleForm.endDate.getTime() < this.ruleForm.beginDate.getTime()) {
        callback(new Error('开始时间不能晚于截止时间'));
      } else {
        callback();
      }
    };
    const checkEndDate = (rule, value, callback) => {
      if (this.ruleForm.beginDate && this.ruleForm.endDate &&
        this.ruleForm.beginDate.getTime() > this.ruleForm.endDate.getTime()) {
        callback(new Error('截止时间不能早于开始时间'));
      } else {
        callback();
      }
    };
    const that = this;
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
          { required: true, validator: checkTitle, trigger: 'blur' },
        ],
        beginDate: [
          { validator: checkBeginDate, trigger: 'blur' },
        ],
        endDate: [
          { validator: checkEndDate, trigger: 'blur' },
        ],
      },
      pickerOptions1: {
        shortcuts: [{
          text: '明天',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime();
            date.setTime(today + (3600 * 1000 * 24 * 1));
            picker.$emit('pick', date);
          },
        }, {
          text: '后天',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime();
            date.setTime(today + (3600 * 1000 * 24 * 2));
            picker.$emit('pick', date);
          },
        }, {
          text: '三天后',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime();
            date.setTime(today + (3600 * 1000 * 24 * 3));
            picker.$emit('pick', date);
          },
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime();
            date.setTime(today + (3600 * 1000 * 24 * 7));
            picker.$emit('pick', date);
          },
        }],
        disabledDate(date) {
          if (that.ruleForm.endDate) {
            return date.getTime() < new Date(new Date().toLocaleDateString()).getTime() ||
              date.getTime() > new Date(that.ruleForm.endDate.toLocaleDateString()).getTime();
          }
          return date.getTime() < new Date(new Date().toLocaleDateString()).getTime();
        },
      },
      pickerOptions2: {
        shortcuts: [{
          text: '三天后',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime() - 1;
            date.setTime(today + (3600 * 1000 * 24 * 4));
            picker.$emit('pick', date);
          },
        }, {
          text: '五天后',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime() - 1;
            date.setTime(today + (3600 * 1000 * 24 * 6));
            picker.$emit('pick', date);
          },
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime() - 1;
            date.setTime(today + (3600 * 1000 * 24 * 6));
            picker.$emit('pick', date);
          },
        }, {
          text: '两周后',
          onClick(picker) {
            const date = new Date();
            const today = new Date(new Date().toLocaleDateString()).getTime() - 1;
            date.setTime(today + (3600 * 1000 * 24 * 15));
            picker.$emit('pick', date);
          },
        }],
        disabledDate(date) {
          if (that.ruleForm.beginDate) {
            return date.getTime() <
              new Date(that.ruleForm.beginDate.toLocaleDateString()).getTime();
          }
          return date.getTime() < new Date(new Date().toLocaleDateString()).getTime();
        },
      },
    };
  },
  methods: {
    show(homework) {
      this.fileList = homework.files;
      this.ruleForm.title = homework.title;
      this.ruleForm.description = homework.description;
      this.ruleForm.beginDate = homework.beginDate && new Date(+homework.beginDate);
      this.ruleForm.endDate = homework.endDate && new Date(+homework.endDate);
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
            beginDate: this.ruleForm.beginDate ? this.ruleForm.beginDate.getTime() : '',
            endDate: this.ruleForm.endDate ? this.ruleForm.endDate.getTime() : '',
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

.form-item-upload {
  margin-left: 100px;
  margin-bottom: 20px;
}
</style>
