<template>
  <div class="home--sign-wrap">
    <h2 class="home--sign-title" v-html="$t('global.sign')"/>
    <p class="home--sign-text">Авторизуйся, чтобы продолжить</p>
    <a v-mixpanel="'sign / facebook'" href="/api/v1/fb/">
      <button class="home--sign-button home--sign-fb">
        <img src="~/assets/icons/facebook-ic.svg"/>
        <span v-html="$t('global.facebook')"/>
      </button>
    </a>
    <a v-mixpanel="'sign / google'" href="/api/v1/google/">
      <button class="home--sign-button home--sign-gl">
        <img src="~/assets/icons/google-ic.svg"/>
        <span v-html="$t('global.google')"/>
      </button>
    </a>
    <a v-mixpanel="'sign / vk'" href="/api/v1/vk/">
      <button class="home--sign-button home--sign-vk">
        <img src="~/assets/icons/vk.svg"/>
        <span v-html="$t('global.vk')"/>
      </button>
    </a>

    <p class="home--sign-privacy"><a href="/privacy/" target="_blank" v-html="$t('global.privacy')"/></p>
  </div>
</template>

<script>

export default {
  watch: {
    $route() {
      this.setSingCookies();
    },
  },

  mounted() {
    if (this.$route.path !== '/') this.setSingCookies();
  },

  methods: {
    setSingCookies() {
      this.$cookie.set('sign', this.$route.path, 1);
    },
  },
};
</script>

<style>
.home{
  &--sign{
    &-title{
      margin-bottom: 8px;
      font-weight: 600;
      margin-top: 0;
      color: $dark;
    }
    &-text{
      padding-bottom: 2px;
      font-size: 100%;
    }
    &-user{
      margin: 10px auto;
    }
    &-button{
      padding: 10px 16px;
      position: relative;
      margin: 10px auto;
      font-weight: 600;
      font-size: 100%;
      display: block;
      width: 200px;

      img{
        position: absolute;
        max-width: 24px;
        height: 20px;
        left: 16px;
        top: 9px;
      }
    }
    &-fb{
      background: #539ad2;
    }
    &-gl{
      border-color: $dark;
      background: white;
      color: $dark;
    }
    &-privacy{
      max-width: 170px;
      margin: 0 auto;
      font-size: 80%;
    }
    &-wrap{
      padding: 30px 20px 25px;
      border-radius: 10px;
      text-align: center;
      position: relative;
      background: white;
      max-width: 300px;
      margin: 0 auto;
      z-index: 99;
      width: 90%;
    }
  }
}
</style>
