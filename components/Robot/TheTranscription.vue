<template>
  <div class="robot--finish">
    <h1 class="robot--finish-title" v-html="`${$t('projects.done')}&nbsp;${getRandomEmoji}`"/>

    <!-- <h3 v-html="$t('projects.record')"/>
    <div class="robot--finish-transcription">
      <div v-for="(message, key) in transcript" :key="key" class="robot--transcript-text">
        <the-message :info="message" :id="key" :recording="recording"/>
      </div>
    </div> -->

    <div class="robot--finish-words">
      <h3 v-html="$t('projects.new_words')"/>
      <div class="robot--finish-list robot--finish-column">
        <div v-for="(word, key) in words" :key="key" class="robot--finish-list-item" @click="sayTheWord(word)">
          <the-word :word="word"/>
        </div>
      </div>
    </div>

    <!-- <div class="robot--finish-questions">
      <h3 v-html="$t('projects.questions')"/>
      <div class="robot--finish-list">
        <div v-for="(question, key) in questions" :key="key" class="robot--finish-questions-item">
          <the-question :question="question"/>
        </div>
      </div>
    </div> -->

    <!-- <div v-if="videos && videos.length" class="robot--finish-videos">
      <h3 v-html="$t('projects.video')"/>
      <div class="robot--finish-list">
        <div v-for="(video, key) in videos" :key="key" class="robot--finish-videos-item">
          <iframe :src="`https://www.youtube.com/embed/${video}`" width="100%" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div> -->

    <nuxt-link v-mixpanel="`lesson / action / back to the list / ${$route.name}`" :to="$tpath('/course/main/')">
      <button class="robot--finish-back" v-html="$t('projects.back')"/>
    </nuxt-link>

    <nuxt-link v-mixpanel="`lesson / action / next lesson / ${$route.name}`" v-if="finished" :to="$tpath(`/course/main/${info.next}/`)">
      <button :class="['robot--finish-next', {'robot--finish-next-active': lessonFinished()}]" @click="checkForPoints()" v-html="$t('projects.next')"/>
    </nuxt-link>
    <button v-mixpanel="`lesson / action / try again / ${$route.name}`" v-else :class="['robot--finish-next', {'robot--finish-next-active': lessonFinished()}]" @click="checkForPoints()" v-html="`${$t('projects.next')} <span>(<img src='${require('~/assets/icons/star.svg')}'/>${info.points})</span><span class='robot--finish-desc'>Чтобы перейти на следующий урок, нужно еще <img src='${require('~/assets/icons/star.svg')}'/>${info.points - user.points}.<button>Пройди урок еще раз</button></span>`"/>
    <!-- </nuxt-link> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheQuestion from '~/components/Robot/TheQuestion.vue';
import TheMessage from '~/components/Robot/TheMessage.vue';
import TheWord from '~/components/Robot/TheWord.vue';

