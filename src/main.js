import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import vueHeadful from 'vue-headful';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.component('vue-headful', vueHeadful);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
