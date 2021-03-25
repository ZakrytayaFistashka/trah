<template>
  <section class="talk">
    <div class="talk--back talk-airport--back"/>
    <img class="talk-airport--plane" src="~/assets/projects/main/airport-svg/plane.svg"/>
    <div class="talk-airport--column"/>
    <the-person/>
    <the-dialog/>
    <audio autoplay nocontrols loop>
      <source src="/static/sounds/airport.mp3" type="audio/mpeg">
    </audio>
    <the-requirements/>
  </section>
</template>

<script>
import TheRequirements from '~/components/TheRequirements.vue';
import TheDialog from '~/components/Robot/TheDialog.vue';
import ThePerson from '~/components/Robot/ThePerson.vue';

import talkLibrary from '~/locales/library';

export default {
  components: {
    TheRequirements,
    TheDialog,
    ThePerson,
  },

  data() {
    return {
      info: {
        index: 0,
        next: 'taxi',
        points: 10,
      },
      words: ['passport', 'purpose', 'pleasure', 'relatives', 'medical contraindications', 'declare'],
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
            'Good day',
            'Hello!',
            'Hi!',
          ],
          point: 10,
          exercise: {
            type: 'emoji',
            pack: 'pig',
            true: 'hi',
            options: ['hi', 'no'],
            answer: 'hi',
          },
        },
        // {
        //   personage: 'Inspector',
        //   questions: [
        //     'Good day',
        //     'Hello!',
        //     'Hi!',
        //   ],
        //   onboarding: 'micrphone',
        //   answer: 'Good day',
        //   validator: [
        //     'Good day',
        //   ],
        //   point: 10,
        // },
        {
          personage: 'Inspector',
          questions: [
            'May I have your passport?',
            'Please show your passport.',
            'Could you show me your passport?',
            'May I see your passport, please?',
            'Can I see your passport?',
            'Can I have your valid passport, please?',
            'Could I see your passport, please?',
          ],
          action: 'You give your passport 📄 to the inspector 🛂 ',
          inventory: 'passport',
          point: 5,
        },
        {
          personage: 'Inspector',
          questions: [
            '$name, what is the purpose of your visit to the USA?',
            '$name, what is the nature of your visit? Business or pleasure?',
            '$name, what is the purpose of your visit?',
          ],
          point: 10,
          exercise: {
            type: 'option',
            true: 'have',
            options: ['had', 'has', 'have'],
            answer: 'I $option a business visa',
          },
        },
        {
          personage: 'Inspector',
          // if: 'business',
          questions: [
            'Please, show me your Employment letter',
          ],
          action: 'You show your Employment letter 📄 to the inspector 🛂 ',
          inventory: 'letter',
          point: 5,
        },
        {
          personage: 'Inspector',
          questions: [
            'Do you have any relatives in the US?',
            'Do you have grandparents, or relatives in the USA?',
          ],
          answer: 'I don\'t have',
          validator: [
            'I don\'t have relatives in the US',
            'I have relatives in the US',
            'I don\'t have the relatives',
            'I don\'t have relatives',
            'I have the relatives',
            'I have relatives',
            'I don\'t have',
            'I don\'t',
            'I have',
          ],
          theme: {
            relatives: [
              'I have relatives in the US',
              'I have the relatives',
              'I have relatives',
              ...talkLibrary.positive,
            ],
          },
          point: 10,
        },
        {
          personage: 'Inspector',
          if: 'relatives',
          questions: [
            'Do you have any contact information with your relatives?',
          ],
          answer: 'I don\'t have any contacts',
          validator: [
            'I don\'t have any contacts',
          ],
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Could you show me your hotel reservation?',
            'Do you have a hotel reservation?',
          ],
          action: 'You give your hotel reservation 📄 to the inspector 🛂 ',
          inventory: 'document',
          point: 5,
        },
        {
          personage: 'Inspector',
          questions: [
            '$name, do you have medical contraindications?',
            '$name, have you ever medical contraindications?',
          ],
          answer: 'I have no contraindications.',
          validator: [
            'I have no medical contraindications',
            'I have medical contraindications',
            'I have no contraindications',
            'No medical contraindications',
            'I have contraindications',
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          theme: {
            medical: [
              ...talkLibrary.positive,
              'I have medical contraindications',
              'I have contraindications',
              'I have',
            ],
          },
          point: 10,
        },
        {
          personage: 'Inspector',
          if: 'medical',
          questions: [
            'Do you have medical insurance?',
          ],
          answer: 'I have medical insurance',
          validator: [
            'I have medical insurance',
            'I have insurance',
            'I have',
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            'Do you have anything to declare?',
          ],
          answer: 'No, I don\'t have. Yes',
          validator: [
            'No, I don\'t have',
            'Yes, I have',
            ...talkLibrary.positive,
            ...talkLibrary.negative,
          ],
          theme: {
            declare: talkLibrary.positive,
          },
          point: 10,
        },
        {
          personage: 'Inspector',
          if: 'declare',
          questions: [
            'You have to make the Customs declaration. Please find Global Entry Kiosk.',
          ],
          answer: 'Thank you culture',
          validator: talkLibrary.thanks,
          point: 10,
        },
        {
          personage: 'Inspector',
          questions: [
            '$name, welcome to the United States of America!',
          ],
          answer: 'thanks',
          exercise: {
            type: 'emoji',
            pack: 'pig',
            true: 'thanks',
            options: ['thanks'],
            answer: 'thanks',
          },
          point: 20,
        },
      ],
      questions: [
        {
          text: 'Нave you passed passport control?',
          answer: true,
        },
        {
          text: 'Does inspector ask you about your diet?',
          answer: false,
        },
        {
          text: 'Can you cheat on actual purpose of your visit?',
          answer: false,
        },
      ],
      videos: ['2G-m60L_Ck0'],
      personage: {
        type: 'inspector',
        suit: 'uniform.svg',
      },
    };
  },

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

.talk-airport {
  &--column,
  &--back{
    background: url(~/assets/projects/main/airport-svg/background.svg);
    background-position: center center;
    background-size: cover;
    position: fixed;
    height: 110vh;
    width: 110vw;
    left: -5vw;
    top: -5vh;
  }

  &--plane{
    animation: plane 40s infinite;
    animation-timing-function: linear;
    position: fixed;
    left: 0;
    top: 0;
  }

  &--column{
    background: url(~/assets/projects/main/airport-svg/column.svg);
    background-position: center center;
    background-size: cover;
  }
}
</style>
