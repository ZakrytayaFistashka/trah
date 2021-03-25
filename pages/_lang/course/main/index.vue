<template>
  <section class="chapters">
    <div class="container">
      <h2 class="chapters--title" v-html="$t('projects.relocation')"/>
      <p class="chapters--desc" v-html="$t('projects.relocation_desc')"/>
    </div>
    <div class="chapter--list-decor chapter--list-decor-01">
      <img src="~/assets/icons/chapter-wall-01.svg"/>
    </div>
    <div class="chapter--list-decor chapter--list-decor-02">
      <img src="~/assets/icons/chapter-wall-02.svg"/>
    </div>
    <div class="chapter--list-decor chapter--list-decor-03">
      <img src="~/assets/icons/chapter-wall-02.svg"/>
    </div>
    <div class="chapter--list-decor chapter--list-decor-04">
      <img src="~/assets/icons/chapter-wall-02.svg"/>
    </div>
    <div class="chapter--list">
      <div v-mixpanel="'lesson / airport'" class="chapter--list-item">
        <nuxt-link :to="$tpath('/course/main/airport/')">
          <img src="~/assets/projects/main//preview/airport-done.svg"/>
          <p v-html="$t('projects.course_relocation.arriving')"/>
        </nuxt-link>
      </div>
      <div v-mixpanel="'lesson / taxi'" class="chapter--list-item">
        <nuxt-link :to="hasDone(0) ? $tpath('/course/main/taxi/') : ''">
          <img :src="require(`~/assets/projects/main//preview/taxi${hasDone(0)}.svg`)"/>
          <p v-html="$t('projects.course_relocation.taxi')"/>
        </nuxt-link>
      </div>
      <div v-mixpanel="'lesson / hotel'" class="chapter--list-item">
        <nuxt-link :to="hasDone(1) ? $tpath('/course/main/hotel/') : ''">
          <img :src="require(`~/assets/projects/main//preview/hotel${hasDone(1)}.svg`)"/>
          <p v-html="$t('projects.course_relocation.hotel')"/>
        </nuxt-link>
      </div>
      <div v-mixpanel="'lesson / foodmarket'" class="chapter--list-item">
        <nuxt-link :to="hasDone(2) ? $tpath('/course/main/foodmarket/') : ''">
          <img :src="require(`~/assets/projects/main//preview/foodmarket${hasDone(2)}.svg`)"/>
          <p v-html="$t('projects.course_relocation.foodmarket')"/>
        </nuxt-link>
      </div>
      <div v-mixpanel="'lesson / rent'" class="chapter--list-item">
        <nuxt-link :to="hasDone(3) ? $tpath('/course/main/rent/') : ''">
          <img :src="require(`~/assets/projects/main//preview/rent-a-room${hasDone(3)}.svg`)"/>
          <p v-html="$t('projects.course_relocation.rent')"/>
        </nuxt-link>
      </div>
      <div v-mixpanel="'lesson / restaurant'" class="chapter--list-item">
        <nuxt-link :to="hasDone(4) ? $tpath('/course/main/restaurant/') : ''">
          <img :src="require(`~/assets/projects/main//preview/restaurant${hasDone(4)}.svg`)"/>
          <p v-html="$t('projects.course_relocation.restaurant')"/>
        </nuxt-link>
      </div>
      <div v-mixpanel="'lesson / registration'" class="chapter--list-item">
        <nuxt-link :to="hasDone(5) ? $tpath('/course/main/registration/') : ''">
          <img :src="require(`~/assets/projects/main//preview/hotel${hasDone(5)}.svg`)"/>
          <p v-html="$t('projects.course_relocation.registration')"/>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    courses: 'user/courses',
    user: 'user/info',
  }),

  mounted() {
    if (this.user && this.user.name) this.$store.dispatch('user/GET_USER_COURSES');
  },

  methods: {
    hasDone(index) {
      const hasLessons = this.courses && this.courses[0] && this.courses[0].lessons;
      const done = hasLessons && this.courses[0].lessons[index] && this.courses[0].lessons[index].completed;
      return done ? '-done' : '';
    },
  },
};
</script>
<style>
.chapters{
  position: relative;
  text-align: center;
  margin-top: 100px;

  &--title{
    margin-bottom: 0;
  }

  &--desc{
    margin: 0 auto 30px;
    max-width: 350px;
    font-size: 120%;
  }
}

.chapter{
  margin-bottom: 50px;

  &--list {
    margin: 30px auto;
    max-width: 600px;

    &-decor{
      position: absolute;
      z-index: -1;
      img{
        height: auto;
        width: 100%;
      }
      &-01{
        width: 25%;
        right: 10%;
        top: 5%;
      }
      &-02{
        width: 20%;
        left: 10%;
        top: 20%;
      }
      &-03{
        width: 30%;
        left: -10%;
        top: 40%;
      }
      &-04{
        width: 22%;
        right: 5%;
        top: 70%;
      }
    }

    &-arrow,
    &-item{
      vertical-align: middle;
      display: inline-block;
    }

    &-item{
      position: relative;
      margin-bottom: 20px;
      text-align: center;
      width: 50%;

      &:nth-child(3n):after,
      &:nth-child(3n+1):before{
        background: url(~/assets/icons/arrow-bezier.svg);
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        height: 238px;
        width: 420px;
        z-index: -1;
        content: '';
        top: 74px;
      }

      &:nth-child(3n){
        &:after{
          transform: scale(-1, 1);
          right: -80px;
        }
      }
      &:nth-child(3n+1){
        width: 100%;
        &:before {
          left: -30px;
        }
      }
      &:last-child{
        &:before,
        &:after{
          display: none;
        }
      }

      p{
        padding-top: 5px;
      }

      img{
        height: 150px;
        width: 150px;
      }

      a.nuxt-link-exact-active:hover,
      a.nuxt-link-exact-active,
      a{
        border-bottom: 0;
        color: $dark;
      }
    }

    &-arrow{
      margin: -45px 20px 0;
    }
  }
}
</style>
