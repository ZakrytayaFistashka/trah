<template>
  <section class="inner about">
    <div class="about--background"/>
    <div class="panel robots-nocontent">
      <h1><b v-html="$t('global.about')"/></h1>
      <!--noindex-->
      <!--googleoff: all-->
      <h2 class="about--title"><a href="mailto:info@hi.academy">info@hi.academy</a></h2>
      <p>+7 964 567-19-77</p>
      <div class="about--company">
        <p><b>ИНН:</b>&nbsp;774334024202</p>
        <p><b>ОГРН:</b>&nbsp; 319774600269302</p>
        <p><b>ИП:</b> Косовичев Роман Андреевич</p>
      </div>
      <!--googleon: all-->
      <!--/noindex-->
      <img class="about--img" src="~/assets/about/office.svg"/>
    </div>
  </section>
</template>

<script>
import Projects from '~/components/Projects.vue';

export default {
  components: {
    Projects,
  },

  head() {
    return {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
      ],
    };
  },
};
</script>

<style>
.about{
  min-height: calc(100vh - 100px);
  &--background{
    background: url(~/assets/about/background.svg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100% auto;
    position: fixed;
    opacity: 0.3;
    z-index: -1;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
  &--title{
    margin: 14px 0 8px;
    font-weight: 300;
  }
  &--img{
    position: fixed;
    max-height: 70vh;
    bottom: -3vh;
    left: 50vw;
  }
  &--company{
    margin-top: 30px;
    font-size: 80%;
    p{
      padding: 3px 0;
    }
  }
}
</style>
