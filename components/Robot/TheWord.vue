<template>
  <span class="word" @mouseover="translateText(word)">
    <span v-if="translations[wordKey(word)] && translations[wordKey(word)].text && translations[wordKey(word)].text[0]" class="word-translated">{{ translations[wordKey(word)].text[0] }}</span>
    <span>{{ word }}</span>
    <span v-if="err && err.better" class="word-error">
      <span class="word-solution">{{ err.better[0] }}</span>
    </span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
  props: {
    word: { type: String, required: true },
    err: { type: Object, required: false, default: () => {} },
  },

  computed: {
    ...mapGetters({
      translations: 'message/translations',
    }),
  },

  methods: {
    translateText(word) {
      const wordKey = this.wordKey(word);
      if (!this.translations[wordKey]) {
        this.$store.dispatch('message/TRANSLATE_TEXT', {
          text: wordKey,
        });
      }
    },

    wordKey(text) {
      return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    },
  },
};
</script>

<style>
.word{
  transition: all .3s ease-in-out;
  border: solid 3px transparent;
  display: inline-block;
  white-space: nowrap;
  position: relative;
  cursor: pointer;

  &:hover{
    .word-translated{
     pointer-events: all;
      opacity: 1;
    }
  }

  &-translated{
    transition: all .3s ease-in-out;
    bottom: calc(100% + 3px);
    pointer-events: none;
    background: $buttons;
    position: absolute;
    padding: 2px 4px;
    font-size: 80%;
    opacity: 0;
    left: -3px;
  }

  &:hover{
    border: solid 3px $buttons;
    background: $buttons;
  }


  &-error{
    border: solid 1px red;
    position: absolute;
    height: 100%;
    width: 100%;
    left: -1px;
    top: -1px;

    &:hover{
      .word-solution{
        pointer-events: all;
        opacity: 1;
      }
    }
  }

  &-solution{
    pointer-events: none;
    position: absolute;
    padding: 2px 4px;
    font-size: 100%;
    background: red;
    left: 100%;
    opacity: 0;
    z-index: 99;
    top: -1px;
  }
}
</style>
