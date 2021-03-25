export default {
  state() {
    return {
      continue: false,
      questions: [],
      personage: '',
      inventory: false,
      dialog: [],
      videos: [],
      voice: '',
      words: [],
      flow: '',
      info: {},
    };
  },
  getters: {
    questions: stateFreezed => stateFreezed.questions,
    personage: stateFreezed => stateFreezed.personage,
    inventory: stateFreezed => stateFreezed.inventory,
    continue: stateFreezed => stateFreezed.continue,
    dialog: stateFreezed => stateFreezed.dialog,
    videos: stateFreezed => stateFreezed.videos,
    voice: stateFreezed => stateFreezed.voice,
    words: stateFreezed => stateFreezed.words,
    flow: stateFreezed => stateFreezed.flow,
    info: stateFreezed => stateFreezed.info,
  },
  actions: {
  },
  mutations: {
    SET_QUESTIONS(state, list) {
      state.questions = list;
    },
    SET_LESSON(state, status) {
      state.info = status;
    },
    SET_DIALOG(state, list) {
      state.dialog = list;
    },
    SET_PERSONAGE(state, person) {
      state.personage = person;
    },
    SET_INVENTORY(state, list) {
      state.inventory = list;
    },
    SET_VOICE(state, type) {
      state.voice = type;
    },
    SET_NEW_WORDS(state, list) {
      state.words = list;
    },
    SET_FLOW(state, id) {
      state.flow = id;
    },
    SET_VIDEOS(state, list) {
      state.videos = list;
    },
    CLEAR_ALL(state) {
      state.inventory = false;
      state.questions = [];
      state.personage = '';
      state.dialog = [];
      state.videos = [];
      state.voice = '';
      state.words = [];
      state.flow = '';
    },
    CONTINUE(state) {
      state.continue = true;
    },
  },
};
