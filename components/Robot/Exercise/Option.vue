<template>
  <div class="message message--user exercise exercise--option">
    <p>
      <span class="exercise--option-text">{{ textBefore }}</span>
      <select
        v-model="answer"
        :style="`background: linear-gradient(to right, #D16460 ${33 * errors}%, #7DB5E2 ${33.3 * errors}%, #7DB5E2)`"
        class="exercise--option-select"
        @change="validateAnswer()">
        <option value="choose" selected disabled>Выбрать</option>
        <option
          v-for="(opt, key) in step.exercise.options"
          :value="opt"
          :key="key">
          {{ opt }}
        </option>
      </select>
      <span class="exercise--option-arrow"/>
      <span class="exercise--option-text">{{ textAfter }}</span>
    </p>
    <div :class="['exercise--option-true', {'exercise--option-true-active': errors >= 3}]">
      <p>{{ answerFull }}</p>
      <button class="button" @click="userToTranscript(answerFull)">Дальше</button>
    </div>
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
      answer: '',
      errors: 0,
    };
  },

  computed: {
    textBefore() {
      return this.step.exercise.answer.split('$option')[0];
    },
    textAfter() {
      return this.step.exercise.answer.split('$option')[1];
    },
    answerFull() {
      return `${this.textBefore}${this.step.exercise.true}${this.textAfter}`;
    },
  },

  mounted() {
    this.answer = 'choose';
  },

  methods: {
    validateAnswer() {
      if (this.answer === this.step.exercise.true) {
        this.userToTranscript(this.answerFull);
      } else if (this.answer !== 'choose') {
        this.errors += 1;
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
  &--option{
    &-text{
      display: inline-block;
    }
    &-select{
      transition: all .3s ease-in-out;
      padding: 5px 22px 4px 8px;
      display: inline-block;
      border-radius: 20px;
      position: relative;
      font-size: 80%;
      width: initial;
      margin: 0 8px;
      color: white;
      border: 0;
      top: -1px;
    }
    &-wrap{
      display: inline-block;
      border-radius: 40px;
      position: relative;
    }
    &-indicator{
      background: $serviceRed;
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
    &-arrow{
      background: url(~/assets/icons/option-arrow.svg);
      background-size: cover;
      display: inline-block;
      pointer-events: none;
      position: relative;
      margin-right: 12px;
      margin-left: -22px;
      content: '';
      height: 7px;
      width: 11px;
      top: -1px;
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
