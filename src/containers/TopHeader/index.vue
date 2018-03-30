<template lang="html">
  <div>
    <el-row>
      <el-col :span="12">
        <router-link class="header-link" to="/">高校教学管理系统</router-link>
      </el-col>
      <el-col :span="12">
        <div v-if="user.name" class="profile">
          <span class="profile-msg">
            {{ user.name }} {{ user.role | roleFilter(user.stuId) }} 欢迎你!
          </span>
          <el-button size="mini" @click="logout">退出</el-button>
        </div>
        <div v-else class="profile">
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
      this.$router.push('/login');
    },
    regist() {
      this.$router.push('/regist');
    },
    logout() {
      uerLogout().then(() => {
        this.refreshHeader();
        this.$router.push('/login');
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
.header-link {
  color: #3492ff;
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
}

.profile {
  float: right;
}

.profile-msg {
  color: #3492ff;
  margin-right: 20px;
}
</style>
