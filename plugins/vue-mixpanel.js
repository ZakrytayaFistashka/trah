import Vue from 'vue';
// Turn on mixpanel.js

const mixpanel = {
  inserted: (el, event) => {
    if (process.env.NODE_ENV === 'production') {
      el.onclick = () => {
        if (event.value.name) window.mixpanel.track(event.value.name);
        else window.mixpanel.track(event.value);
      };
    }
  },
};

// Activate plugin
Vue.directive('mixpanel', mixpanel);
