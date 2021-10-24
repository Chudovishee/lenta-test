import Vue from 'vue';
import Vuex from 'vuex';

import messenger from './messenger';
import getDefaultState from '@/store/state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: getDefaultState(),
  modules: {
    messenger,
  },
});
