<template>
  <div>
    <el-container>
      <el-header :class="headerClass" height="60px">
        <top-header />
      </el-header>
      <el-main class="main-container">
        <transition :enter-active-class="enterActiveClass">
          <router-view />
        </transition>
      </el-main>
    </el-container>
    <div v-if="scrollTop > 400" class="scroll-top tmcu-btn" @click="backTop">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>

<script>
import TopHeader from './containers/TopHeader';
import './style/global.scss';

export default {
  name: 'App',
  components: {
    TopHeader,
  },
  mounted() {
    window.onscroll = this.scroll;
  },
  data() {
    return {
      enterActiveClass: 'animated slideInRight',
      scrollTop: 0,
      scrollStepPx: 0,
      scrollDirection: 'top',
      headerClass: {
        'top-header': true,
      },
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
  methods: {
    scroll() {
      const top = document.body.scrollTop + document.documentElement.scrollTop;
      if (top > this.scrollTop) this.scrollDirection = 'down';
      else this.scrollDirection = 'top';
      this.scrollTop = top;
      this.headerClass = {
        'top-header': true,
        'top-header-gone': this.scrollTop > 100 && this.scrollDirection === 'down',
        'top-header-back': this.scrollDirection === 'top',
      };
    },
    backTop() {
      this.scrollStepPx = this.scrollTop / 30;
      window.requestAnimationFrame(this.scrollStep);
    },
    scrollStep() {
      this.scrollTop -= this.scrollStepPx;
      document.body.scrollTop = this.scrollTop;
      document.documentElement.scrollTop = this.scrollTop;
      if (this.scrollTop > 0) {
        window.requestAnimationFrame(this.scrollStep);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$app-background-color: #fff;
$container-background-color: #eee;
$app-min-width: 600px;
$back-top-size: 40px;

.top-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: $app-min-width;
  box-shadow: 0 0 20px #9da5ab;
  background-color: $app-background-color;
  line-height: $header-height;
  z-index: 3;
  transition: all 0.5s;
  &-gone {
    top: -80px;
  }
  &-back {
    top: 0;
  }
}

.main-container {
  margin-top: $header-height;
  min-width: $app-min-width;
  background-color: $container-background-color;
  min-height: calc(100vh - $header-height);
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

.scroll-top {
  width: $back-top-size;
  height: $back-top-size;
  position: fixed;
  right: 20px;
  bottom: 30px;
  background-color: $app-background-color;
  border-radius: 50%;
  text-align: center;
  line-height: $back-top-size;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 2px 2px 6px rgba(0,0,0,.12);
  z-index: 5;
  &:hover {
    box-shadow: 2px 2px 6px rgba(0,0,0,.22);
  }
}
</style>
