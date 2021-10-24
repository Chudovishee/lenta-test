import getDefaultState from './state';
import mutations from './mutations';
import getters from './getters';
import MessengerProxyMock from '@/api/MessengerProxyMock';
import createActions from './actions';

export default {
  namespaced: true,
  state: getDefaultState(),
  getters,
  actions: createActions(new MessengerProxyMock()),
  mutations,
};
