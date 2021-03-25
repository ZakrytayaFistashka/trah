<template>
  <div :class="['message', {'message-wrong': info.wrongAnswer}, {'message-action': info.action}, {'message--user': info.author === 'You'}]">
    <p>
      <span v-if="!info.action" class="message--author">{{ info.author || info.data.personage }}:</span>
      <span v-for="(word, key) in words" :key="key">
        <the-word :word="word" :err="wordError(key)"/>
      </span>
      <!-- <span v-if="!info.action && info.author !== 'You'" :class="['message--answer', {'message--answer-active': recording}]">
        <img src="~/assets/icons/answer.svg"/>
        <div class="message--answer-text" v-html="info.data.answer"/>
      </span>
      <span v-if="info.wrongAnswer" class="message--right" @click="sayTheSentence(info.data.answer)">&rarr;&nbsp;&nbsp;{{ info.data.answer }}</span> -->
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
    id: { type: Number, required: false, default() { return 0; } },
    recording: { type: Boolean, required: true },
    info: { type: Object, required: true },
  },

  data() {
    return {
      translated: [],
    };
  },

  computed: {
    ...mapGetters({
      messageErrors: 'message/errors',
      voice: 'lesson/voice',
    }),
    words() {
      return this.info.text.split(' ');
    },
  },

  methods: {
    wordError(key) {
      const hasErr = this.messageErrors && this.messageErrors[this.id] && this.messageErrors[this.id].errors;
      let solution = {};

      if (hasErr) {
        solution = this.messageErrors[this.id].errors.find(err => err.offset === key + 1);
      }
      return solution;
    },

    sayTheSentence(sentence) {
      this.responsiveVoice.speak(sentence, this.voice, { rate: 0.9 });
    },
  },
};
</script>

<style>
@keyframes messsage-show{
  from{
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to{
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.message{
  animation: messsage-show .6s ease-in-out;
  display: inline-block;
  border-radius: 40px;
  position: relative;
  background: $serviceBlue;
  padding: 0px 40px;
  text-align: left;
  margin: 10px 0;
  color: white;
  /*float: left;*/
  .word:hover,
  .word-translated{
    border-color: white;
    background: white;
    color: black;
  }

  &--user{
    background: white;
    color: black;
    .word:hover,
    .word-translated{
      border-color: $serviceBlue;
      background: $serviceBlue;
      color: white;
    }
    /*float: right;*/
  }

  &-action{
    background: $serviceDarkBlue;
    font-style: italic;
  }

  &-wrong{
    .word{
      text-decoration-color: rgba(255, 255, 255, .3);
      text-decoration: line-through;
      background: orange;
    }
  }

  &--author{
    margin-right: 5px;
    /*color: $comment;*/
    opacity: 0.7;

    & + span .word span{
      text-transform: capitalize;
      display: block;
    }
  }

  &--answer{
    transition: all .3s ease-in-out;
    background: transparent;
    pointer-events: none;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    padding: 6px;
    height: 20px;
    width: 20px;
    opacity: 0;
    right: -2px;
    top: 0;

    &-active{
      pointer-events: all;
      opacity: 1;
    }

    &-text{
      transition: all .3s ease-in-out;
      pointer-events: none;
      white-space: nowrap;
      background: $serviceBlue;
      position: absolute;
      border-radius: 5px;
      padding: 4px 10px;
      font-size: 80%;
      right: 14px;
      opacity: 0;
      top: 40px;
    }

    &:hover{
      background: $serviceBlue;
      .message--answer-text{
        pointer-events: all;
        opacity: 1;
      }
    }

    img {
      position: relative;
      width: 20px;
      top: 2px;
    }
  }

  &--right{
    font-style: italic;
    margin-left: 8px;
    cursor: pointer;
    color: orange;
  }
}
</style>
