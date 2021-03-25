<template>
  <menu class="menu">
    <div v-mixpanel="'burger'" :class="['menu--burger', {'menu--burger-active': burger}]" @click="toggleBurger()">
      <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.835495 15.2836L0.835495 11.2836L30.974 11.2836V15.2836L0.835495 15.2836Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.835495 25.8074L0.835495 21.8074H30.974V25.8074L0.835495 25.8074Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.835495 4.75974L0.835495 0.759735L30.974 0.759735V4.75974L0.835495 4.75974Z" fill="white"/>
      </svg>
    </div>

    <div class="menu-wrap">
      <nuxt-link :to="isLearningCenter() ? $tpath('/course/') : $tpath('/')" class="no-link">
        <img src="~/assets/logo.svg"/>
      </nuxt-link>

      <div v-if="user && user.name" class="menu-wrap--profile">
        <span :class="{'menu-wrap--profile-disabled': isLesson()}">
          <span class="menu-wrap--profile-name">{{ user.name }}</span>
          <img src="~/assets/icons/profile-icon.svg"/>
          <img class="menu-wrap--profile-exit" src="~/assets/icons/exit.svg" @click="logout()"/>
        </span>

        <div class="menu--score">
          <img class="menu--score-pic" src="~/assets/icons/star.svg"/>
          <span class="menu--score-total">{{ user.points || 0 }}</span>
        </div>
      </div>

      <div v-mixpanel="'login / header'" v-else-if="user && user.code === 401" class="menu-wrap--login">
        <!-- <span class="menu-wrap--login-start">Log in</span> -->
        <button class="menu-wrap--login-sign" @click="openAuth()" v-html="$t('global.sign')"/>
      </div>
    </div>

    <div :class="['menu--list', {'menu--list-active': burger}]" @click="toggleBurger()">
      <h3 class="menu--list-title"><nuxt-link :to="$tpath('/')" v-html="$t('global.home')"/></h3>
      <h3 class="menu--list-title">
        <nuxt-link v-if="user && user.name" :to="$tpath('/course/')" v-html="$t('global.learning_centre')"/>
        <a v-else nohref @click="openAuth()" v-html="$t('global.learning_centre')"/>
      </h3>
      <ul>
        <li v-if="user && user.name">
          <nuxt-link :to="$tpath('/course/main/')" v-html="$t('projects.relocation')"/>
        </li>
        <li v-else>
          <a nohref @click="openAuth()" v-html="$t('projects.relocation')"/>
        </li>
        <li @click.stop.prevent>
          <span class="menu--list-soon" nohref v-html="$t('projects.interview')"/>
          <img class="menu--list-lock" src="~/assets/icons/lock.svg"/>
          <span class="coming-soon" v-html="$t('global.soon')"/>
        </li>
        <li @click.stop.prevent>
          <span class="menu--list-soon" nohref v-html="$t('projects.travel_short')"/>
          <img class="menu--list-lock" src="~/assets/icons/lock.svg"/>
          <span class="coming-soon" v-html="$t('global.soon')"/>
        </li>
      </ul>
      <h3 class="menu--list-title"><nuxt-link :to="$tpath('/contacts/')" v-html="$t('global.about')"/></h3>
    </div>
  </menu>
</template>

<script>
import { mapGetters } from 'vuex';

import isHomePage from '~/mixins/PageIsHome.vue';

export default {
  mixins: [isHomePage],

  data() {
    return {
      burger: false,
    };
  },

  computed: mapGetters({
    locales: 'page/locales',
    user: 'user/info',
  }),

  methods: {
    toggleBurger() {
      this.burger = !this.burger;
    },

    async logout() {
      try {
        this.$store.dispatch('user/LOGOUT');
      } catch (error) {
        console.log(error);
      } finally {
        // this.$router.push('/');
        document.location.reload(true);
      }
    },

    isLearningCenter() {
      const identify = this.$route.name;
      const pageNames = ['course', 'lang-course', 'course-main', 'lang-course-main'];
      let learningCenter = false;
      pageNames.forEach((page) => {
        if (identify === page) learningCenter = true;
      });
      return learningCenter;
    },

    isLesson() {
      return this.$route.name.indexOf('course-main-') > -1;
    },

    openAuth() {
      if (!this.user || !this.user.name) {
        // if (process.env.NODE_ENV === 'production') window.amplitude.getInstance().logEvent('login / menu');
        this.$store.commit('page/SET_POPUP_AUTH', true);
        this.$store.commit('page/SET_POPUP', true);
      } else this.$router.push('/course/');
    },
  },
};
</script>