export default{
  components: {
    TheQuestion,
    TheMessage,
    TheWord,
  },

  props: {
    recording: { type: Boolean, required: true },
    transcript: { type: Array, required: true },
  },

  data() {
    return {
      finished: false,
    };
  },

  computed: {
    ...mapGetters({
      translations: 'message/translations',
      questions: 'lesson/questions',
      errors: 'message/errors',
      videos: 'lesson/videos',
      courses: 'user/courses',
      voice: 'lesson/voice',
      words: 'lesson/words',
      info: 'lesson/info',
      user: 'user/info',
    }),

    getRandomEmoji() {
      const emojies = ['👍', '😊', '😀', '😍', '🤗', '😙', '😎', '🙃', '😸'];
      const emojie = Math.floor(Math.random() * emojies.length);
      return emojies[emojie];
    },
  },

  mounted() {
    this.analyzeTextForErrors();
    this.finished = this.lessonsPassed();
  },

  methods: {
    analyzeTextForErrors() {
      this.transcript.forEach((message, key) => {
        if (message.author === 'You') {
          const data = {
            text: message.text,
            id: key,
          };
          this.$store.dispatch('message/CHECK_TEXT_ERRORS', data);
        }
      });
    },

    sayTheWord(word) {
      this.responsiveVoice.speak(word, this.voice, { rate: 0.9 });
    },

    lessonFinished() {
      return this.user.points >= this.info.points;
    },

    checkForPoints() {
      if (this.lessonFinished()) {
        this.openNewLesson();
        this.$router.push(this.$tpath(`/course/main/${this.info.next}/`));
        setTimeout(() => {
          this.$store.commit('user/CLEAR_POINTS');
        }, 300);
      } else {
        this.$router.push(this.$tpath('/course/main/'));
      }
    },

    lessonsPassed() {
      const courses = this.courses && this.courses[0];
      return courses && this.info && this.courses[0].lessons[this.info.index] && this.courses[0].lessons[this.info.index].completed;
    },

    openNewLesson() {
      if (this.courses && this.courses[0] && this.info && this.courses[0].lessons[this.info.index]) {
        const course = this.courses[0];
        const lesson = course.lessons[this.info.index];
        const data = {
          courseId: course._id,
          lessonId: lesson._id,
          completed: true,
          points: 100,
        };
        this.$store.dispatch('user/SET_LESSON_STATUS', data);
      }
    },
  },
};
</script>

<style>
.robot{
  &--finish{
    transform: translate3d(-50%, 0, 0);
    transition: all .3s ease-in-out;
    padding: 10px 40px 35px;
    margin-bottom: 50px;
    border-radius: 25px;
    position: absolute;
    background: white;
    max-width: 600px;
    text-align: left;
    color: $dark;
    z-index: 99;
    width: 80%;
    left: 50%;
    top: 50px;

    &-title{
      text-align: center;
      font-weight: 600;
      margin-top: 30px;
      font-size: 300%;
    }

    .message--word-translated{
      top: -25px;
    }

    @media (width < $bootstrapMob) {
      padding: 10px 20px 30px;
      width: 90%;
    }

    &-transcription{
      background: #e7e7e7;
      padding: 8px 0 20px;
      margin-bottom: 45px;
      border-radius: 5px;
      font-size: 120%;
      color: $dark;

      .message{
        background: none;
        margin-bottom: 0;
        color: $dark;
        padding: 0;
      }

      .robot--transcript-text{
        text-align: left;
      }

      .message--author{
        margin-left: 5px;
      }

      .message--answer{
        display: none;
      }

      .message--word{
        display: inline-block;
      }

      p{
        padding: 2px 20px 4px;
        font-size: 90%;
      }
    }

    &-questions,
    &-videos{
      margin-top: 60px;
    }

    &-list{
      padding: 15px 25px 25px;
      background: #e7e7e7;
      border-radius: 5px;
      margin-top: 15px;

      .robot--finish-videos &{
        background: black;
      }

      &-item{
        padding-top: 20px;
      }
    }

    &-column{
      padding-top: 0;
      column-count: 2;
    }

    &-back{
      background: #fc9149;
    }
    &-next{
      background: #2b2f38;
      position: relative;
      cursor: text;
      float: right;

      &:hover{
        transform: none;
      }

      &-active{
        background: $buttons;
        cursor: pointer;

        &:hover{
          transform: scale(1.1);
        }

        .robot--finish-desc{
          display: none;
        }
      }
      span{
        font-size: 80%;
      }
      img{
        position: relative;
        margin-right: 4px;
        width: 13px;
      }
    }

    &-desc{
      transition: all .3s ease-in-out;
      pointer-events: none;
      background: $buttons;
      border-radius: 20px;
      position: absolute;
      padding: 15px 13px;
      color: white;
      opacity: 0;
      top: -18px;
      right: 0;

      img{
        margin-right: 2px;
        top: 1px;
      }

      button{
        margin: 12px auto 0;
        background: white;
        font-size: 80%;
        color: $dark;
      }

      .robot--finish-next:hover &{
        pointer-events: all;
        opacity: 1;
      }
    }
  }
}
</style>
