<template>
  <section class="talk talk-rent">
    <div class="talk--back talk-rent--back"/>
    <!-- <img class="talk-rent--plane" src="~/assets/projects/main/rent-svg/plane.svg"/> -->
    <the-person/>
    <div class="talk-rent--table"/>
    <the-dialog v-if="courses && courses[0] && courses[0].pay"/>
    <the-payment v-else/>
    <audio autoplay nocontrols loop>
      <source src="/static/sounds/office.mp3" type="audio/mpeg">
    </audio>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import TheDialog from '~/components/Robot/TheDialog.vue';
import ThePerson from '~/components/Robot/ThePerson.vue';
import ThePayment from '~/components/ThePayment.vue';

import talkLibrary from '~/locales/library';

export default {
  components: {
    TheDialog,
    ThePayment,
    ThePerson,
  },

  data() {
    return {
      info: {
        index: 4,
        next: 'restaurant',
        points: 50,
      },
      words: ['district', 'subletting', 'furnished', 'property', 'according'],
      dialog: [
        {
          personage: 'Realtor',
          questions: [
            'Welcome. Are you going to rent an apartment?',
          ],
          answer: 'Yes',
          validator: [
            'Yes',
          ],
          point: 10,
        },
        {
          personage: 'Realtor',
          questions: [
            'Do you have any special location in mind?',
          ],
          validator: [
            'Brooklyn',
          ],
          answer: 'Brooklyn',
          point: 10,
        },
        {
          personage: 'Realtor',
          questions: [
            'OK. And what’s your price range?',
          ],
          validator: [
            'Around $1400',
          ],
          answer: 'Around $1400',
          point: 10,
        },
        {
          personage: 'Realtor',
          questions: [
            'Should the apartment be furnished?',
          ],
          validator: [
            'Yes',
          ],
          answer: 'Yes',
          point: 10,
        },
        {
          personage: 'Realtor',
          questions: [
            'According to your preferences, we can’t find an apartment. This district is popular enough. And the property is quite pricy here.',
          ],
          answer: 'What\'s about Manhattan?',
          validator: [
            'What\'s about Manhattan?',
            'Manhattan',
          ],
          point: 10,
        },
        {
          personage: 'Realtor',
          questions: [
            'A friend of mine is subletting his Manhattan studio apartment for 6 months while he travels in Africa. He’s got a beautiful fully furnished apartment.',
          ],
          answer: 'Sounds good',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks, 'great', 'cool', 'wow', 'sound',
          ],
          point: 10,
          theme: {
            studio: [...talkLibrary.positive, ...talkLibrary.thanks],
            notfound: [...talkLibrary.positive, ...talkLibrary.thanks],
          },
        },
        {
          personage: 'Realtor',
          if: 'notfound',
          questions: [
            'Well, I need some time to find another options. $name, I\'ll call you later',
          ],
          answer: 'Thanks. See you soon',
          validator: [...talkLibrary.positive, ...talkLibrary.thanks],
          point: 10,
        },
        {
          personage: 'Realtor',
          if: 'studio',
          questions: [
            'It would be cost around $1500 in months',
          ],
          answer: 'Ok',
          validator: ['expensive', 'agree', 'pricy', 'cheap', 'ok', 'yes'],
          point: 10,
        },
        {
          personage: 'Realtor',
          if: 'studio',
          questions: [
            'I think we can discuss it. When you ready to watch this apartment?',
          ],
          validator: [
            'Tomorrow',
          ],
          answer: 'Tomorrow',
          point: 10,
        },
        {
          personage: 'Realtor',
          if: 'studio',
          questions: [
            'Great. 825 Columbus Avenue, 6pm. If you like everything, we will sign in the contract.',
          ],
          answer: 'Thank you',
          validator: ['thank', 'you'],
          point: 10,
        },
      ],
      questions: [
        {
          text: 'Are you loooking for a room?',
          answer: true,
        },
        {
          text: 'The cost of the romm is $1500?',
          answer: true,
        },
        {
          text: 'Are you loooking for a room?',
          answer: true,
        },
      ],
      personage: {
        type: 'retail',
        suit: 'cloth.svg',
      },
      videos: ['M126crYxrRQ'],
    };
  },

  computed: mapGetters({
    courses: 'user/courses',
  }),

  mounted() {
    this.$store.commit('lesson/SET_LESSON', this.info);
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
.talk-rent {
  &--table,
  &--back{
    background: url(~/assets/projects/main/rent/background.svg);
    background-position: center center;
    background-size: cover;
    position: fixed;
    height: 110vh;
    width: 110vw;
    left: -5vw;
    top: -5vh;
  }

  &--table{
    background: url(~/assets/projects/main/rent/table.svg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 70% auto;
    height: 100%;
    top: initial;
    /*z-index: 10;*/
    width: 100%;
    bottom: 0;
    left: 0;
    @media (width < $mediaMini){
      background-size: 120% auto;
      height: $sceneHeight;
      bottom: initial;
      top: 50px;
    }
  }

  .person-retail{
    .person{
      &--face{
        z-index: 99;
        bottom: 20vw;
        width: 22vw;
        left: 50vw;
        @media (width < $mediaMini){
          left: 45%;
          width: 210px;
          bottom: 130px;
        }
      }
      &--custom{
        width: 44.6vw;
        left: 53.2vw;
        bottom: 3vw;
        @media (width < $mediaMini){
          left: 51%;
          width: 360px;
          bottom: 0;
        }
      }
    }
  }
}
</style>
