<template lang="html">
  <div>
    <div v-if="user.role === 'teacher'">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
      </el-form>
      <upload-files :files="fileList" @change="val => fileList = val" />
      <el-button @click="submitCourseware">提交</el-button>
    </div>
    <div>
      <div :key="courseware.uploadDate" v-for="courseware in coursewares">
        <p>{{ courseware.title }} {{ formateDate(courseware.uploadDate) }}</p>
        <file-list :files="courseware.files" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UploadFiles from '@/components/UploadFiles';
import FileList from '@/components/FileList';
import SimpleFormData from '@/utils/simpleFormData';
import utils from '@/utils';
import { uploadCourseware } from '../api';

export default {
  name: 'Courseware',
  components: {
    UploadFiles,
    FileList,
  },
  computed: mapState([
    'user',
  ]),
  props: {
    coursewares: {
      type: Array,
    },
    classId: {
      type: String,
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
    return {
      fileList: [],
      ruleForm: {
        title: '',
      },
      rules: {
        title: [
          { validator: checkTitle, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitCourseware() {
      const formData = new SimpleFormData({
        files: this.fileList,
        title: this.ruleForm.title,
        uploadDate: Date.now(),
      });
      uploadCourseware(this.classId, formData).then(() => {
        this.$emit('fetchData');
        this.ruleForm.title = '';
        this.fileList = [];
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
  },
};
</script>

<style lang="css">
</style>
