import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/utils/axios';

Vue.use(Vuex);

const state = {
  user: {
    name: '',
    stuId: '',
    role: '',
  },
};

const actions = {
  refreshHeader: () => {
    axios.get('/api/general/profile')
      .then((result) => {
        if (result.stats === 1) {
          state.user = result.data.profile;
        } else {
          state.user = {
            name: '',
            stuId: '',
            role: '',
          };
        }
      })
      .catch(() => {
        state.user = {
          name: '',
          stuId: '',
          role: '',
        };
      });
  },
};

export default new Vuex.Store({
  state,
  actions,
});
