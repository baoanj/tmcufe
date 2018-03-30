import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home';
import RegistPage from '@/containers/LoginRegist/RegistPage';
import LoginPage from '@/containers/LoginRegist/LoginPage';
import ClassPage from '@/containers/ClassPage';
import NotFound from '@/containers/NotFound';

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
      path: '/class/:classId',
      name: 'ClassPage',
      component: ClassPage,
    },
    {
      path: '/*',
      component: NotFound,
    },
  ],
});