<style>
.menu{
  &-wrap{
    background: transparent;
    text-align: center;
    position: fixed;
    padding: 14px 0 12px;
    z-index: 990;
    width: 100%;
    left: 0;
    top: 0;

    &--login,
    &--profile{
      position: absolute;
      color: white;
      height: auto;
      right: 20px;
      top: 15px;

      &-disabled{
        pointer-events: none;
        opacity: 0;
      }

      &-name{
        position: relative;
        margin-right: 7px;
        font-weight: 600;
      }

      &-exit{
        transition: all .3s ease-in-out;
        position: relative;
        cursor: pointer;
        width: 15px;
        left: -7px;
        top: -11px;

        &:hover{
          transform: scale(1.1);
        }
      }

      img{
        max-width: 30px;
      }

      &-name,
      img{
        vertical-align: middle;
        display: inline-block;
      }
    }

    &--profile{
      min-height: 30px;
    }

    &--login{
      top: 12px;
    }
  }

  &--burger{
    position: fixed;
    cursor: pointer;
    z-index: 999;
    width: 40px;
    left: 20px;
    top: 17px;

    svg {
      max-width: 100%;
      height: auto;
      path{
        transition: all .3s ease-in-out;
        fill: $dark;

        .menu-learning &{
          fill: white;
        }
      }
    }

    &-active{
      svg path {
        fill: white;
      }
    }
  }

  &--score{
    vertical-align: middle;
    display: inline-block;
    margin-left: 0;
    font-size: 120%;
    min-width: 35px;
    /*right: 38px;*/
    /*top: 17px;*/

    &-total,
    &-pic{
      vertical-align: middle;
      display: inline-block;
    }

    &-pic{
      width: 25px;
    }

    &-total{
      margin-left: 4px;
      color: $dark;

      .menu-learning &{
        color: white;
      }
    }
  }

  &--list{
    transition: transform .3s ease-in-out;
    transform: translate3d(-250px, 0, 0);
    padding: 80px 20px 0;
    background: rgba(110, 182, 231, 0.9);
    /*background: white;*/
    pointer-events: none;
    position: fixed;
    color: black;
    width: 200px;
    height: 100%;
    z-index: 99;
    left: 0;
    top: 0;

    &-user{
      margin-top: 40px;
      display: block;
    }

    &-soon{
      font-weight: 300;
      color: white;
    }

    &-lock {
      max-height: 15px;
      margin: 0 6px;
    }

    &-logout{
      transition: all .3s ease-in-out;
      vertical-align: middle;
      display: inline-block;
      margin-left: 5px;
      cursor: pointer;
      width: 15px;
      &:hover {
        opacity: 0.7;
      }
    }

    &-title{
      margin-top: 15px;
      margin-bottom: 0;
      font-weight: 300;
    }

    &-active{
      transform: translate3d(0, 0, 0);
      pointer-events: all;
    }

    ul {
      margin-top: 6px;
      font-size: 80%;

      li{
        margin-left: 0;

        .nuxt-link-active{
          font-weight: 600;
        }

        &:hover{
          .coming-soon{
            opacity: 1;
          }
        }

        &:before{
          display: none;
        }
      }
    }

    a{
      &:hover{
        color: $dark;
      }
    }

    a.nuxt-link-exact-active{
      font-weight: 600;
    }

    a.nuxt-link-exact-active:hover,
    a.nuxt-link-active:hover,
    a{
      border-bottom: 0;
      color: white;
    }
  }

  button{
    padding: 10px 20px;
    background: white;
    font-weight: 600;
    font-size: 100%;
    color: $dark;
    margin: 0;
  }
}
</style>
