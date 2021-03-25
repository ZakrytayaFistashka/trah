<template>
  <div :class="['requirements--first', { 'requirements--first-active': onBoarding && popup }]">
    <div class="requirements--first-wrap">
      <h1>🤓</h1>
      <p>Браузер может попросить доступ к&nbsp;микрофону. Это роботы 🤖 хотят услышать твой&nbsp;голос.</p>
      <div class="robot--answer robot--answer-active">
        <div class="robot--answer-mic">
          <div class="robot--answer-wave"/>
          <img src="~/assets/icons/microphone.svg"/>
        </div>
      </div>
      <p>Мы не храним твои звукозаписи, никто из людей их не&nbsp;услышит и&nbsp;они сразу удаляются.</p>
      <p>Курс работает только в&nbsp;браузере 🔗&nbsp;<a href="https://www.google.com/intl/ru_ALL/chrome/"><b>Chrome</b></a></p>
      <!-- <p>Если ничего не работает</p> -->
      <!-- <p>Если во время старта урока микрофон не&nbsp;включится и&nbsp;браузер не&nbsp;спросит о&nbsp;нем, попробуй найти и&nbsp;нажать на&nbsp;иконку видеокамеры в&nbsp;адресной строке браузера:</p> -->
      <!-- <p><img style="border-radius: 10px" src="~/assets/home/camera.jpg"></p> -->
      <button class="button-big" @click="closePopup()">OK</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      popup: true,
    };
  },

  computed: mapGetters({
    onBoarding: 'page/onBoarding',
  }),

  mounted() {
    const informed = this.$cookie.get('informed');
    if (!informed) this.popup = true;
  },

  methods: {
    closePopup() {
      this.$cookie.set('informed', 'true');
      this.popup = false;
      this.$store.commit('lesson/CONTINUE');
    },
  },
};
</script>

<style>
.requirements{
  &--first{
    /*background: white url(~assets/projects/main/airport-svg/requirements.svg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100% auto;*/
    background: rgba(255, 255, 255, .3);
    transition: all .3s ease-in-out;
    overflow-y: scroll;
    pointer-events: none;
    /*background: white;*/
    position: fixed;
    z-index: 999;
    height: 100%;
    width: 100%;
    opacity: 0;
    left: 0;
    top: 0;
    &-active{
      pointer-events: all;
      opacity: 1
    }

    &-wrap{
      padding: 20px 40px 40px;
      margin: 10vh auto 5vh;
      border-radius: 20px;
      text-align: center;
      position: relative;
      background: white;
      font-size: 100%;
      max-width: 80%;
      width: 500px;
    }

    .robot--answer{
      margin: 20px auto 10px;
      pointer-events: none;
      position: relative;
      bottom: initial;
      left: initial;
    }
  }
}
</style>
