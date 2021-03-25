<template>
  <section class="inner success">
    <div class="panel success-text">
      <h2 v-html="$t('global.payment')"/>
      <p>Ура! ✨ Вы открыли доступ к&nbsp;новым играм и&nbsp;заданиям!</p>
      <button class="success-button" @click="updatePage()">Продолжить игру</button>
    </div>
  </section>
</template>

<script>

export default {
  mounted() {
    this.savePaidStatus();
  },

  methods: {
    updatePage() {
      window.top.location.reload();
    },
    async savePaidStatus() {
      // await this.$store.dispatch('user/');
      // setTimeout(() => {
      //   this.$router.push(this.$t('/course/main/hotel/'));
      // }, 3000);
    },
  },
};
</script>

<style>
.success{
  &-text{
    padding: 20px 30px 30px;
    border-radius: 10px;
    text-align: center;
    background: white;
    max-width: 430px;
    margin: 0 auto;
  }

  &-button{
    padding: 13px 25px 15px;
    font-size: 150%;
  }
}
</style>
