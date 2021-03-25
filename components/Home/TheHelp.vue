<template>
  <div class="home--help">
    <h2 class="home--help-title" v-html="$t('home.help')"/>
    <p class="home--help-desc" v-html="$t('home.help_desc')"/>
    <div class="home--help-example">
      <div class="home--help-talk home--help-talk-robot">
        <p><span class="home--help-name">Lisa:</span>&nbsp;What is&nbsp;your <span class="home--help-favorite">favorite</span><span class="home--help-translate"></span> rock band?<span class="home--help-talk-answer"><img src="~/assets/home/answer.svg"/></span><span class="home--help-talk-text"></span></p>
      </div>

      <div class="home--help-talk home--help-talk-you">
        <p><span class="home--help-name">You:</span>&nbsp;I like <span class="home--help-mistake">a</span><span class="home--help-correct"></span> Aerosmith.</p>
      </div>

      <div class="home--help-cursor">
        <img src="~/assets/home/cursor.png"/>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes robot {
  from {
    opacity: 0;
    transform: translate3d(0, 100px ,0);
  }
  10%, 55%{
    opacity: 1;
    transform: none;
  }

  63%, to{
    transform: translate3d(0, -50px ,0);
    opacity: 0;
  }
}

@keyframes you {
  from, 53%{
    opacity: 0;
    transform: translate3d(0, 100px ,0);
  }
  63%, 95%{
    transform: translate3d(0, -55px ,0);
    opacity: 1;
  }
  100%{
    transform: translate3d(0, -55px ,0);
    opacity: 0;
  }
}

@keyframes favorite {
  from,12%{
    background: transparent;
  }
  14%,22%{
    background: $buttons;
  }
  24%, 100%{
    background: transparent;
  }
}

@keyframes answer {
  from,28%{
    background: transparent;
  }
  30%,50%{
    background: $buttons;
  }
  55%, 100%{
    background: transparent;
  }
}

@keyframes answer-text {
  from,30%{
    opacity: 0;
  }
  32%,50%{
    opacity: 1;
  }
  55%, 100%{
    opacity: 0;
  }
}

@keyframes cursor {
  from, 5%{
    transform: translate3d(-20px, -40px, 0);
  }
  13%, 22%{
    transform: translate3d(300px, 100px, 0);
  }
  28%,50%{
    transform: translate3d(495px, 80px, 0);
  }
  55%, 75%{
    transform: translate3d(320px, -40px, 0);
  }
  80%, 90%{
    transform: translate3d(305px, 105px, 0);
  }
  95%, to{
    transform: translate3d(-20px, -40px, 0);
  }

}

@keyframes translate {
  from,14%{
    opacity: 0;
  }
  16%,22%{
    opacity: 1;
  }
  24%, 100%{
    opacity: 0;
  }
}

@keyframes mistake {
  from, 67%{
    background: transparent;
  }
  70%, 90%{
    background: $error;
  }
  93%, to{
    background: transparent;
  }
}

@keyframes correct {
  from, 78%{
    opacity: 0;
  }
  82%, 90%{
    opacity: 1;
  }
  93%, to{
    opacity: 0;
  }
}

.home{
  &--help{
    text-align: center;
    max-width: 90%;
    margin: 0 auto;

    &-desc {
      max-width: 600px;
      margin: 0 auto;
    }

    &-example{
      transform-origin: left center;
      padding: 60px 0 10px;
      margin: 20px auto 0;
      border-radius: 70px;
      position: relative;
      background: $dark;
      overflow: hidden;
      width: 650px;
      color: white;

      @media (width < $mediaIpad) {
        max-width: 100%;
      }

      p{
        font-weight: 700;
        font-size: 150%;
        color: white;
      }
    }
    &-name{
      color: $comment;
    }

    &-cursor{
      animation: cursor 20s infinite;
      position: absolute;
      left: 0;
      top: 0;
      @media (width < $mediaIpad) {
        display: none;
      }
    }

    &-favorite{
      animation: favorite 20s infinite;
      background: $buttons;
      position: relative;
      padding: 2px 4px;
      margin: 0 -4px;
    }

    &-translate {
      animation: translate 20s infinite;
      position: relative;
      opacity: 0;

      &:before {
        background: $buttons;
        content: 'любимый';
        position: absolute;
        font-weight: 300;
        font-size: 60%;
        padding: 4px 0;
        width: 82px;
        left: -77px;
        top: -30px;
      }
    }

    &-mistake{
      animation: mistake 20s infinite;
      background: $error;
      position: relative;
      padding: 1px 4px 1px 3px;
      margin: 0 -4px 0 -2px;
    }

    &-correct {
      position: relative;

      &:before {
        content: 'Артикуль ‘a’ перед Aerosmith не ставится';
        animation: correct 20s infinite;
        background: $error;
        position: absolute;
        font-weight: 300;
        font-size: 60%;
        padding: 4px 0;
        width: 180px;
        left: -14px;
        top: -50px;
      }
    }

    &-talk{
      &-robot{
        animation: robot 20s infinite;
        position: relative;
      }
      &-you{
        animation: you 20s infinite;
        opacity: 0;
      }

      &-answer{
        animation: answer 20s infinite;
        display: inline-block;
        margin-right: -15px;
        border-radius: 50%;
        position: relative;
        margin: 0 2px;
        height: 18px;
        padding: 8px;
        width: 18px;
        top: -15px;

        img{
          position: relative;
          width: 16px;
          top: -11px;
        }
      }

      &-text{
        animation: answer-text 20s infinite;
        position: relative;
        opacity: 0;

        &:before {
          content: 'I like The Beatles';
          background: $buttons;
          border-radius: 20px;
          position: absolute;
          font-weight: 300;
          font-size: 60%;
          padding: 4px 0;
          left: -15px;
          width: 120px;
          top: -36px;

          @media (width < $bootstrapMob) {
            left: -155px;
            width: 120px;
            top: -40px;
          }
        }
      }
    }
  }
}
</style>
