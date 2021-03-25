export default {
  namespaced: true,
  state() {
    return {
      courses: [],
      info: {
        points: 0,
      },
      order: 0,
    };
  },
  getters: {
    courses: stateFreezed => stateFreezed.courses,
    order: stateFreezed => stateFreezed.order,
    info: stateFreezed => stateFreezed.info,
  },
  actions: {
    async FETCH() {
      // const response = await this.$axios.$get(url);
    },
    async REGISTRATION({ dispatch }, data) {
      const response = await this.$axios.$post('api/v1/register', data);
      if (response.code === 200) dispatch('LOGIN', data);
    },
    async LOGIN({ dispatch }, data) {
      const response = await this.$axios.$post('api/v1/login', data);
      if (response.code === 'ok') dispatch('GET_USER');
    },
    async LOGOUT() {
      await this.$axios.$get('api/v1/logout');
    },
    async GET_USER({ commit }) {
      await this.$axios.$get('api/v1/user')
        .then((response) => {
          commit('SET_USER_INFO', response);
        })
        .catch((error) => {
          commit('SET_USER_INFO', error.response.data);
        });
    },
    async GET_USER_COURSES({ commit }) {
      const response = await this.$axios.$get('api/v1/user/courses');
      commit('SET_USER_COURSES', response);
    },
    async SET_LESSON_STATUS({ }, data) {
      await this.$axios.$put(`/api/v1/user/course/${data.courseId}/${data.lessonId}`, { lesson: data });
      // commit('SET_USER_COURSES', response);
    },

    async SET_NEW_ORDER({ commit }, data) {
      const response = await this.$axios.$post('/api/v1/orders/create', data);
      commit('SET_ORDER_NUMBER', response);
    },
  },
  mutations: {
    SET_REGISTRATION_STATUS(state, response) {
      state.info = response;
    },
    SET_USER_INFO(state, response) {
      state.info = response;
    },
    SET_USER_COURSES(state, response) {
      state.courses = response;
    },
    SET_PAYMENT_STATUS(state, status) {
      const newInfo = state.info;
      newInfo.paid = status;
      state.info = newInfo;
    },
    UPDATE_POINTS(state, add) {
      const newInfo = Object.assign({}, state.info);
      if (!newInfo.points) newInfo.points = 0;
      newInfo.points += add;
      state.info = newInfo;
    },
    CLEAR_POINTS(state) {
      const newInfo = state.info;
      newInfo.points = 0;
      state.info = newInfo;
    },
    SET_ORDER_NUMBER(state, response) {
      state.order = response;
    },
  },
};
