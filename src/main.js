import Vue from 'vue';
import {
  Button,
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  Message,
  Container,
  Header,
  Main,
  Row,
  Col,
} from 'element-ui';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
