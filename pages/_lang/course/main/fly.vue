<template>
  <section class="talk talk-fly">
    <img class="talk-fly--plane" src="~/assets/projects/main/airport-svg/plane.svg"/>
    <img class="talk-fly--cloud talk-fly--cloud-01" src="~/assets/projects/main/fly/cloud-01.svg"/>
    <img class="talk-fly--cloud talk-fly--cloud-02" src="~/assets/projects/main/fly/cloud-02.svg"/>
  </section>
</template>

<script>

export default {
  data() {
    return {
      nextLesson: {},
    };
  },

  mounted() {
    const airport = this.$t('/course/main/airport/');
    this.nextLesson = setTimeout(() => {
      this.$router.push(airport);
    }, 6000);
  },

  beforeDestroy() {
    clearInterval(this.nextLesson);
    this.$store.commit('lesson/CLEAR_ALL');
  },
};
</script>

<style>
@keyframes plane {
  from {
    transform: translate3d(-50%, -45%, 0);
  }
  50%{
    transform: translate3d(-50%, -55%, 0);
  }
  100% {
    transform: translate3d(-50%, -45%, 0);
  }
}

@keyframes cloud {
  from {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-150vw, 0, 0);
  }
}

.talk-fly {
  &:after{
    display: none;
  }
  &--plane{
    animation: plane 3s infinite;
    animation-timing-function: linear;
    transform: translate3d(-50%,-50%,0);
    position: fixed;
    z-index: 99;
    width: 30vw;
    left: 50%;
    top: 50%;
  }

  &--cloud{
    position: fixed;
    z-index: 80;
    &-01{
      animation: cloud 12s infinite;
      animation-timing-function: linear;
      top: 10%;
      right: -25%;
      width: 25%;
    }
    &-02{
      animation: cloud 10s infinite;
      animation-timing-function: linear;
      width: 30%;
      top: 85%;
      right: 10%;
    }
  }
}
</style>
