export default {
  namespaced: true,
  state() {
    return {
      onBoarding: false,
      popupAuth: false,
      popup: false,
      locales: ['ru', 'en'],
      locale: 'ru',
      error: null,
    };
  },
  getters: {
    onBoarding: stateFreezed => stateFreezed.onBoarding,
    popupAuth: stateFreezed => stateFreezed.popupAuth,
    popup: stateFreezed => stateFreezed.popup,
    locales: stateFreezed => stateFreezed.locales,
    locale: stateFreezed => stateFreezed.locale,
  },
  actions: {
    async FETCH({ commit }, url) {
      const response = await this.$axios.$get(url);
      commit('SET_PAGE', response);
    },
  },
  mutations: {
    SET_LANG(state, locale) {
      if (state.locales.indexOf(locale) !== -1) {
        state.locale = locale;
      }
    },
    SET_POPUP(state, status) {
      state.popup = status;
      if (status) document.body.classList.add('overflow');
      else document.body.classList.remove('overflow');
    },
    SET_POPUP_AUTH(state, status) {
      state.popupAuth = status;
    },
    SET_ERROR(state, status) {
      state.error = status;
    },
    SET_ON_BOARDING(state, status) {
      state.onBoarding = status;
    },
  },
};
