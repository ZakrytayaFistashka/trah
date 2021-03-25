<template>
  <header class="header">
    <!-- <h1><nuxt-link :to="$tpath('/')">{{ $t('home.title') }}</nuxt-link></h1> -->
    <div class="header--logo">
      <nuxt-link :to="`/${locale !== 'en' ? `${locale}/` : ''}`">hi</nuxt-link>
    </div>
    <div class="header--switcher">
      <div v-for="(locale, key) in locales" :key="key" class="header--switcher-lang">
        <nuxt-link :to="`/${locale !== 'en' ? `${locale}/` : ''}`">
          <span :class="['header--switcher-flag', `header--switcher-flag-${locale}`]"/>
        </nuxt-link>
        <!-- <nuxt-link :to="`/${locale !== 'en' ? `${locale}/` : ''}`">{{ locale }}</nuxt-link> -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    locales: 'page/locales',
  }),
};
</script>

<style>
.header{
  position: relative;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: $bootstrapMob) {
    text-align: left;
    margin: 0 15px;
  }

  &--logo {
    font-weight: 700;
    text-align: left;
    font-size: 300%;
    margin: 10px;
    a {
      border-bottom: 0;
      color: black;
    }
  }

  &--switcher{
    position: absolute;
    right: 10px;
    top: 5px;

    a {
      border-bottom: 0;
    }

    &-lang{
      text-transform: uppercase;
      font-size: 12px;
    }

    &-flag{
      background: url('~/assets/flags/usa.png');
      background-size: cover;
      display: inline-block;
      /*margin-right: 4px;*/
      margin-top: 2px;
      height: 10px;
      width: 17px;

      &-ru {
        background-image: url('~/assets/flags/rus.png');
      }
    }
  }
}
</style>
