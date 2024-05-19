// src/store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('access_token'),
    urbanizacion: JSON.parse(localStorage.getItem('urbanizacion')) || null,
    role: localStorage.getItem('role') || ''
  },
  mutations: {
    setAuthentication(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      state.urbanizacion = payload.urbanizacion;
      state.role = payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.urbanizacion = null;
      state.role = '';
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('urbanizacion');
    }
  },
  actions: {
    login({ commit }, urbanizacion) {
      commit('setAuthentication', {
        isAuthenticated: true,
        urbanizacion,
        role: localStorage.getItem('role')
      });
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    urbanizacion: state => state.urbanizacion,
    role: state => state.role
  }
});
