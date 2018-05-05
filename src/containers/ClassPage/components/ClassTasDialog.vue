<template lang="html">
  <el-dialog
    title="助教"
    :visible="visible"
    @close="closeDialog"
  >
    <div v-if="!editing">
      <div v-if="$store.state.user.role === 'teacher'">
        <el-button type="text" @click="editing = true">编辑</el-button>
      </div>
      <div v-for="ta in tas" :key="ta.email">
        <span class="tmcu-text">{{ ta.name }}:</span>
        <a class="mail-btn" :href="`mailto:${ta.email}`">{{ ta.email }}</a>
      </div>
    </div>
    <div v-if="editing && $store.state.user.role === 'teacher'">
      <div v-for="ta in tas" :key="ta.email">
        <span class="tmcu-text">{{ ta.name }}: {{ ta.email }}</span>
        <el-button type="text" icon="el-icon-close" @click="removeTa(ta.email)"></el-button>
      </div>
      <br />
      <el-row :gutter="10">
        <el-col :span="4"><span class="tmcu-text">新增助教:</span></el-col>
        <el-col :span="7">
          <el-input v-model="taName" size="small" placeholder="助教姓名"></el-input>
        </el-col>
        <el-col :span="10">
          <el-input v-model="taEmail" size="small" placeholder="助教邮箱"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="text" @click="addNewTa">添加</el-button>
        </el-col>
      </el-row>
      <br />
      <div>
        <el-button type="primary" :loading="loading" @click="submitClassTas">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { updateClassTas } from '../api';

export default {
  name: 'ClassTasDialog',
  props: {
    classId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tas: [],
      visible: false,
      loading: false,
      editing: false,
      taName: '',
      taEmail: '',
    };
  },
  methods: {
    show(tas) {
      this.tas = tas;
      this.visible = true;
      this.editing = !tas.length;
      this.taName = '';
      this.taEmail = '';
    },
    submitClassTas() {
      this.loading = true;
      updateClassTas(this.classId, { tas: this.tas }).then(() => {
        this.loading = false;
        this.editing = false;
        this.taName = '';
        this.taEmail = '';
        this.$emit('fetchData');
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error);
      });
    },
    removeTa(email) {
      this.tas = this.tas.filter(item => item.email !== email);
    },
    addNewTa() {
      if (this.taName === '' || this.taEmail === '') {
        this.$message.error('表单信息不能为空');
      } else {
        this.tas.push({
          name: this.taName,
          email: this.taEmail,
        });
        this.taName = '';
        this.taEmail = '';
      }
    },
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-btn {
  color: $tmcu-primary-color;
  font-size: $tmcu-font-size;
  text-decoration: none;
  &:hover {
    color: $tmcu-primary-hover-color;
  }
}
</style>
