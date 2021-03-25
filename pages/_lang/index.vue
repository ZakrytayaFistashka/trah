<template>
  <section class="home">
    <div class="home--block home--first">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Играй и&nbsp;изучай<br/>английский язык<br/><span class="mark">в&nbsp;реальных ситуациях</span></h2>
            <p class="home--text">Ты переезжаешь в Нью-Йорк! ✈️</p>
            <button v-mixpanel="'start / first screen'" class="home--start" @click="openAuth()" v-html="$t('home.start_full')"/>
          </div>
        </div>
      </div>
    </div>

    <div class="home--block home--features">
      <div class="home--features-block home--features-girl">
        <div class="home--features-back home--features-girl-back"/>
        <div class="home--features-text home--features-girl-text">
          <div class="bubble bubble-right bubble-right-middle">
            <p>На практике учишься быстрее. Никаких скучных упражнений!</p>
          </div>
          <img src="~/assets/home/home-girl.svg"/>
        </div>
        <div class="clearfix"/>
      </div>

      <div class="home--features-block home--features-taxi">
        <div class="home--features-back home--features-taxi-back"/>
        <div class="home--features-text home--features-taxi-text">
          <div class="bubble bubble-left bubble-left-middle">
            <p>Поддержи разговор с таксистом, сними квартиру и знакомься в баре!</p>
          </div>
          <img src="~/assets/home/home-taxi.svg"/>
        </div>
        <div class="clearfix"/>
      </div>

      <div class="home--features-block home--features-girl home--features-inspector">
        <div class="home--features-back home--features-inspector-back"/>
        <div class="home--features-text home--features-girl-text">
          <div class="bubble bubble-right bubble-right-middle">
            <p>Уровень языка не важен. Ты в реальной ситуации, надо выкручиваться. Мы поможем.</p>
          </div>
          <img src="~/assets/home/home-inspector.svg"/>
        </div>
        <div class="clearfix"/>
      </div>

      <button v-mixpanel="'start / study'" class="home--start home--start-final" @click="openAuth()" v-html="$t('home.start_study')"/>
    </div>

    <div class="home--footer">
      <img src="~/assets/home/bread.svg"/>
      <p><a href="/privacy/" target="_blank">Обработка&nbsp;персональных&nbsp;данных</a></p>
      <p><a href="mailto:info@hi.academy">Написать нам</a></p>
      <p><span class="mark">2019 hi.academy</span></p>
    </div>

  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import TheHelp from '~/components/Home/TheHelp.vue';
import TheSign from '~/components/TheSign.vue';

export default {
  components: {
    TheHelp,
    TheSign,
  },

  data() {
    return {
      reviewSlide: 1,
    };
  },

  computed: mapGetters({
    user: 'user/info',
  }),

  watch: {
    user() {
      if (this.user && this.user.name) {
        const signLastPath = this.$cookie.get('sign');
        if (signLastPath) this.$router.push(signLastPath);
        else this.$router.push('/course/main/');
      }
    },
  },

  methods: {
    setActiveSlider(slide) {
      this.reviewSlide = slide;
    },

    openAuth() {
      this.$router.push('/course/main/fly/');
      // if (!this.user || !this.user.name) {
      //   this.$store.commit('page/SET_POPUP_AUTH', true);
      //   this.$store.commit('page/SET_POPUP', true);
      // } else this.$router.push('/course/main/airport/');
    },
  },
};
</script>

<style>

.home{
  background: $serviceYellow;

  h2{
    text-align: center;
  }

  p{
    color: $serviceDarkBlue;
  }

  .bubble p{
    color: white;
  }

  &--block{
    padding: 60px 0;
    clear: both;
  }

  &--text{
    margin: 0 auto -18px;
    max-width: 520px;
  }

  &--start{
    background: $serviceOrange;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    display: block;

    &-final{
      border-radius: 40px;
      padding: 20px 70px;
      position: relative;
      margin-top: -30px;
      font-size: 180%;
      z-index: 99;
    }
  }

  &--first {
    text-align: center;
  }

  &--features{
    padding-top: 0;

    img{
      margin-bottom: -10px;
      min-height: 300px;
      margin-top: 40px;
      height: 80vh;

      @media (width < $mediaMini) {
        height: 55vh;
      }
    }

    &-block{
      overflow: hidden;
      width: 100%;
    }

    &-back{
      position: absolute;
      height: 60%;
      width: 100%;
      bottom: 0;
      left: 0;
    }

    &-text{
      position: relative;
      text-align: right;
      margin-right: 2%;
      float: right;
      clear: both;
      z-index: 20;

      @media (width < $mediaMini) {
        float: none;
      }

      @media (width > $mediaMini) {
        margin-right: 20%;
      }
    }

    &-taxi,
    &-girl{
      position: relative;

      &-back{
        background: url(~/assets/home/home-girl-back.svg);
        background-position: center bottom;
        background-size: cover;
        z-index: 10;
      }
      &-text{
        .bubble{
          @media (width > $bootstrapMob) {
            display: inline-block;
            vertical-align: top;
          }
        }
      }
    }

    &-girl{
      &-text{
        .bubble{
          margin-right: 50px;
          margin-left: 20px;
          max-width: 250px;

          @media (width > $bootstrapMob) {
            margin-right: 20vh;
            top: 25vh;
          }
        }
      }
    }

    &-taxi{
      &-text{
        text-align: left;
        max-width: 100%;
        float: left;

        .bubble{
          margin-left: 260px;
          margin-top: 20px;
          max-width: 300px;
          z-index: 99;
          width: 70vw;

          @media (width < $bootstrapMob) {
            margin: 0 auto;
            top: 25px;

            &:after{
              display: none;
            }
          }

          @media (width > $bootstrapMob) {
            margin-left: 55vw;
            top: 40vh;
          }
        }

        img{
          @media (width < $bootstrapMob) {
            position: relative;
            height: 50vh;
            left: -140px;
          }
        }
      }

      &-back{
        background: url(~/assets/projects/main/taxi/background.svg);
        background-position: center bottom;
        background-size: cover;
        height: 100%;
        opacity: 0.4;
      }
    }

    &-inspector{
      &-back{
        background: url(~/assets/projects/main/airport-svg/background.svg);
        background-position: center bottom;
        background-size: cover;
        height: 100%;
        opacity: 0.5;
      }
      .bubble{
        margin-left: 20px;
        margin-top: 40px;
        margin-right: 0;
        @media (width > $bootstrapMob) {
          top: 33vh;
        }
      }
/*      img{
        @media (width < $bootstrapMob) {
          height: 500px;
        }
      }*/
    }
  }

  &--footer{
    background: $serviceDarkBlue;
    text-transform: uppercase;
    padding: 90px 0 20px;
    text-align: center;
    margin-top: -116px;

    a{
      color: $serviceWhite;
      border: 0;
      &:hover{
        opacity: 0.7;
      }
    }

    p{
      color: $serviceWhite;
      padding-top: 5px;
      font-weight: 600;
      font-size: 100%;
    }

    .mark{
      display: inline-block;
      margin-top: 8px;
    }
  }
}
</style>
