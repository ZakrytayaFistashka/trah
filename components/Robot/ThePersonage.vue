<template>
  <div v-if="personage && personage.type" :class="['personage', `personage-${personage.type}`]">
    <div class="personage--face">
      <img :src="require(`~/assets/robot/${personage.type}/talk${saying}.png`)"/>
      <img v-if="eye.length" :src="require(`~/assets/robot/${personage.type}/blink-${eye}.png`)" class="personage--face-eye"/>
    </div>
    <div class="personage--custom">
      <img :src="require(`~/assets/robot/${personage.suit}`)"/>
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
      eye: '',
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
    console.log('this.personage');
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
          this.eye = '02';
          setTimeout(() => {
            this.eye = '';
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
.personage{
  position: fixed;
  height: 106vh;
  width: 100%;
  left: 0;
  top: 0;

  img{
    width: 100%;
  }

  &--face{
    transform: translate3d(-50%, 0, 0);
    position: absolute;
    bottom: 10vw;
    width: 25vw;
    left: 50%;

    &-eye{
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }

    @media (width > $bootstrapMob){
      max-width: 279px;
      bottom: 115px;
    }

    @media (width < $bootstrapMob){
      width: 279px;
      bottom: 115px;
    }

    .personage-man &{
      width: 279px;
    }
  }

  &--custom{
    transform: translate3d(-50%, 0, 0);
    position: absolute;
    width: 65vw;
    left: 51%;
    bottom: 0;

    @media (width > $bootstrapMob){
      max-width: 720px;
      left: 50.9%;
    }

    @media (width < $bootstrapMob){
      width: 690px;
      left: 52%;
    }

    .personage-man &{
      max-width: initial;
      width: 940px;
      left: 49.2%;
    }
  }
}
</style>
