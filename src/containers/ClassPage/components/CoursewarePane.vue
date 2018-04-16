<template lang="html">
  <div class="courseware">
    <el-row>
      <el-col :span="12">
        <div>
          <div
            class="courseware-item"
            :key="courseware.uploadDate"
            v-for="courseware in reverseCoursewares"
          >
            <div>
              <span class="courseware-title">{{ courseware.title }}</span>
              <span v-if="$store.state.user.role === 'teacher'">
                <span class="tmcu-btn" @click="editCourseware(courseware)">编辑</span>
                <span class="tmcu-btn" @click="deleteCourseware(courseware)">删除</span>
              </span>
            </div>
            <p class="tmcu-text">{{ formateDate(courseware.uploadDate) }}</p>
            <file-list :files="courseware.files" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="edit-courseware" v-if="$store.state.user.role === 'teacher'">
          <p class="courseware-title">
            {{ editingCourseware ? `编辑课件-${editingCourseware.title}` : '新增课件'}}
          </p>
          <el-input class="edit-title" placeholder="标题(可选)" v-model="title"></el-input>
          <upload-files :files="fileList" @change="val => fileList = val" />
          <div class="edit-courseware-btn" v-if="editingCourseware">
            <el-button :loading="loading" @click="updateCourseware">提交修改</el-button>
            <el-button @click="quitEditCourseware">放弃修改，新增课件</el-button>
          </div>
          <div class="edit-courseware-btn" v-else>
            <el-button :loading="loading" @click="submitCourseware">提交</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadFiles from '@/components/UploadFiles';
import FileList from '@/components/FileList';
import SimpleFormData from '@/utils/simpleFormData';
import utils from '@/utils';
import { uploadCourseware, updateCoursewareApi, deleteCoursewareApi } from '../api';

export default {
  name: 'Courseware',
  components: {
    UploadFiles,
    FileList,
  },
  props: {
    coursewares: {
      type: Array,
    },
    classId: {
      type: String,
    },
  },
  computed: {
    reverseCoursewares() {
      return this.coursewares.map(item => ({
        title: item.title,
        uploadDate: item.uploadDate,
        files: item.files.concat(),
      })).reverse();
    },
  },
  data() {
    return {
      fileList: [],
      title: '',
      editingCourseware: null,
      loading: false,
    };
  },
  methods: {
    editCourseware(courseware) {
      this.editingCourseware = courseware;
      this.title = courseware.title;
      this.fileList = courseware.files;
    },
    quitEditCourseware() {
      this.editingCourseware = null;
      this.title = '';
      this.fileList = [];
    },
    submitCourseware() {
      const realFileList = this.fileList.filter(item => utils.isFile(item));
      const existFiles = this.fileList.filter(item => utils.isPureObject(item));
      this.loading = true;
      const formData = new SimpleFormData({
        files: realFileList,
        existFiles: JSON.stringify(existFiles),
        title: this.title,
        uploadDate: Date.now(),
      });
      uploadCourseware(this.classId, formData).then(() => {
        this.$emit('fetchData');
        this.title = '';
        this.fileList = [];
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error);
      });
    },
    updateCourseware() {
      const realFileList = this.fileList.filter(item => utils.isFile(item));
      const existFiles = this.fileList.filter(item => utils.isPureObject(item));
      this.loading = true;
      const formData = new SimpleFormData({
        files: realFileList,
        existFiles: JSON.stringify(existFiles),
        title: this.title,
      });
      updateCoursewareApi(this.classId, this.editingCourseware.uploadDate, formData).then(() => {
        this.$emit('fetchData');
        this.editingCourseware = null;
        this.title = '';
        this.fileList = [];
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error);
      });
    },
    deleteCourseware(courseware) {
      this.$confirm(`确认删除课件-${courseware.title}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '正在删除...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        deleteCoursewareApi(this.classId, courseware.uploadDate).then(() => {
          loading.close();
          this.$emit('fetchData');
          this.$message.success('删除成功');
        }).catch((error) => {
          loading.close();
          this.$message.error(error);
        });
      }).catch(() => {});
    },
    formateDate(timestamp) {
      return utils.formateDate(+timestamp);
    },
  },
};
</script>

<style lang="css" scoped>
.courseware {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
}

.courseware-item {
  margin-bottom: 20px;
}

.courseware-title {
  font-weight: bold;
}

.edit-courseware {
  padding-left: 10px;
}

.edit-title {
  margin: 10px 0;
}

.edit-courseware-btn {
  margin-top: 20px;
}
</style>
