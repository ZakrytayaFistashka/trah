<template>
  <div :class="['authentication', { 'authentication-active': popupAuth }]">
    <div class="authentication--exit" @click="closeAuth()">
      <div class="authentication--exit-button"/>
    </div>
    <div class="authentication--form">
      <the-sign/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheSign from '~/components/TheSign.vue';

export default {
  components: {
    TheSign,
  },

  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },

  computed: mapGetters({
    popupAuth: 'page/popupAuth',
    info: 'user/info',
  }),

  methods: {
    closeAuth() {
      if (process.env.NODE_ENV === 'production' && window.amplitude) window.amplitude.getInstance().logEvent('sign / close');
      this.$store.commit('page/SET_POPUP_AUTH', false);
      this.$store.commit('page/SET_POPUP', false);
    },

    async register() {
      const data = {
        email: this.email,
        password: this.password,
        name: 'Roma',
        surname: 'Kosovichev',
      };
      this.loading = true;
      try {
        await this.$store.dispatch('user/REGISTRATION', data);
      } catch (error) {
        console.log(error);
      } finally {
        this.$router.push('/course/');
        this.closeAuth();
      }
    },
  },
};
</script>

<style>
.authentication{
  transition: opacity .5s ease-in-out;
  pointer-events: none;
  position: fixed;
  z-index: 999;
  height: 100%;
  width: 100%;
  opacity: 0;
  left: 0;
  top: 0;

  &-active{
    pointer-events: all;
    opacity: 1;
  }

  &--exit{
    background: rgba(62, 145, 244, .8);
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }

  &--form{
    transform: translate3d(-50%, -50%, 0);
    display: inline-block;
    position: relative;
    min-width: 300px;
    left: 50%;
    top: 50%;
  }
}
</style>
