<template>
  <section class="talk talk-food">
    <div class="talk--back talk-food--back"/>
    <!-- <img class="talk-taxi--car" src="~/assets/projects/main/taxi/car.svg"/> -->
    <the-person/>
    <the-dialog v-if="courses && courses[0] && courses[0].pay"/>
    <the-payment v-else/>
    <audio autoplay nocontrols loop>
      <source src="/static/sounds/foodmarket.mp3" type="audio/mpeg">
    </audio>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import ThePerson from '~/components/Robot/ThePerson.vue';
import TheDialog from '~/components/Robot/TheDialog.vue';
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
        index: 3,
        next: 'rent',
        points: 50,
      },
      words: ['supplies', 'dairy', 'beverages', 'pineapples', 'canned', 'grocery'],
      inventory: {
        todo: {
          icon: 'projects/main/foodmarket/todo',
          fixed: true,
          slug: 'todo',
          text: 'Shopping list',
          tasks: [
            {
              text: '🧴 Shampoo',
              slug: 'shampoo',
              done: false,
            },
            {
              text: '🥚 Eggs',
              slug: 'eggs',
              done: false,
            },
            {
              text: '🍞 Bread',
              slug: 'bread',
              done: false,
            },
            {
              text: '🍜 1 kilo of onions',
              slug: 'onions',
              done: false,
            },
            {
              text: '🍍🍍 2 pineapples',
              slug: 'pineapples',
              done: false,
            },
          ],
        },
      },
      dialog: [
        {
          personage: 'Seller',
          questions: [
            'Hello. Can I help you?',
          ],
          answer: 'Where is a Shampoo?',
          validator: ['shampoo'],
          todo: 'shampoo',
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'It’s in the health and beauty supplies, in aisle four. Do you need anything else?',
          ],
          answer: 'I need eggs',
          validator: ['egg'],
          todo: 'eggs',
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'They are located in the dairy product section, on your left. Is that all?',
          ],
          answer: 'Bread',
          validator: ['bread'],
          todo: 'bread',
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'You will find all sorts of bread in our bakery. Is there anything else you are looking for?',
          ],
          answer: 'Do you have onions',
          validator: ['onion'],
          todo: 'onions',
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'How about red onions? They are just a bit more expensive than the usual ones but ideal for any salad',
          ],
          answer: 'Ok',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks],
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'Well, here you are. Anything else?',
          ],
          answer: 'Two pineapples, please',
          validator: ['pineapple'],
          todo: 'pineapples',
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'I’m terribly sorry but there is only one pineapple left. Do you still want it?',
          ],
          answer: 'Yes, I want it No',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks],
          theme: {
            pineapple: talkLibrary.positive,
            nopineapple: talkLibrary.negative,
          },
          point: 10,
        },
        {
          personage: 'Seller',
          if: 'pineapple',
          questions: [
            'Wait, I \'m packing one pineapple into the paper bag',
          ],
          answer: 'Thank you',
          point: 5,
        },
        {
          personage: 'Manager',
          if: 'nopineapple',
          questions: [
            'I\'m sorry about it. We will have a lot of pineapples tomorrow.',
          ],
          answer: 'Thank you',
          point: 5,
        },
        {
          personage: 'Seller',
          questions: [
            'Sure. Do you need any beverages or canned food?',
          ],
          answer: 'No, I don\'t need',
          validator: [...talkLibrary.positive, ...talkLibrary.negative, ...talkLibrary.thanks],
          point: 10,
          theme: {
            beverages: talkLibrary.positive,
          },
        },
        {
          personage: 'Seller',
          if: 'beverages',
          questions: [
            'It\'s close to bakery',
          ],
          answer: 'I see',
          validator: talkLibrary.thanks,
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'Well, the cash desks are is right at the end of the aisle',
          ],
          answer: 'Thank you',
          validator: talkLibrary.thanks,
          point: 10,
        },
        {
          personage: 'Seller',
          questions: [
            'You are welcome. Thank you for shopping with us. Have a good day!',
          ],
          answer: 'thanks',
          validator: [...talkLibrary.thanks, ...talkLibrary.bye],
          point: 10,
        },
      ],
      questions: [
        {
          text: 'You buy two pineapples',
          answer: false,
        },
        {
          text: 'You can find eggs in the grocery department',
          answer: false,
        },
        {
          text: 'You can find shampoo and soap in the health and beauty supplies',
          answer: true,
        },
        {
          text: 'Red onions are a bit expensive than the usual ones',
          answer: true,
        },
      ],
      personage: {
        type: 'foodmarket',
        suit: 'food.svg',
      },
      videos: ['59p698jqJek'],
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
    this.$store.commit('lesson/SET_INVENTORY', this.inventory);
    this.$store.commit('lesson/SET_PERSONAGE', this.personage);
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
.talk-food {
  &--back{
    background: url(~/assets/projects/main/foodmarket/background.svg);
    background-size: cover;
    position: fixed;
    height: 110vh;
    width: 110vw;
    left: -5vw;
    top: -5vh;
  }

  .person-foodmarket{
    .person{
      &--face{
        z-index: 99;
        bottom: 27vw;
        width: 20vw;
        left: 51vw;

        @media (width < $mediaIpad){
          left: 50%;
          width: 170px;
          bottom: 200px;
        }
      }
      &--custom{
        width: 29.6vw;
        left: 50vw;
        bottom: 0;

        @media (width < $mediaIpad){
          left: 49%;
          width: 220px;
          bottom: 0px;
        }
      }
    }
  }
}
</style>
