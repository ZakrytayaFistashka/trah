<template>
  <div v-if="personage && personage.type" :class="['person', `person-${personage.type}`]">
    <div class="person--face">
      <img :src="require(`~/assets/robot/${personage.type}/talk${saying}.svg`)"/>
      <img v-if="!personage.blind && eye.length" :src="require(`~/assets/robot/${personage.type}/blink-${eye}.svg`)" class="person--face-eye"/>
    </div>
    <div class="person--custom">
      <img :src="require(`~/assets/robot/${personage.type}/${personage.suit}`)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
  components: {
  },

  data() {
    return {
      blinking: '01',
      talking: {},
      saying: '',
      eye: '01',
    };
  },

  computed: {
    ...mapGetters({
      personage: 'lesson/personage',
      talk: 'personage/talk',
    }),
  },

  watch: {
    talk() {
      if (this.talk) this.say();
      else this.silent();
    },
  },

  mounted() {
    if (!this.personage.blind) this.blink();
  },

  methods: {
    say() {
      this.talking = setInterval(() => {
        const say = Math.floor(Math.random() * 4) + 1;
        this.saying = say > 0 ? `-0${say}` : '';
      }, 200);
    },

    blink() {
      const fps = 150;
      setTimeout(() => {
        this.eye = '01';
        setTimeout(() => {
          this.eye = '';
          setTimeout(() => {
            this.eye = '01';
            this.blink();
          }, fps);
        }, fps);
      }, (Math.random() * 5000) + 5000);
    },

    silent() {
      clearInterval(this.talking);
      this.saying = '';
    },
  },
};
</script>

<style>
.person{
  position: fixed;
  height: 106vh;
  width: 100%;
  left: 0;
  top: 0;

  @media (width < $mediaMini) {
    height: $sceneHeight;
  }

  img{
    width: 100%;
  }

  &--face{
    transform: translate3d(-50%, 0, 0);
    position: absolute;
    bottom: -5px;
    width: 80vh;
    left: 40%;

    &-eye{
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }

    .personage-man &{
      width: 279px;
    }
  }

  &--custom{
    transform: translate3d(-50%, 0, 0);
    position: absolute;
    width: 80vh;
    left: 40%;
    bottom: -5px;
  }

  &--face,
  &--custom{
    @media (width < $mediaMini) {
      width: 52vh;
    }
  }
}
</style>
