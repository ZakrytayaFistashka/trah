<template>
  <div class="projects">
    <div v-mixpanel="'course / main'" class="projects--block projects--block-main">
      <nuxt-link :to="$tpath('/course/main/')">
        <h3 v-html="$t('projects.relocation')"/>
        <p v-html="$t('projects.relocation_desc')"/>
        <button v-html="$t('home.start')"/>
        <!-- <img class="projects--block-pic" src="~/assets/projects/approve.png"/> -->
      </nuxt-link>
    </div>
    <div v-mixpanel="'course / interview'" class="projects--block-mini projects--block-soon">
      <div class="projects--block projects--block-interview">
        <img class="projects--block-lock" src="~/assets/icons/lock.svg"/>
        <h3 v-html="$t('projects.interview')"/>
        <!-- <h3>Interview<br/>in company</h3> -->
        <!-- <img class="projects--block-pic" src="~/assets/projects/interview.png"/> -->
      </div>

      <div v-mixpanel="'course / travel'" class="projects--block projects--block-travel projects--block-soon">
        <img class="projects--block-lock" src="~/assets/icons/lock.svg"/>
        <h3 v-html="$t('projects.travel')"/>
        <!-- <h3>Travel to&nbsp;Brazil</h3> -->
        <!-- <img class="projects--block-pic" src="~/assets/projects/brazil.png"/> -->
      </div>
    </div>
  </div>
</template>

<style>
.projects {
  display: flex;
  color: white;

  @media (width < $bootstrapMob) {
    display: block;
  }

  &--block{
    /*outline: solid 3px white;*/
    box-sizing: border-box;
    background-size: cover;
    border-radius: 20px;
    margin-bottom: 30px;
    position: relative;
    text-align: center;
    min-height: 200px;
    overflow: hidden;
    padding: 40px;

    &-soon{
      pointer-events: none;
      h3,img{
        opacity: 0.8;
      }

      button{
        background: white;
        padding: 5px 8px;
        border-radius: 0;
        font-size: 80%;
        margin-top: 0;
        color: black;
      }
    }

    &-main{
      background-image: url(~/assets/projects/main.svg);
      margin-right: 40px;
      width: 45%;

      @media (width < $bootstrapMob) {
        margin-right: 0;
        width: 80%;
      }

      .projects--block-pic{
        right: 5%;
      }
    }

    &-interview{
      background-image: url(~/assets/projects/interview.svg);
    }

    &-travel{
      background-image: url(~/assets/projects/travel.svg);
    }

    &-mini{
      width: 30%;

      @media (width < $bootstrapMob) {
        width: 100%;
        .projects--block{
          width: 80%;
        }
      }
    }
    &-pic{
      position: absolute;
      max-width: 100%;
      z-index: -1;
      bottom: 0;
      right: 0;
    }

    button{
      background: white;
      box-shadow: none;
      color: black;
      outline: 0;
      border: 0;

      &:hover{
        transform: scale(1.1);
      }
    }

    a{
      color: white;
    }
  }
}
</style>
