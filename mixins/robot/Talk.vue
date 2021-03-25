<template>
  <div></div>
</template>
<script>
import Vue from 'vue';

export default{
  data() {
    return {
      recognition: {},
      robotTalk: true,
      mistakes: 0,
      theme: {},
    };
  },

  computed: {
    step() {
      return this.dialog[this.dialogStep];
    },
  },

  watch: {
    continue() {
      this.userTalking();
    },
  },

  mounted() {
    Vue.prototype.responsiveVoice = window.responsiveVoice;
    // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // this.recognition = new SpeechRecognition();
    // this.recognition.lang = 'en-US';
    // this.recognition.onresult = this.userSay;
    // this.recognition.onend = this.userCheck;
    // this.recognition.stop();
  },

  methods: {
    robot() {
      this.todo = false;
      this.start = true;
      const message = this.getRandomQuestion(this.step);
      this.sayRobot(message);
    },

    sayRobot(message) {
      if (message.text) {
        this.robotTalk = true;
        this.pushToTranscript(message);
        this.responsiveVoice.speak(message.text, this.voice, { rate: 0.9, onstart: this.lipsTalk, onend: this.lipsTalkEnd });
      }
    },

    pushToTranscript(message) {
      if (message.text) Vue.set(this.transcript, this.transcript.length, message);
    },

    userSay(event) {
      if (!this.microphoneDisabled) {
        this.stopRecording();
        if (event.results && event.results[0]) {
          if (event.results[0][0]) {
            const recognized = event.results[0][0].transcript;
            this.userToTranscript(recognized);
          }
        }
      }
    },

    sayAnswer() {
      this.userToTranscript(this.step.validator[0]);
      this.stopRecording();
    },

    validateToDo() {
      const { tasks } = this;
      tasks[this.step.todo] = true;
      this.tasks = Object.assign({}, tasks);
    },

    validateAnswer(recognized) {
      let hasMatching = false;
      // const words = recognized.split(' ');
      const { validator } = this.step;
      if (validator && validator.length) {
        validator.forEach((sentence) => {
          if (recognized.toLowerCase() === sentence.toLowerCase()) hasMatching = true;
        });
        // words.forEach((word) => {
        //   const clearWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        //   if (validator.indexOf(clearWord.toLowerCase()) > -1) hasMatching = true;
        // });
        // if (recognized.toLowerCase() === this.step.answer.toLowerCase()) hasMatching = true;
      } else hasMatching = true;
      return hasMatching;
    },

    validateTheme(recognized) {
      let themeKey = false;
      // const words = recognized.split(' ');
      const { theme } = this.step;
      if (theme) {
        Object.keys(theme).forEach((name) => {
          theme[name].forEach((sentence) => {
            if (recognized.toLowerCase() === sentence.toLowerCase()) themeKey = name;
          });
          // words.forEach((word) => {
          //   const clearWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
          //   if (theme[name].indexOf(clearWord.toLowerCase()) > -1) themeKey = name;
          // });
        });
      }
      if (themeKey) this.theme[themeKey] = true;
    },

    stopRecording() {
      // this.recognition.stop();
      this.recording = false;
    },

    userToTranscript(recognized) {
      if (this.step.theme) this.validateTheme(recognized);

      const rightAnswer = this.validateAnswer(recognized);
      if (this.step.todo && rightAnswer) this.validateToDo(recognized);
      if (rightAnswer) {
        this.stopRecording();
        this.pushToTranscript({
          author: 'You',
          text: `${recognized}.`,
          data: this.step,
          wrongAnswer: !rightAnswer,
        });
        this.$store.commit('user/UPDATE_POINTS', this.step.point);
      } else this.mistakes += 1;

      // if (this.mistakes === 3) {
      //   this.showTrueAnswer();
      // }


      if (rightAnswer) {
        setTimeout(() => {
          this.nextStep();
        }, 2000);
      }
    },

    postActionToTranscipt() {
      this.pushToTranscript({
        action: true,
        text: this.step.action,
        data: this.step,
      });
    },

    userCheck() {
      // if (this.recording && !this.microphoneDisabled) this.recognition.start();
    },

    responseRobotAnswer(text) {
      const q = encodeURIComponent(text);
      const uri = `https://api.dialogflow.com/v1/query?v=20150910&lang=en&sessionId=12345&query=${q}`;
      const auth = `Bearer ${this.flow}`;
      fetch(uri, { headers: { Authorization: auth } })
        .then(res => res.json())
        .then((res) => {
          if (res && res.result && res.result.fulfillment && res.result.fulfillment.speech && res.result.action !== 'input.unknown') {
            this.sayRobot({
              text: res.result.fulfillment.speech,
              data: this.step,
            });
          } else {
            this.nextStep();
          }
        });
    },

    nextStep() {
      this.dialogStep += 1;
      this.mistakes = 0;
      const isStepActual = this.step && this.step.if && this.step.if.length && !this.theme[this.step.if];
      if (isStepActual) this.nextStep();
      else if (this.step) this.robot();
      else this.finish = true;
    },

    getRandomQuestion(message) {
      const randomQuestion = Math.floor(Math.random() * message.questions.length);
      const name = this.user && this.user.name ? this.user.name : 'Okay';
      const robotSay = message.questions[randomQuestion].replace('$name', name);
      return {
        text: robotSay,
        data: this.step,
      };
    },

    lipsTalk() {
      this.$store.commit('personage/SET_TALK', true);
    },

    lipsTalkEnd() {
      this.$store.commit('personage/SET_TALK', false);
      this.robotTalk = false;
      // if (this.step.onboarding) {
      //   setTimeout(() => {
      //     this.$store.commit('page/SET_ON_BOARDING', true);
      //   }, 1000);
      // } else if (this.step.inventory) {
      if (this.step.inventory) {
        this.showInventoryTips = true;
      } else this.userTalking();
    },

    userTalking() {
      this.showInventoryTips = false;
      // if (!this.microphoneDisabled) this.recognition.start();
      this.recording = true;
    },
  },
};
</script>
