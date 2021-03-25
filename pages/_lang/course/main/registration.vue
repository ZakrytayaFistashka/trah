<template>
  <section class="talk talk-registr">
    <div class="talk--back talk-registr--back"/>
    <!-- <img class="talk-registr--plane" src="~/assets/projects/main/registr-svg/plane.svg"/> -->
    <the-person/>
    <div class="talk-registr--front"/>
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
        index: 6,
        next: 'poll',
        points: 50,
      },
      words: ['fill up', 'confirmation', 'registration', 'social security', 'transport card'],
      inventory: {
        passport: {
          icon: 'projects/main/airport-svg/passport',
          slug: 'passport',
          text: 'Passport',
        },
        document: {
          icon: 'projects/main/airport-svg/reservation',
          slug: 'document',
          text: 'Employment Authorization Document',
        },
        visa: {
          icon: 'projects/main/registr/visa',
          slug: 'visa',
          text: 'Immigrant Visa',
        },
        letter: {
          icon: 'projects/main/registr/visa',
          slug: 'letter',
          text: 'Employment letter',
        },
      },
      dialog: [
        {
          personage: 'Inspector',
          questions: [
            'Welcome. May I have your passport?',
            'Please show your passport.',
            'Could you show me your passport?',
            'May I see your passport, please?',
            'Can I see your passport?',
            'Can I have your valid passport, please?',
            'Could I see your passport, please?',
          ],
          action: 'You give your passport 📄 to the inspector 🛂 ',
          inventory: 'passport',
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Do you have the Immigrant Visa?',
          ],
          action: 'You give your Visa 📄 to the inspector 🛂 ',
          answer: 'Here you are',
          inventory: 'visa',
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Where are you from?',
          ],
          answer: 'I\'am from Russia',
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Show me your Employment Authorization Document',
          ],
          answer: 'Here you are',
          action: 'You give your Employment Authorization Document 📄 to the inspector 🛂 ',
          inventory: 'document',
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Do you have letter from your employer?',
          ],
          answer: 'Here you are',
          action: 'You give letter 📄 to the inspector 🛂 ',
          inventory: 'letter',
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Tell me, please, what is the name of your company?',
          ],
          answer: 'SM Technologies',
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Here is your Security Card',
          ],
          answer: 'Thank you',
          validator: talkLibrary.thanks,
          point: 10,
        },
      ],
      questions: [
        {
          text: 'You get The Security Card',
          answer: true,
        },
        {
          text: 'You show Pension Authorization Document',
          answer: false,
        },
      ],
      personage: {
        type: 'register',
        suit: 'jacket.svg',
      },
    };
  },

  computed: mapGetters({
    courses: 'user/courses',
  }),

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
@keyframes plane {
  from {
    transform: translate3d(-10vw, 5vh, 0);
    opacity: 1;
  }
  35%{
    opacity: 1;
  }
  80%, 100% {
    transform: translate3d(120vw, 5vh, 0);
    opacity: 0;
  }
}

.talk-registr {
  &--front,
  &--back{
    background: url(~/assets/projects/main/registr/background.svg);
    background-position: center center;
    background-size: cover;
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }

  &--front{
    background: url(~/assets/projects/main/registr/front.svg);
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    top: initial;
    width: 100%;
    bottom: 0;
    left: 0;
    @media (width < $mediaMini){
      background-size: 140% auto;
      height: $sceneHeight;
      top: 0;
    }

    @media (width < $mediaTiny){
      display: none;
    }
  }

  .person-inspector{
    .person{
      &--face{
        bottom: 3vw;
      }
      &--custom{
        bottom: 3vw;
      }
    }
  }
}
</style>
