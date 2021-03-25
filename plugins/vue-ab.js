// This code will be injected before initializing the root App
import Vue from 'vue';
import VueAB from '~/components/Ab.vue';


// Usage
// <a-b name="inner title">
//   <p slot="a" class="home--text">Ты переезжаешь в Нью-Йорк! ✈️</p>
//   <p slot="b" class="home--text">Ты переезжаешь в Нью-Йорк!</p>
// </a-b>

// Activate plugin
Vue.component('a-b', VueAB);
