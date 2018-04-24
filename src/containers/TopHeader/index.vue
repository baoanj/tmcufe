<template lang="html">
  <div>
    <el-row>
      <el-col :span="12">
        <router-link class="header-link" to="/">
          <img class="logo-img" src="/static/logo.png" alt="高校教学管理系统" />
        </router-link>
      </el-col>
      <el-col :span="12">
        <div v-if="$store.state.user.name" class="profile">
          <span class="profile-msg">
            {{ $store.state.user.name }}
            {{ $store.state.user.role | roleFilter($store.state.user.stuId) }}
          </span>
          <span class="user-img"></span>
          <el-dropdown
            placement="bottom"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="$store.state.user.role === 'student'"
                command="editProfile"
              >修改姓名学号</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      } else if (command === 'logout') {
        this.logout();
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

.logo-img {
  position: relative;
  top: 5px;
}

.user-img {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  position: relative;
  bottom: 10px;
  vertical-align: bottom;
  background-image: url('/static/user.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
