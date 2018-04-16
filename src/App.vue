<template>
  <div>
    <el-container>
      <el-header class="top-header">
        <top-header />
      </el-header>
      <el-main class="main-container">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import TopHeader from './containers/TopHeader';
import './style/global.css';

export default {
  name: 'App',
  components: {
    TopHeader,
  },
};
</script>

<style lang="css" scoped>
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 600px;
  box-shadow: 0 0 2.25rem #9da5ab;
  background-color: #fff;
  line-height: 60px;
  z-index: 3;
}

.main-container {
  margin-top: 60px;
  min-width: 600px;
  background-color: #eee;
  min-height: calc(100vh - 60px);
}
</style>
