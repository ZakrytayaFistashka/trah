<template>
  <section class="talk talk-space">
    <div class="talk-space--back"/>
    <!-- <the-person/> -->
    <div class="talk-space--table"/>
    <div class="talk-computer">
      <div class="talk-computer--monitor">
        <!-- <img src="~/assets/projects/main/space/computer.svg"/> -->
        <!-- <iframe class="talk-computer--video" width="968" height="733" src="https://www.youtube.com/embed/9KZKJpOPo_E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
        <iframe src="/static/space/" width="640" height="400" frameborder="0" allowfullscreen/>
      </div>
    </div>
    <!-- <the-decorations/> -->
    <!-- <audio autoplay nocontrols loop>
      <source src="/static/sounds/space.mp3" type="audio/mpeg">
    </audio> -->
  </section>
</template>

<script>
import ThePerson from '~/components/Robot/ThePerson.vue';

export default {
  components: {
    ThePerson,
  },

  data() {
    return {
      words: ['fill up', 'go upstairs', 'elevator', 'key', 'transport card'],
      questions: [
        {
          text: 'Do you need a map to find your room?',
          answer: false,
        },
        {
          text: 'Did the manager give you the room key?',
          answer: true,
        },
      ],
    };
  },

  mounted() {
    this.$store.commit('lesson/SET_DIALOG', this.dialog);
    this.$store.commit('lesson/SET_VOICE', 'US English Female');
    this.$store.commit('lesson/SET_PERSONAGE', this.personage);
    this.$store.commit('lesson/SET_INVENTORY', this.inventory);
    this.$store.commit('lesson/SET_FLOW', '52ad7a605dfc40468e3781dcb09c73a3');

    this.$store.commit('lesson/SET_QUESTIONS', this.questions);
    this.$store.commit('lesson/SET_NEW_WORDS', this.words);
    this.$store.commit('lesson/SET_VIDEOS', this.videos);
  },

  beforeDestroy() {
    this.$store.commit('lesson/CLEAR_ALL');
  },
};
</script>

<style>
.talk-space {
  &--table,
  &--back{
    background: url(~/assets/projects/main/space/background.svg);
    background-position: center center;
    background-size: cover;
    position: fixed;
    height: 110vh;
    width: 110vw;
    left: -5vw;
    top: -5vh;
  }

  &--table{
    background: url(~/assets/projects/main/space/table.svg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100% auto;
    height: 100%;
    top: initial;
    /*z-index: 10;*/
    width: 100%;
    bottom: -5px;
    left: 0;
  }
}

.talk-computer{
  text-align: center;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 9;
  bottom: 0;
  left: 0;

  &--monitor{
    display: inline-block;
    position: relative;
    height: 95vh;
    width: 100vh;
    bottom: 0;

    @media (width < $mediaMini) {
      height: 100vh;
      width: 90vw;
      top: -10vh;
    }

    &:after {
      background: url(~/assets/projects/main/space/computer.svg);
      background-position: center bottom;
      background-repeat: no-repeat;
      background-size: 100% auto;
      position: absolute;
      z-index: -1;
      content: '';
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }

    iframe{
      position: relative;
      overflow: hidden;
      margin: 0 auto;
      width: 98%;
      height: 61%;
      top: 21.5%;
      left: 0;

      @media (width < $mediaMini) {
        height: 56vh;
        top: 27vh;
      }
    }
  }

  &--video{
    position: absolute;
    height: auto;
    width: 60vw;
    left: 0;

    /*@media (min-width: 1100px) {

    }*/
  }
}
</style>
