<template>
  <section class="talk talk-taxi">
    <div class="talk--back talk-taxi--back"/>
    <img class="talk-taxi--car" src="~/assets/projects/main/taxi/car.svg"/>
    <the-person/>
    <the-dialog v-if="user && user.name"/>
    <the-sign v-else-if="user && user.code === 401"/>
    <audio autoplay nocontrols loop>
      <source src="/static/sounds/taxi.mp3" type="audio/mpeg">
    </audio>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import TheDialog from '~/components/Robot/TheDialog.vue';
import ThePerson from '~/components/Robot/ThePerson.vue';
import TheSign from '~/components/TheSign.vue';

import talkLibrary from '~/locales/library';

export default {
  components: {
    TheDialog,
    ThePerson,
    TheSign,
  },

  data() {
    return {
      info: {
        index: 1,
        next: 'hotel',
        points: 50,
      },
      words: ['district', 'prefer', 'destination', 'driver', 'cash', 'hurry'],
      dialog: [
        {
          personage: 'Driver',
          questions: [
            'Hello. Where are you heading?',
          ],
          answer: 'To From a the Grand Berry Hotel',
          validator: [
            'To the Grand Berry Hotel',
            'Grand Berry Hotel',
          ],
          point: 10,
        },
        {
          personage: 'Driver',
          questions: [
            'Well, let\’s go. Put on your seat belt, please. Are you in a hurry?',
          ],
          answer: 'No Yes',
          validator: [
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          theme: {
            hurry: talkLibrary.positive,
            slow: talkLibrary.negative,
          },
          point: 10,
        },
        {
          personage: 'Driver',
          if: 'hurry',
          questions: [
            'Okay. I\'ll try to be faster',
          ],
          answer: 'Thanks You',
          validator: [
            ...talkLibrary.thanks,
          ],
          point: 5,
        },
        {
          personage: 'Driver',
          if: 'slow',
          questions: [
            'That\' good. I take more comfortable highway.',
          ],
          answer: 'Thanks You',
          validator: [
            ...talkLibrary.thanks,
          ],
          point: 5,
        },
        {
          personage: 'Driver',
          questions: [
            'So, where are you from?',
          ],
          answer: 'I\'m are is from Russia Belarus',
          validator: [
            'I\'m from Belarus',
            'I\'m from Russia',
          ],
          point: 10,
        },
        {
          personage: 'Driver',
          questions: [
            'I\’m going to visit your country next summer with family. What places do you recommend to visit?',
          ],
          answer: 'The most popular place is are am Kremlin Nyasvizh Castle',
          validator: [
            'The most popular place is Nyasvizh Castle',
            'The most popular place is Kremlin',
          ],
          point: 10,
        },
        {
          personage: 'Driver',
          questions: [
            'Thank you. What are you going to do in the US?',
          ],
          answer: 'I\’m is going will to work',
          validator: [
            'I\’m going to work',
          ],
          point: 10,
        },
        {
          personage: 'Driver',
          questions: [
            'Cool. Is it your first visit in New York?',
          ],
          answer: 'Yes No',
          validator: [
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          point: 10,
        },
        {
          personage: 'Driver',
          questions: [
            'Where are you going to stay after the hotel? Have you found the room yet?',
          ],
          answer: 'I\'m going to find a room in Brooklyn',
          validator: [
            'I\'m going to find a room in Brooklyn',
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          point: 10,
        },
        {
          personage: 'Driver',
          questions: [
            'Cool. We\'ve arrived. The total price is $10. How will you be paying?',
          ],
          answer: 'a Cash Credit card i have no money',
          validator: [
            'I have a credit card',
            'I have a cash',
            'I have no money',
            'I have nothing',
            'cash',
            'credit card',
            'no money',
            'nothing',
          ],
          theme: {
            cash: ['cash'],
            trouble: ['no money', 'nothing'],
            card: ['card', 'credit', 'electronic'],
          },
          point: 10,
        },
        {
          personage: 'Driver',
          if: 'cash',
          questions: [
            'Okay. Do you need a receipt?',
          ],
          answer: 'No Yes',
          validator: [
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          point: 5,
        },
        {
          personage: 'Driver',
          if: 'card',
          questions: [
            'Okay. I have the terminal. Do you need a receipt?',
          ],
          answer: 'Yes No',
          validator: [
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          point: 5,
        },
        {
          personage: 'Driver',
          if: 'trouble',
          questions: [
            'I call the police',
          ],
          answer: 'I\'m sorry. Here is your money',
          validator: [
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          point: 5,
        },
        {
          personage: 'Driver',
          questions: [
            'Thank you, have a nice day, and good luck.',
          ],
          answer: 'Thank you.',
          validator: [
            ...talkLibrary.thanks,
          ],
          point: 10,
        },
      ],
      questions: [
        {
          text: 'Taxi driver doesn\'t know about your final destination',
          answer: false,
        },
        {
          text: 'Can you pay for your trip by credit card?',
          answer: true,
        },
        {
          text: 'Do you need to put on seat belt?',
          answer: true,
        },
      ],
      videos: ['YrUtciCW1oA'],
      personage: {
        type: 'taxi',
        suit: 'uniform.svg',
      },
    };
  },

  computed: mapGetters({
    user: 'user/info',
  }),

  mounted() {
    this.$store.commit('lesson/SET_LESSON', this.info);
    this.$store.commit('lesson/SET_DIALOG', this.dialog);
    this.$store.commit('lesson/SET_VOICE', 'US English Male');
    this.$store.commit('lesson/SET_PERSONAGE', this.personage);
    this.$store.commit('lesson/SET_INVENTORY', false);
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
@keyframes taxi-moving{
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100vw, 0, 0);
  }
}
.talk-taxi {
  &--back{
    animation: taxi-moving 5s infinite;
    animation-timing-function: linear;
    background: url(~/assets/projects/main/taxi/background.svg) white;
    background-repeat: repeat-x;
    background-size: 50% 100%;
    position: fixed;
    height: 110vh;
    width: 200vw;
    top: -5vh;
    left: 0;
  }

  &--car{
    position: fixed;
    width: 100vw;
    bottom: -6vw;
    left: 0;
    @media (width < $mediaMini){
      bottom: initial;
      width: 720px;
      left: -130px;
      bottom: 25vh;
    }
  }

  .person-taxi{
    .person{
      &--face{
        bottom: 29vw;
        width: 18vw;
        left: 46vw;
        @media (width < $mediaMini){
          bottom: 225px;
          width: 130px;
          left: 175px;
        }
      }
      &--custom{
        width: 47.6vw;
        left: 59.2vw;
        @media (width < $mediaMini){
          width: 380px;
          left: 277px;
          bottom: -6px;
        }
      }
    }
  }

  .home--sign-wrap{
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
    margin: 0;
    left: 50%;
    top: 50%;
  }
}
</style>
