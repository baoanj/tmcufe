<template lang="html">
  <div>
    <vue-headful
      :title="$route.meta.title"
    />
    <page-loading v-if="loading || error" :loading="loading" :error="error" />
    <div v-if="!loading && !error && $store.state.user.email">
      <div class="home-operate-container">
        <div class="home-operate-content">
          <el-button
            v-if="$store.state.user.role === 'teacher'"
            type="primary"
            @click="addClass"
          >新建班级</el-button>
          <el-button
            v-if="$store.state.user.role === 'student'"
            type="primary"
            @click="enterClass"
          >添加班级</el-button>
          <el-button
            v-if="!moving"
            type="primary"
            @click="moving = true"
          >移动班级</el-button>
          <el-button
            v-if="moving"
            type="primary"
            @click="cancelMove"
          >放弃移动</el-button>
          <el-button
            v-if="moving"
            type="primary"
            :loading="moveLoading"
            @click="submitMove"
          >提交移动</el-button>
          <span v-if="moving" class="move-note">拖动下方卡片即可移动</span>
        </div>
      </div>
      <div v-if="moving">
        <vue-draggable :options="draggableOptions" v-model="sortableMoveClasses">
          <transition-group>
            <class-card
              v-for="classs in sortableMoveClasses"
              :key="classs.classId"
              :classs="classs"
              :move="moving"
            />
          </transition-group>
        </vue-draggable>
      </div>
      <div v-else>
        <class-card
          v-for="classs in sortableClasses"
          :key="classs.classId"
          :classs="classs"
          :move="moving"
        />
      </div>
      <add-class-dialog
        v-if="$store.state.user.role === 'teacher'"
        :dialogVisible="addClassDialogVisible"
        @hideDialog="addClassDialogVisible = false"
        @fetchData="fetchData"
      />
      <enter-class-dialog
        v-if="$store.state.user.role === 'student'"
        :dialogVisible="enterClassDialogVisible"
        @hideDialog="enterClassDialogVisible = false"
        @fetchData="fetchData"
      />
    </div>
  </div>
</template>

<script>
import PageLoading from '@/components/PageLoading';
import { getClasses, submitMoveClasses } from './api';
import ClassCard from './components/ClassCard';
import AddClassDialog from './components/AddClassDialog';
import EnterClassDialog from './components/EnterClassDialog';

export default {
  name: 'Home',
  components: {
    ClassCard,
    AddClassDialog,
    EnterClassDialog,
    PageLoading,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      classes: [],
      classIds: [],
      moveClassIds: [],
      addClassDialogVisible: false,
      enterClassDialogVisible: false,
      moving: false,
      draggableOptions: {
        ghostClass: 'ghost-move',
      },
      moveLoading: false,
      loading: false,
      error: false,
    };
  },
  computed: {
    sortableClasses() {
      // 一种实现
      // const result = [];
      // for (let i = 0; i < this.classIds.length; i += 1) {
      //   for (let j = 0; j < this.classes.length; j += 1) {
      //     if (this.classes[j].classId === this.classIds[i]) {
      //       result.push(this.classes[j]);
      //     }
      //   }
      // }

      // 另一种实现
      const classesObj = {};
      for (let i = 0; i < this.classes.length; i += 1) {
        classesObj[this.classes[i].classId] = this.classes[i];
      }
      const result = [];
      for (let i = 0; i < this.classIds.length; i += 1) {
        result.push(classesObj[this.classIds[i]]);
      }
      return result;
    },
    sortableMoveClasses: {
      get() {
        const classesObj = {};
        for (let i = 0; i < this.classes.length; i += 1) {
          classesObj[this.classes[i].classId] = this.classes[i];
        }
        const result = [];
        for (let i = 0; i < this.moveClassIds.length; i += 1) {
          result.push(classesObj[this.moveClassIds[i]]);
        }
        return result;
      },
      set(val) {
        const newClassIds = [];
        for (let i = 0; i < val.length; i += 1) {
          newClassIds.push(val[i].classId);
        }
        this.moveClassIds = newClassIds;
      },
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.error = false;
      getClasses().then((data) => {
        this.loading = false;
        this.classes = data.classes;
        this.classIds = data.classIds;
        this.moveClassIds = data.classIds;
      }).catch((error) => {
        this.loading = false;
        this.error = true;
        this.$message.error(error);
      });
    },
    addClass() {
      this.addClassDialogVisible = true;
    },
    enterClass() {
      this.enterClassDialogVisible = true;
    },
    submitMove() {
      this.moveLoading = true;
      submitMoveClasses({ classIds: this.moveClassIds }).then(() => {
        this.moveLoading = false;
        this.fetchData();
        this.moving = false;
      }).catch((error) => {
        this.moveLoading = false;
        this.$message.error(error);
      });
    },
    cancelMove() {
      this.moving = false;
      this.moveClassIds = this.classIds;
    },
  },
};
</script>

<style lang="scss" scoped>
.ghost-move {
  opacity: 0.5;
}

.home-operate-container {
  padding: 10px;
}

.home-operate-content {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px;
}

.move-note {
  padding-left: 10px;
  font-size: $tmcu-font-size;
  color: $tmcu-text-color;
}

.default-home {
  width: 100%;
  height: calc(100vh - $header-height - $main-padding * 2);
  background-image: url('/static/logo.png');
  background-position: center;
  background-repeat: no-repeat;
}
</style>
