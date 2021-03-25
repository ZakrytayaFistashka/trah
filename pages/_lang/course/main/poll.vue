<template>
  <section class="talk">
    <div class="talk-finish--back"/>
    <img class="talk-finish--plane" src="~/assets/projects/main/airport-svg/plane.svg"/>
    <div class="talk-finish--column"/>
    <div class="talk-finish--info">
      <h2 class="talk-finish--info-title">Ура! ✨✨ Ты прошел вводный курс!</h2>
      <p><b>hi.academy</b> только запустился и&nbsp;ты&nbsp;один из&nbsp;первых, кто дошел до&nbsp;конца игры! 🥇</p>
      <p>Мы продолжаем развивать и тестировать наш продукт, поэтому нам очень важна обратная связь.</p>
      <p>Будем рады, если ты пройдешь небольшой опрос. А&nbsp;мы&nbsp;тогда подарим тебе еще&nbsp;одну игру, как&nbsp;только она будет готова.</p>
      <nuxt-link class="no-link" to="https://forms.gle/SkUUAmAEvf2K7oW67">
        <button class="button-big">Пройти опрос</button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>

export default {
  mounted() {
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

.talk-finish {
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

  &--info{
    border-radius: 10px;
    padding: 30px 60px;
    position: relative;
    margin: 20px auto;
    background: white;
    max-width: 600px;
    z-index: 99;

    .button-big{
      margin: 20px auto;
      display: block;
    }
    &-title{
      text-align: center;
    }
  }
}
</style>
