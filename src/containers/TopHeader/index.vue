<template lang="html">
  <div>
    <el-row>
      <el-col :span="12">
        <router-link class="header-link" to="/">高校教学管理系统</router-link>
      </el-col>
      <el-col :span="12">
        <div v-if="$store.state.user.name" class="profile">
          <span class="profile-msg">
            {{ $store.state.user.name }}
            {{ $store.state.user.role | roleFilter($store.state.user.stuId) }}
          </span>
          <el-dropdown
            v-if="$store.state.user.role === 'student'"
            placement="bottom"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="editProfile">修改姓名学号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button class="logout-btn" size="mini" @click="logout">退出</el-button>
        </div>
        <div v-else class="profile">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="regist">注册</el-button>
        </div>
      </el-col>
    </el-row>
    <edit-profile-dialog
      ref="editProfileDialogRef"
    />
  </div>
</template>

<script>
import { uerLogout } from './api';
import EditProfileDialog from './components/EditProfileDialog';

export default {
  name: 'TopHeader',
  created() {
    this.$store.dispatch('refreshHeader');
  },
  components: {
    EditProfileDialog,
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
        this.$store.dispatch('refreshHeader');
        this.$router.push('/login');
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    handleCommand(command) {
      if (command === 'editProfile') {
        this.$refs.editProfileDialogRef.show(this.$store.state.user.name,
          this.$store.state.user.stuId);
      }
    },
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
  color: #409EFF;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  display: inline-block;
  width: 25px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.logout-btn {
  margin-left: 10px;
}
</style>
