import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home';
import RegistPage from '@/containers/LoginRegist/RegistPage';
import LoginPage from '@/containers/LoginRegist/LoginPage';
import ForgotPassword from '@/containers/LoginRegist/ForgotPassword';
import ResetPassword from '@/containers/LoginRegist/ResetPassword';
import ActivateEmail from '@/containers/LoginRegist/ActivateEmail';
import ClassPage from '@/containers/ClassPage';
import NotFound from '@/containers/NotFound';
import HomeworkPage from '@/containers/HomeworkPage';

Vue.use(Router);

/*
 * meta.auth
 * 0 - 登录和未登录均可访问
 * 1 - 未登录才可访问，已登录的会跳转到首页
 * 2 - 已登录才可访问，未登录的会跳转到登录页
*/

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '高校教学管理系统',
        auth: 2,
      },
    },
    {
      path: '/regist',
      name: 'RegistPage',
      component: RegistPage,
      meta: {
        title: '高校教学管理系统 | 注册',
        auth: 1,
      },
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        title: '高校教学管理系统 | 登录',
        auth: 1,
      },
    },
    {
      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: '高校教学管理系统 | 忘记密码',
        auth: 1,
      },
    },
    {
      path: '/reset/:resetId([a-f0-9]{24})',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: {
        title: '高校教学管理系统 | 重置密码',
        auth: 1,
      },
    },
    {
      path: '/activate/:activateId([a-f0-9]{24})',
      name: 'ActivateEmail',
      component: ActivateEmail,
      meta: {
        title: '高校教学管理系统 | 激活邮箱',
        auth: 1,
      },
    },
    {
      path: '/class/:classId',
      name: 'ClassPage',
      component: ClassPage,
      meta: {
        title: '高校教学管理系统 | 班级',
        auth: 2,
      },
    },
    {
      path: '/hw/:classId/:createDate([0-9]{13})',
      name: 'HomeworkPage',
      component: HomeworkPage,
      meta: {
        title: '高校教学管理系统 | 作业',
        auth: 2,
      },
    },
    {
      path: '/*',
      component: NotFound,
      meta: {
        title: '高校教学管理系统 | 页面不存在',
        auth: 0,
      },
    },
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 0);
    });
  },
});
