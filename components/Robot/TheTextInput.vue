<template>
  <div :class="['user--input', {'user--input-active': !robotTalk && !posted}]">
    <div class="user--input-options">
      <div class="user--input-phrase">
        <div v-for="word in phrase" :key="word.id + 1" class="user--input-word user--input-selected" @click="switchWord(word)">
          {{ word.text }}&nbsp;<img class="user--input-exit" width="10" src="~/assets/icons/exit-dark.svg"/><img class="user--input-exit user--input-exit-hover" width="10" src="~/assets/icons/exit-light.svg"/>
        </div>
      </div>
      <br/>

      <div v-for="word in words" :key="word.id * 100" :class="['user--input-word', {'user--input-word-add': added(word)}]" @click="switchWord(word)">
        {{ word.text }}
      </div>
      <br/>

      <button :class="['button', 'user--input-button', {'button-disable': !phrase.length && mistakes < 3}]" @click="checkTheAnswer()">
        <div :style="`max-width: ${33 * mistakes}%`" class="user--input-mistakes"/>
        <span class="button--label">Ответить</span>
      </button>

      <div v-if="step.validator" :class="['user--input-fault', {'user--input-fault-active': mistakes >= 3}]">
        <p>
          <b>Правильный ответ:</b>
          <br/>
          <the-word
            v-for="word in step.validator[0].split(' ')"
            :word="word"
            :key="word"/>
        </p>
        <button class="button" @click="userToTranscript(step.validator[0])">Дальше</button>
      </div>
      <div :class="['user--input-error', {'user--input-error-active': showError && mistakes < 3}]">
        Неправильно
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import { mapGetters } from 'vuex';
import TheWord from '~/components/Robot/TheWord.vue';

export default{
  components: {
    TheWord,
  },

  props: {
    userToTranscript: { type: Function, required: true },
    robotTalk: { type: Boolean, required: true },
    mistakes: { type: Number, required: true },
    step: { type: Object, required: true },
  },

  data() {
    return {
      showError: false,
      wordsTrue: [],
      posted: false,
      phrase: [],
      words: [],
    };
  },

  computed: {
    ...mapGetters({
    }),
    phraseString() {
      let phrase = '';
      this.phrase.forEach((word, key) => {
        if (key > 0) phrase += ' ';
        phrase += word.text;
      });
      return phrase.toString();
    },
  },

  watch: {
    mistakes() {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 1500);
    },
    text() {
      this.separateSentence();
    },
  },

  mounted() {
    this.separateSentence();
  },

  methods: {
    separateSentence() {
      this.posted = false;
      this.phrase = [];
      const words = this.step.answer.split(' ');
      const wordsWithId = words.map((word, key) => {
        const data = {
          text: word.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, ''),
          id: key,
        };
        return data;
      });
      this.wordsTrue = wordsWithId.slice(0);
      this.words = this.randomizeArray(wordsWithId);
    },

    switchWord(word) {
      if (this.added(word)) {
        const index = this.phrase.indexOf(word);
        if (index > -1) {
          this.phrase.splice(index, 1);
        }
      } else {
        Vue.set(this.phrase, this.phrase.length, word);
      }
    },

    checkTheAnswer() {
      if (this.phrase.length) {
        // let answerTrue = true;
        // this.phrase.forEach((word, key) => {
        //   if (this.phrase[key].id !== this.wordsTrue[key].id) answerTrue = false;
        // });
        // if (!answerTrue) {
        //   this.$store.commit('user/UPDATE_POINTS', -10);
        // }
        // this.posted = true;
        this.userToTranscript(this.phraseString);
      }
    },

    randomizeArray(array) {
      return array.sort(() => 0.5 - Math.random());
    },

    added(word) {
      return this.phrase.filter(w => w.id === word.id).length > 0;
    },
  },
};
</script>

<style>
.user--input{
  transform: translate3d(0, 20px, 0);
  transition: all .3s ease-in-out;
  pointer-events: none;
  position: relative;
  opacity: 0;

  &-active{
    pointer-events: all;
    transform: none;
    opacity: 1;
  }

  &-button{
    background: $serviceDeepBlue;
  }

  &-mistakes{
    transition: all .4s ease-in-out;
    /*display: inline-block;
    vertical-align: top;*/
    background: #e05c5c;
    position: absolute;
    height: 100%;
    max-width: 0;
    width: 100%;
    left: 0;
    top: 0;
  }

  &-error{
    transform: translate3d(-50%, -20px, 0);
    transition: all .3s ease-in-out;
    display: inline-block;
    pointer-events: none;
    border-radius: 50px;
    background: $serviceRed;
    position: absolute;
    padding: 15px 20px;
    font-size: 120%;
    color: white;
    opacity: 0;
    left: 50%;
    top: 15px;

    &-active{
      transform: translate3d(-50%, 0, 0);
      opacity: 1;
    }
  }

  &-fault{
    transform: translate3d(0, 30px, 0);
    transition: all .3s ease-in-out;
    box-sizing: border-box;
    pointer-events: none;
    border-radius: 20px;
    background: $serviceRed;
    position: absolute;
    padding: 20px 30px;
    font-size: 130%;
    z-index: 999;
    color: white;
    height: 100%;
    width: 100%;
    opacity: 0;
    left: 0;
    top: 0;

    &-active{
      pointer-events: all;
      transform: none;
      opacity: 1;
    }

    p{
      min-height: 90px;
      font-size: 120%;
      margin-top: 0;
      padding: 0;
    }

    .button{
      font-size: 100% !important;
      background: $serviceSuperRed;
    }
  }

  &-answer{
    border: solid 1px $serviceRed;
    display: inline-block;
    border-radius: 20px;
    font-size: 120%;
    color: $serviceRed;
    padding: 10px;
  }

  /*&-mistake{
    border: solid 1px #e05c5c;
    display: inline-block;
    border-radius: 50%;
    margin: 0 3px;
    height: 10px;
    width: 10px;
    &-active{
      background: #e05c5c;
    }
  }*/

  &-options{
    padding: 14px 20px 10px;
    border-radius: 25px;
    position: relative;
    user-select: none;
    background: white;
    max-width: 100%;
    /*bottom: 20px;*/
    z-index: 99;
    /*right: 10%;*/
  }

  &-exit{
    transition: all .3s ease-in-out;
    opacity: 0.5;

    &-hover{
      position: absolute;
      opacity: 0;
      right: 12px;
      top: 12px;
    }
    /*position: relative;
    top: -2px;*/
  }

  &-word {
    transition: all .3s ease-in-out;
    border: solid 1px $dark;
    display: inline-block;
    border-radius: 20px;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 140%;
    margin: 3px;

    &:hover{
      border-color: #5fc25f;
      background: #5fc25f;
      color: white;
    }

    &-add{
      pointer-events: none;
      border-color: #e5e5e5;
      background: #e5e5e5;
      color: transparent;
    }
  }

  &-phrase{
    margin-bottom: 0;
    min-height: 40px;
  }

  &-selected{
    border-color: #eee;
    position: relative;

    &:hover{
      border-color: #f87a7a;
      background: #f87a7a;
      color: white;
      .user--input-exit{
        opacity: 0;
        &-hover{
          opacity: 1;
        }
      }
    }
  }
  .button{
    position: relative;
    margin: 10px auto;
    overflow: hidden;
    font-size: 120%;
    display: block;
    border: 0;

    &--label{
      position: relative;
      z-index: 99;
    }

    &-disable{
      pointer-events: none;
      background: $serviceDarkBlue;
    }
  }
}
</style>
