<template lang="html">
  <div class="top-header">
    <el-row>
      <el-col :span="12">
        <router-link to="/">高校教学管理系统</router-link>
      </el-col>
      <el-col :span="12">
        <div v-if="user.name" class="">
          <p>{{ user.name }} {{ user.role | roleFilter(user.stuId) }} 欢迎你!</p>
          <el-button @click="logout">退出</el-button>
        </div>
        <div v-else class="">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="regist">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { uerLogout } from './api';

export default {
  name: 'TopHeader',
  computed: mapState([
    'user',
  ]),
  created() {
    this.refreshHeader();
  },
  methods: {
    login() {
      this.$router.push('login');
    },
    regist() {
      this.$router.push('regist');
    },
    logout() {
      uerLogout().then(() => {
        this.refreshHeader();
        this.$router.push('login');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    ...mapActions([
      'refreshHeader',
    ]),
  },
  filters: {
    roleFilter(role, stuId) {
      return role === 'teacher' ? '老师' : `(${stuId}) 同学`;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
