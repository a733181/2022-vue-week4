export default {
  namespaced: true,
  state() {
    return {
      currentPage: 1,
      allPage: null,
      showItem: 10,
    };
  },
  getters: {
    currentPage(state) {
      return state.currentPage;
    },
    showItem(state) {
      return state.showItem;
    },
    allPage(state) {
      return state.allPage;
    },
  },
  mutations: {
    setAllPage(state, payload) {
      state.allPage = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    setAllPage(context, payload) {
      context.commit('setAllPage', payload);
      context.dispatch('setCurrentPage', 1);
    },
    setCurrentPage(context, payload) {
      context.commit('setCurrentPage', payload);
    },
  },
};
