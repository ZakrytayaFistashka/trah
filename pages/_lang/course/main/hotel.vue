<template>
  <section class="talk talk-hotel">
    <div class="talk--back talk-hotel--back"/>
    <!-- <img class="talk-rent--plane" src="~/assets/projects/main/rent-svg/plane.svg"/> -->
    <the-person/>
    <div class="talk-hotel--table"/>
    <the-dialog v-if="courses && courses[0] && courses[0].pay"/>
    <the-payment v-else/>
    <audio autoplay nocontrols loop>
      <source src="/static/sounds/hotel.mp3" type="audio/mpeg">
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
        index: 2,
        next: 'foodmarket',
        points: 50,
      },
      inventory: {
        passport: {
          icon: 'projects/main/airport-svg/passport',
          slug: 'passport',
          text: 'Passport',
        },
        document: {
          icon: 'projects/main/airport-svg/reservation',
          slug: 'document',
          text: 'Hotel reservation',
        },
      },
      words: ['fill up', 'go upstairs', 'elevator', 'key', 'transport card'],
      dialog: [
        {
          personage: 'Manager',
          questions: [
            'Welcome. May I have your hotel reservation?',
          ],
          action: 'You give your hotel reservation 📄 to the manager 👩‍💼',
          inventory: 'document',
          point: 10,
        },
        {
          personage: 'Manager',
          questions: [
            '$name, are you alone?',
          ],
          theme: {
            notalone: talkLibrary.negative,
          },
          answer: 'Yes, I\'m is',
          validator: [
            'Yes, I\'m',
            'Yes',
          ],
          point: 10,
        },
        // {
        //   personage: 'Manager',
        //   if: 'notalone',
        //   questions: [
        //     'I\'m sorry, but you have booked only the one bed.',
        //   ],
        //   answer: 'Ok',
        //   validator: [
        //     'Ok',
        //   ],
        //   point: 10,
        // },
        {
          personage: 'Manager',
          questions: [
            'How long do you plan to stay in the hotel?',
          ],
          answer: 'For a week the To',
          validator: [
            'For a week',
            'a week',
          ],
          point: 10,
        },
        {
          personage: 'Manager',
          questions: [
            'Please, show me your passport',
          ],
          action: 'You give your passport 📄 to the manager 👩‍💼',
          inventory: 'passport',
          point: 10,
        },
        {
          personage: 'Manager',
          questions: [
            'Do you want a map of New York?',
          ],
          validator: [
            'Yes, please',
            'No',
          ],
          answer: 'Yes, No please',
          theme: {
            map: talkLibrary.positive,
          },
          point: 10,
        },
        {
          personage: 'Manager',
          if: 'map',
          questions: [
            'Here you are. That is location of the tourist centre.',
          ],
          answer: 'I see seen take',
          validator: [
            'I see',
          ],
          point: 5,
        },
        // {
        //   personage: 'Manager',
        //   questions: [
        //     'Do you need a tourist transport card?',
        //   ],
        //   answer: 'No, thank you. I\m going to stay in New York for a long time',
        //   validator: [
        //     'No, thank you. I\m going to stay in New York for a long time',
        //     'I\m going to stay in New York for a long time',
        //     'I\m going to stay for a long time',
        //     'No, thank you',
        //   ],
        //   point: 10,
        //   theme: {
        //     card: talkLibrary.positive,
        //   },
        // },
        // {
        //   personage: 'Manager',
        //   if: 'card',
        //   questions: [
        //     'Here is your personal card. You can charge it in any MetroCard Vending Machine.',
        //   ],
        //   answer: 'Thank you',
        //   validator: [
        //     'Thank you',
        //   ],
        //   point: 5,
        // },
        {
          personage: 'Manager',
          questions: [
            '$name, here is your room key. Room № 7, the second floor. You can use the elevator behind you or go upstairs over here.',
          ],
          answer: 'Thanks the a lot',
          validator: [
            'Thanks a lot',
            'Thanks',
          ],
          point: 10,
        },
      ],
      questions: [
        {
          text: 'Did you gave your passport to the office manager?',
          answer: true,
        },
        {
          text: 'Do you need a map to find your room?',
          answer: false,
        },
        {
          text: 'Did the manager give you the room key?',
          answer: true,
        },
        {
          text: 'Your room number is 6?',
          answer: false,
        },
      ],
      personage: {
        type: 'hotel',
        suit: 'cloth.svg',
      },
      videos: ['wyqfYJX23lg'],
    };
  },

  computed: mapGetters({
    courses: 'user/courses',
    user: 'user/info',
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
.talk-hotel {
  &--table,
  &--back{
    background: url(~/assets/projects/main/hotel/background.svg);
    background-position: top center;
    background-size: cover;
    position: fixed;
    height: 110vh;
    width: 110vw;
    left: -5vw;
    top: -5vh;
  }

  &--table{
    background: url(~/assets/projects/main/hotel/table.svg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 90% auto;
    bottom: -20px;
    height: 100%;
    top: initial;
    width: 100%;
    left: 0;

    @media (width < $mediaMini){
      height: $sceneHeight;
      bottom: 17vh;
      width: 790px;
      left: -70px;
    }
  }

  .person-hotel{
    .person{
      &--face{
        z-index: 99;
        bottom: 20vw;
        width: 18vw;
        left: 50vw;
        @media (width < $mediaMini){
          left: 49%;
          width: 160px;
          bottom: 100px;
        }
      }
      &--custom{
        width: 33.6vw;
        left: 50.2vw;
        bottom: 14vw;

        @media (width < $mediaMini){
          left: 48%;
          width: 310px;
          bottom: 40px;
        }
      }
    }
  }
}
</style>
