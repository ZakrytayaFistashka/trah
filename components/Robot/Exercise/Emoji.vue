<template>
  <div :class="['message message--user exercise exercise--emoji', {'exercise--emoji-animation': animation}]">
    <div class="exercise--emoji-pack">
      <img v-for="img in step.exercise.options" :key="img" :src="require(`~/assets/emojis/${step.exercise.pack}/${img}.gif`)" @click="validateAnswer(img)"/>
    </div>
    <!-- <button class="button" @click="userToTranscript(answerFull)">Дальше</button> -->
  </div>
</template>

<script>
import TheWord from '~/components/Robot/TheWord.vue';

export default{
  components: {
    TheWord,
  },

  props: {
    userToTranscript: { type: Function, required: true },
    step: { type: Object, required: true },
  },

  data() {
    return {
      showError: false,
      animation: false,
      errors: 0,
      answer: '',
    };
  },

  mounted() {
    this.answer = 'choose';
  },

  methods: {
    validateAnswer(answer) {
      if (answer === this.step.exercise.true) {
        this.userToTranscript(this.step.exercise.answer);
      } else {
        this.errors += 1;
        this.animation = true;
        setTimeout(() => {
          this.animation = false;
        }, 300);
      }
      if (this.errors >= 3) this.showTrueAnswer();
    },

    showTrueAnswer() {

    },
  },
};
</script>

<style>
.exercise{
  &--emoji{
    transition: .3s ease-in-out;
    &-animation{
      background: $serviceRed;
    }

    &-text{
      display: inline-block;
    }
    &-wrap{
      display: inline-block;
      border-radius: 40px;
      position: relative;
    }
    &-pack{
      img{
        display: inline-block;
        vertical-align: top;
        max-width: 100px;
        cursor: pointer;
        padding: 20px;
        @media (width < $mediaMini) {
          padding: 10px;
        }
      }
    }
    &-indicator{
      background: $serviceRed;
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
    &-true{
      background: $serviceRed;
      pointer-events: none;
      border-radius: 20px;
      position: absolute;
      padding: 0 20px;
      color: white;
      width: 100%;
      opacity: 0;
      bottom: 0;
      left: 0;

      &-active{
        pointer-events: all;
        opacity: 1;
      }

      button{
        font-size: 100%;
        margin-top: 0;
      }
    }
  }
}
</style>
