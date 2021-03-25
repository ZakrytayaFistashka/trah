<template>
  <div class="robot">
    <div :style="`height: ${lastBockHeight}px`" :class="['robot--transcript', {'robot--transcript-active': start && !finish}]">
      <div ref="wrap" :style="`transform: translate3d(0, ${-scroll}px, 0)`" class="robot--transcript-wrap">
        <div v-for="(message, key) in transcript" :key="key" :class="['robot--transcript-text', {'robot--transcript-user': message.author === 'You'}, , {'robot--transcript-hide': transcript.length > 2 && key < transcript.length - 2}]">
          <the-message :info="message" :recording="recording"/>
        </div>
        <div ref="input">
          <div v-if="recording && step" @click="microphoneOff()">
            <the-text-input
              v-if="step.validator"
              :robot-talk="robotTalk"
              :step="step"
              :mistakes="mistakes"
              :user-to-transcript="userToTranscript"/>
            <the-exercise-option
              v-else-if="step.exercise && step.exercise.type == 'option'"
              :user-to-transcript="userToTranscript"
              :step="step"/>
            <the-exercise-emoji
              v-else-if="step.exercise && step.exercise.type == 'emoji'"
              :user-to-transcript="userToTranscript"
              :step="step"/>
          </div>
          <!-- <div :class="['robot--answer', {'robot--answer-disable': microphoneDisabled}, {'robot--answer-active': recording && (step && !step.inventory)}]" @click="microphoneSwitch()">
            <div class="robot--answer-mic">
              <div class="robot--answer-wave"/>
              <img src="~/assets/icons/microphone.svg"/>
            </div>
            <div class="robot--answer-tip">
              <p v-if="microphoneDisabled">Микрофон отключен. Можно воспользоваться текстовым вводом.</p>
              <p v-else>Роботы слушают тебя. Если ты&nbsp;говоришь и&nbsp;ничего не&nbsp;происходит, проверь настройки микрофона.</p>
            </div>
          </div> -->
        </div>
      </div>

      <!-- <the-text-input text="Yes. My brother works in Chicago. Here is his address."/> -->

      <div v-if="inventory" :class="['robot--action', {'robot--action-active': !robotTalk && (step && step.inventory) && (transcript.length && !transcript[transcript.length - 1].action)}]">
        <div v-for="(item, key) in inventory" :key="key" class="robot--inventory-item" @click="getInventoryItem(item)">
          <img :src="require(`~/assets/${item.icon}.svg`)" class="robot--action-preview"/>
          <div class="robot--inventory-desc">
            <img :src="require(`~/assets/${item.icon}.svg`)"/>
            <p><the-word :word="item.text"/></p>
          </div>
        </div>
      </div>
    </div>

    <div :class="['robot--start', {'robot--start-active': loaded && !start}]">

      <button v-mixpanel="`lesson / action / start / ${$route.name}`" class="button-big" @click="robot()" v-html="$t('home.start')"/>
    </div>

    <the-transcription v-if="finish" :transcript="transcript" :recording="recording"/>

    <div :class="['robot--preloader', {'robot--preloader-active': !loaded}]">
      <img class="robot--preloader-image" src="~/assets/icons/preloader.svg"/>
    </div>

    <the-inventory
      v-if="step"
      :show-inventory-tips="showInventoryTips"
      :finish="finish"
      :tasks="tasks"
      :step="step"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheTranscription from '~/components/Robot/TheTranscription.vue';
import TheExerciseOption from '~/components/Robot/Exercise/Option.vue';
import TheExerciseEmoji from '~/components/Robot/Exercise/Emoji.vue';
import TheTextInput from '~/components/Robot/TheTextInput.vue';
import TheInventory from '~/components/Robot/TheInventory.vue';
import ThePersonage from '~/components/Robot/ThePersonage.vue';
import TheMessage from '~/components/Robot/TheMessage.vue';
import TheWord from '~/components/Robot/TheWord.vue';

