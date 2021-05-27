import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darktheme: false,
  },
  mutations: {
    changedarktheme(state, newdarktheme) {
      state.darktheme = newdarktheme;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getdarktheme: state => state.darktheme,
  },
});
