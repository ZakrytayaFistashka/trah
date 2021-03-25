<template>
  <section class="talk talk-restaurant">
    <div class="talk--back talk-restaurant--back"/>
    <the-person/>
    <div class="talk-restaurant--table"/>
    <the-dialog v-if="courses && courses[0] && courses[0].pay"/>
    <the-payment v-else/>
    <audio autoplay nocontrols loop>
      <source src="/static/sounds/rest.mp3" type="audio/mpeg">
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
        index: 5,
        next: 'registration',
        points: 50,
      },
      words: ['waiter', 'order', 'meatballs', 'cup', 'cookies'],
      dialog: [
        {
          personage: 'Waiter',
          questions: [
            'Good evening. My name is Jack. I\’m your waiter today. What would you like for a starter?',
          ],
          answer: 'Hello, I\'d like a bowl of chicken soup, please.',
          validator: ['like', 'want', 'a bowl of', 'please', 'chicken', 'soup',
          ],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Well, and what would you like for your main course?',
          ],
          answer: 'I\'d like a Vegetarian lasagna.',
          validator: ['like', 'want', 'pizza', 'cheeseburger', 'spaghetti', 'meatballs', 'potato',
          ],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Unfortunately, It’\s a very popular dish and I don’\t think we have any more left. Maybe something another?',
          ],
          answer: 'I\'d like a slice of Pizza.',
          validator: ['like', 'want', 'pizza', 'cheeseburger', 'spaghetti', 'meatballs', 'potato',
          ],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Good choice. Do you want a salad with it?',
          ],
          answer: 'Yes, please',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Would you like anything to drink?',
          ],
          answer: 'Yes, I\'d like a glass of Coke, please.',
          validator: ['like', 'want', 'coffee', 'coke', 'glass', 'tea', 'please',
          ],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Do you prefer drinks now or with the main course?',
          ],
          answer: 'Now, please',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Sure. Have you already chosen something for dessert?',
          ],
          answer: 'Cheesecake New-York, please',
          validator: ['like', 'want', 'cookie', 'raspberry', 'cheesecake', 'pie', 'please'],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Well. Can I bring you anything else?',
          ],
          answer: 'No, thank you.',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'OK. Your order will be ready in 10-15 minutes. Do you prefer the bill now or later?',
          ],
          answer: 'Now, please Later',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, 'after', 'now', 'please'],
          point: 10,
        },
        {
          personage: 'Waiter',
          questions: [
            'Sure. Have a good time and enjoy your meal',
          ],
          answer: 'Thanks',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks],
          point: 10,
        },
      ],
      questions: [
        {
          text: 'Your order will be ready in 30 minutes',
          answer: false,
        },
        {
          text: 'The waiter recommends you a red wine',
          answer: false,
        },
        {
          text: 'The waiter\'s name is Jack',
          answer: true,
        },
        {
          text: 'The waiter didn\'t ask about the main course',
          answer: false,
        },
      ],
      personage: {
        blind: true,
        type: 'waiter',
        suit: 'uniform.svg',
      },
      videos: ['I09C9S2bS34'],
    };
  },

  computed: mapGetters({
    courses: 'user/courses',
  }),

  mounted() {
    this.$store.commit('lesson/SET_LESSON', this.info);
    this.$store.commit('lesson/SET_DIALOG', this.dialog);
    this.$store.commit('lesson/SET_VOICE', 'US English Male');
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
.talk-restaurant {
  &--table,
  &--back{
    background: url(~/assets/projects/main/restaurant/background.svg);
    background-size: cover;
    position: fixed;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
  }

  &--table{
    background: url(~/assets/projects/main/restaurant/table.svg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 90% auto;
    height: 100%;
    top: initial;
    /*z-index: 10;*/
    width: 100%;
    bottom: 0;
    left: 0;
    @media (width < $bootstrapMob){
      background-size: 120% auto;
      height: $sceneHeight;
      top: 0;
    }
  }

  .person-waiter{
    .person{
      &--face{
        z-index: 99;
        bottom: 31vw;
        width: 13vw;
        left: 50vw;
        @media (width < $bootstrapMob){
          left: 50%;
          width: 120px;
          bottom: 240px;
        }
      }
      &--custom{
        width: 36.6vw;
        left: 49.85vw;
        bottom: 2vw;
        @media (width < $bootstrapMob){
          left: 50%;
          width: 310px;
          bottom: 0px
        }
      }
    }
  }
}
</style>
