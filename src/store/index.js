import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/utils/axios';

Vue.use(Vuex);

const state = {
  user: {
    name: '',
    stuId: '',
    email: '',
    role: '',
  },
  back: false,
};

const actions = {
  refreshHeader: () => new Promise((resolve) => {
    axios.get('/api/general/profile')
      .then((result) => {
        if (result.stats === 1) {
          state.user = result.data.profile;
        } else {
          state.user = {
            name: '',
            stuId: '',
            email: '',
            role: '',
          };
        }
        resolve();
      })
      .catch(() => {
        state.user = {
          name: '',
          stuId: '',
          email: '',
          role: '',
        };
        resolve();
      });
  }),
  setBackTrue() {
    state.back = true;
  },
  setBackFalse() {
    state.back = false;
  },
};

export default new Vuex.Store({
  state,
  actions,
});
