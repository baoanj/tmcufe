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

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/regist',
      name: 'RegistPage',
      component: RegistPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/reset/:resetId',
      name: 'ResetPassword',
      component: ResetPassword,
    },
    {
      path: '/activate/:activateId',
      name: 'ActivateEmail',
      component: ActivateEmail,
    },
    {
      path: '/class/:classId',
      name: 'ClassPage',
      component: ClassPage,
    },
    {
      path: '/hw/:classId/:createDate',
      name: 'HomeworkPage',
      component: HomeworkPage,
    },
    {
      path: '/*',
      component: NotFound,
    },
  ],
});
