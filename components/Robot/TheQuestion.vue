<template>
  <div :class="['question', {'question-done': right}]">
    <p>
      <span v-for="(word, key) in words" :key="key">
        <the-word :word="word"/>
      </span>
      <select v-model="answer" :disabled="voted" @change="checkAnswer()">
        <option :value="-1">Choose</option>
        <option :value="true">True</option>
        <option :value="false">False</option>
      </select>
      <template v-if="answer !== -1">
        <span v-if="right" class="question--right question--right-true">👌</span>
        <span v-else class="question--right question--right-false">😔</span>
      </template>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheWord from '~/components/Robot/TheWord.vue';

export default{
  components: {
    TheWord,
  },

  props: {
    question: { type: Object, required: true },
  },

  data() {
    return {
      voted: false,
      right: -1,
      answer: -1,
    };
  },

  computed: {
    ...mapGetters({
    }),
    words() {
      return this.question.text.split(' ');
    },
  },

  methods: {
    checkAnswer() {
      this.right = this.answer === this.question.answer;
      if (this.right && !this.voted) this.$store.commit('user/UPDATE_POINTS', 5);
      this.voted = true;
    },
  },
};
</script>

<style>
.question{
  font-size: 80%;
  select{
    border: solid 1px $buttons;
    display: inline-block;
    border-radius: 10px;
    position: relative;
    padding: 4px 10px;
    width: initial;
    font-size: 80%;
    margin: 0 6px;
    color: white;

    option{
      text-align: center;
    }
  }

  &-done{
    select{
      background: $buttons;
    }
  }

  &--right{
    transform: scale(1.5);
    display: inline-block;
    position: relative;
    left: 10px;
    top: 3px;
  }
}
</style>
