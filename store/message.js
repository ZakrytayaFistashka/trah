export default {
  namespaced: true,
  state() {
    return {
      translations: {},
      errors: {},
    };
  },
  getters: {
    translations: stateFreezed => stateFreezed.translations,
    errors: stateFreezed => stateFreezed.errors,
  },
  actions: {
    async TRANSLATE_TEXT({ commit }, data) {
      const response = await this.$axios.$get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190309T123510Z.577ce6082794b596.c8b47651d463a373fe49c7cfd7efc5db6253066c&text=${data.text}&lang=en-ru&format=plain`);
      commit('SET_TRANSLATION', { translate: response, id: data.text });
    },
    async CHECK_TEXT_ERRORS({ commit }, data) {
      const text = data.text.replace(/\s/, '+');
      const response = await this.$axios.$get(`https://api.textgears.com/check.php?text=${text}&key=eKczDtRZWsN37kcq`);
      commit('SET_TEXT_ERRORS', { errors: response, id: data.id });
    },
  },
  mutations: {
    SET_TRANSLATION(state, data) {
      const translationsNew = Object.assign({}, state.translations);
      translationsNew[data.id] = data.translate;
      state.translations = translationsNew;
    },

    TRANSLATE_CLEAR(state) {
      state.translations = {};
    },

    SET_TEXT_ERRORS(state, data) {
      const errorsNew = Object.assign({}, state.errors);
      errorsNew[data.id] = data.errors;
      state.errors = errorsNew;
    },

    CLEAR_TEXT_ERRORS(state) {
      state.errors = {};
    },
  },
};