import Talk from '~/mixins/robot/Talk.vue';

export default{
  components: {
    TheTranscription,
    TheExerciseOption,
    TheExerciseEmoji,
    TheInventory,
    ThePersonage,
    TheTextInput,
    TheMessage,
    TheWord,
  },

  mixins: [Talk],

  data() {
    return {
      microphoneDisabled: true,
      showInventoryTips: false,
      lastBockHeight: 200,
      recording: false,
      loaded: false,
      finish: false,
      start: false,
      transcript: [],
      dialogStep: 0,
      scroll: 20,
      tasks: {},
      face: {},
      last: {},
    };
  },

  computed: {
    ...mapGetters({
      inventory: 'lesson/inventory',
      personage: 'lesson/personage',
      continue: 'lesson/continue',
      dialog: 'lesson/dialog',
      voice: 'lesson/voice',
      words: 'lesson/words',
      flow: 'lesson/flow',
      info: 'lesson/info',
      user: 'user/info',
      talk: 'personage/talk',
    }),
  },

  watch: {
    step() {
      if (this.step && this.step.inventory) {
        setTimeout(() => {
          this.scroll += 100;
        }, 1000);
      }
    },
  },

  mounted() {
    this.loaded = true;
    document.body.addEventListener('resize', this.updateTranscript());
    setInterval(() => {
      this.calcTranscriptScroll();
    }, 300);
  },

  methods: {
    updateTranscript() {
      this.last = {};
      this.calcTranscriptScroll();
    },

    calcTranscriptScroll() {
      if (this.$refs.wrap) {
        const { height } = this.$refs.wrap.lastChild.getBoundingClientRect();
        if (height > this.lastBockHeight) this.lastBockHeight = height;
        const scroll = this.$refs.wrap.getBoundingClientRect().height - this.lastBockHeight;
        if (scroll > this.scroll) this.scroll = scroll;
      }
    },

    getInventoryItem(item) {
      const step = this.dialog[this.dialogStep];
      if (item.slug === 'todo') this.toDoListVIsibility(true);
      else if (step.inventory && step.inventory === item.slug) {
        this.$store.commit('user/UPDATE_POINTS', step.point);
        this.postActionToTranscipt();
        setTimeout(() => {
          this.nextStep();
        }, 3000);
      }
    },

    microphoneOff() {
      this.microphoneDisabled = true;
      // this.recognition.stop();
    },

    microphoneSwitch() {
      this.microphoneDisabled = !this.microphoneDisabled;
      // if (this.microphoneDisabled) this.recognition.stop();
      // else this.userTalking();
    },
  },
};
</script>

<style>
@keyframes robot-preloader {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}


