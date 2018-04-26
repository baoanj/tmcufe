<template>
  <div>
    <el-container>
      <el-header class="top-header">
        <top-header />
      </el-header>
      <el-main class="main-container">
        <transition :enter-active-class="enterActiveClass">
          <router-view />
        </transition>
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
  data() {
    return {
      enterActiveClass: 'animated slideInRight',
    };
  },
  watch: {
    $route(to, from) {
      if (!this.$router.prePages) this.$router.prePages = [];
      if (to.name === this.$router.prePages[this.$router.prePages.length - 1]) {
        this.enterActiveClass = 'animated slideInLeft';
        this.$router.prePages.pop();
      } else {
        this.enterActiveClass = 'animated slideInRight';
        this.$router.prePages.push(from.name);
      }
    },
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
  overflow: hidden;
}

.page-loading {
  position: absolute;
}

.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

@keyframes slideInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInLeft {
  animation-name: slideInLeft;
}

@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInRight {
  animation-name: slideInRight;
}
</style>
