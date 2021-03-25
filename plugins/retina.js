import Vue from 'vue';
// Add doc class and doc type for links to the files

const retina = {
  inserted: (el) => {
    if (window.devicePixelRatio > 1) {
      el.className += ' app-retina';
    }
  },
};

// Activate plugin
Vue.directive('is-retina', retina);
