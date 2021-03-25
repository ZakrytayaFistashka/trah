export default {
  namespaced: true,
  state() {
    return {
      talk: false,
    };
  },
  getters: {
    talk: stateFreezed => stateFreezed.talk,
  },
  actions: {
  },
  mutations: {
    SET_TALK(state, status) {
      state.talk = status;
    },
  },
};
