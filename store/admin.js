export default {
  namespaced: true,
  state() {
    return {
      courses: [],
      course: {},
    };
  },
  getters: {
    courses: stateFreezed => stateFreezed.courses,
    course: stateFreezed => stateFreezed.course,
  },
  actions: {
    async ADD_COURSE({ dispatch }, data) {
      const response = await this.$axios.$post('api/v1/courses', data);
      if (response.code === 200) dispatch('GET_COURSES');
    },
    async GET_COURSES({ commit }) {
      const response = await this.$axios.$get('api/v1/courses');
      commit('SET_COURSES', response);
    },
    async UPDATE_COURSE({ dispatch }, data) {
      const response = await this.$axios.$put(`api/v1/courses/${data._id}`, data);
      if (response.code === 200) dispatch('GET_COURSE');
    },
    async GET_COURSE({ commit }, id) {
      const response = await this.$axios.$get(`api/v1/courses/${id}`);
      commit('SET_COURSE', response);
    },
    async DELETE_COURSE({ commit }, id) {
      const response = await this.$axios.$delete(`api/v1/courses/${id}`);
      commit('SET_COURSE', response);
    },
  },
  mutations: {
    SET_COURSES(state, response) {
      state.courses = response;
    },
    SET_COURSE(state, response) {
      state.course = response;
    },
  },
};