@keyframes tips {
  from {
    transform: scale(1);
  }
  50%{
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}

@keyframes show-next {
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes microphone {
  from {
    transform: scale(0.5);
    opacity: 1;
  }
  50%{
    transform: scale(0.6);
    opacity: 0.2;
  }
  to {
    transform: scale(0.5);
    opacity: 1;
  }
}
.robot{
  &--transcript{
    /*border: solid 1px rgba(255,255,255,0.2);*/
    transition: all .3s ease-in-out;
    /*padding: 20px 20px 70px;*/
    pointer-events: none;
    border-radius: 50px;
    /*background: $scene;*/
    /*overflow: hidden;*/
    min-height: 100px;
    max-width: 470px;
    position: fixed;
    font-size: 90%;
    margin: 20px 0;
    height: 200px;
    opacity: 0;
    width: 70%;
    right: 10%;
    bottom: 50px;

    @media (width < $bootstrapMob) {
      width: 90%;
      right: 5%;
    }

    .message-wrong{
      .word{
        text-decoration: none;
        background: none;
      }
      .message--right{
        display: none;
      }
    }

    /*@media (width < $mediaTiny) {
      height: 90px;
    }*/

    &-active{
      pointer-events: all;
      opacity: 1;
    }

    &:after,
    &:before{
      position: absolute;
      z-index: 990;
      height: 10px;
      width: 100%;
      /*content: '';*/
      left: 0;
    }

    &:before{
      background: linear-gradient(to bottom, rgba(15, 19, 21,0) 0%, rgba(15, 19, 21,1) 100%);
      bottom: 0;
    }

    &:after{
      background: linear-gradient(to bottom, rgba(15, 19, 21, 1) 0%, rgba(15, 19, 21,0) 100%);
      top: 0;
    }

    p{
      padding: 5px 0;
      margin: 10px 0;
    }

    &-wrap{
      transition: all .3s ease-in-out;
      position: relative;
      z-index: 60;
    }

    &-text{
      transition: all .3s ease-in-out;
      text-align: left;
    }
    &-user{
      text-align: right;
    }
    &-hide{
      pointer-events: none;
      opacity: 0;
    }

  }

  &--speaker{
    position: absolute;
    cursor: pointer;
    bottom: 30px;
    width: 30px;
    left: 30px;
    img {
      max-width: 100%;
    }
  }

  &--answer{
    transition: opacity .3s ease-in-out;
    /*transform: translate3d(-50%, 0, 0);*/
    pointer-events: none;
    position: absolute;
    z-index: 999;
    bottom: 32px;
    left: 20px;
    opacity: 0;

    /*@media (width < $mediaMini) {
      bottom: 15px;
    }*/

    &-active{
      pointer-events: all;
      opacity: 1;
    }

    &-mic{
      vertical-align: middle;
      display: inline-block;
      position: relative;
      margin: 0 12px;
    }

    &-tip{
      transition: all .3s ease-in-out;
      pointer-events: none;
      padding: 0px 20px 0;
      border-radius: 10px;
      position: absolute;
      background: white;
      font-size: 80%;
      width: 240px;
      z-index: 999;
      bottom: -6px;
      left: 50px;
      opacity: 0;

      .robot--answer:hover &{
        pointer-events: all;
        opacity: 1;
      }
    }

    &-wave{
      animation: microphone 1s infinite;
      border-radius: 50%;
      position: absolute;
      background: $buttons;
      height: 70px;
      width: 70px;
      left: -29px;
      top: -24px;

      .robot--answer-disable &{
        background: rgba(255, 0, 0, 0.5);
        transform: scale(0.6);
        animation: none;
      }
    }

    img{
      position: relative;
      z-index: 99;
      width: 12px;
    }
  }

  &--next{
    animation: show-next 2s ease-in-out;
    text-align: center;
    position: absolute;
    bottom: 20px;
    width: 100%;
    left: 0;

    button{
      padding: 5px 18px;
      font-size: 100%;
      margin: 0 auto;
    }
  }

  &--start{
    transition: all .3s ease-in-out;
    pointer-events: none;
    text-align: center;
    position: fixed;
    height: 100%;
    width: 100%;
    opacity: 0;
    left: 0;
    top: 0;

    .button-big{
      position: absolute;
      margin: 0;
      left: 0;
      transform: translate3d(-50%, -50%, 0);
      background: white;
      color: $dark;
      left: 50%;
      top: 80%;

      @media (width < $mediaMini) {
        top: initial;
        bottom: 7vh;
      }

      &:hover{
        transform: translate3d(-50%, -50%, 0) scale(1.1);
      }
    }

    &-active{
      pointer-events: all;
      opacity: 1;
    }
  }

  &--preloader{
    transform: translate3d(-50%, -50%, 0) scale(0.1);
    transition: all .3s ease-in-out;
    pointer-events: none;
    position: fixed;
    opacity: 0;
    left: 50%;
    top: 50%;

    &-active{
      transform: translate3d(-50%, -50%, 0);
      opacity: 1;
    }
    &-image{
      animation: robot-preloader 1s infinite;
      animation-timing-function: linear;
    }
  }
}
</style>
