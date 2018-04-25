import router from '@/router';
import store from '@/store';

router.beforeEach((to, from, next) => {
  if (to.meta.auth === 1 && store.state.user.email) {
    next('/');
  } else if (to.meta.auth === 2 && !store.state.user.email) {
    next('/login');
  } else {
    next();
  }
});
