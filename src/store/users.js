import { getUsersQuery } from "./queries";
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const initialize = JSON.parse(localStorage.getItem('user'));
const initialState = {
    status: {
      loggedIn: false
    },
    user: initialize ? { status: { loggedIn: true }, user: initialize } : null
  };

const state = {
  loadingUsers: false,
  users: [],
  initialState
};

const getters = {
  getterLoadingUsers: state => state.loadingUsers,
  getterUsers: state => state.users,
  isAuthenticated: (state) => !!state.user,
  currentUser: (state) => state.user,
};

const mutations = {
  setLoadingUsers: (state, payload) => (state.loadingUsers = payload),
  setUsers: (state, payload) => (state.users = payload),
  loginSuccess(state, user) {
    state.initialState.loggedIn = true;
    state.user = user;
  },
  loginFailure(state) {
    state.initialState.loggedIn = false;
    state.user = null;
  },
  logout(state) {
    state.initialState.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state) {
    state.initialState.loggedIn = false;
  },
  registerFailure(state) {
    state.initialState.loggedIn = false;
  },
  refreshToken(state, accessToken) {
    state.initialState.loggedIn = true;
    state.user = { ...state.user, accessToken: accessToken };
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  getUsers: async ({ commit }) => {
    //commit("setLoadingUsers", true);
    const result = await getUsersQuery();
    if (result && result.data) {
      commit("setUsers", result.data);
      return result.data;
    }
    //commit("setLoadingUsers", false);
  },
  login({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user);
        return Promise.resolve(user);
      },
      error => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  refreshToken({ commit }, accessToken) {
    commit('refreshToken', accessToken);
  },
  logout({ commit }) {
    AuthService.logout();
    commit('logout');
    commit("SET_USER", null);
  },
  delete({ commit }) {
    UserService.delete();
    commit('delete');
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        commit('registerFailure');
        return Promise.reject(error);
      }
    );
  }
};



export default {
  state,
  getters,
  actions,
  mutations
};
