<template lang="html">
  <div class="activate-mail">
    <vue-headful
      title="高校教学管理系统 | 激活邮箱"
    />
    <el-button :loading="loading" type="primary" @click="activate">激活</el-button>
  </div>
</template>

<script>
import { activateEmail } from './api';

export default {
  name: 'ActivateEmail',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    activate() {
      this.loading = true;
      activateEmail(this.$route.params.activateId).then(() => {
        this.loading = false;
        this.$router.push('/login');
        this.$message.success('激活成功，请登录');
      }).catch((error) => {
        this.loading = false;
        this.$message.error(error);
      });
    },
  },
};
</script>

<style lang="css" scoped>
.activate-mail {
  text-align: center;
  margin-top: 200px;
}
</style>
