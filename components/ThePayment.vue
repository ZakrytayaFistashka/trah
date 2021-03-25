<template>
  <div v-if="user && (user.name || user.code)" class="payment-wrap">
    <template v-if="user && user.name">
      <h2 class="payment-title" v-html="$t('global.access')"/>
      <p>Для продолжения курса нужно пополнить баланс на&nbsp;<b>75&nbsp;₽</b>. После оплаты откроется доступ к 5 новым урокам курса «Релокация».</p>
      <form v-if="orderLoaded" name="TinkoffPayForm" onsubmit="pay(this); return false;">
        <input class="tinkoffPayRow" type="hidden" value="75" placeholder="Сумма заказа" name="amount" required>
        <input class="tinkoffPayRow" type="hidden" value="Оплата курса «Релокация»" placeholder="Описание заказа" name="description">
        <input :value="order._id" class="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order">
        <input :value="user.name" class="tinkoffPayRow" type="hidden" placeholder="ФИО плательщика" name="name">
        <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1557579950486">
        <input class="tinkoffPayRow" type="hidden" name="frame" value="true">
        <input class="tinkoffPayRow" type="hidden" name="language" value="ru">
        <button v-mixpanel="'pay'" class="payment-button button-big" @click="payStart()">Оплатить</button>
      </form>
      <p class="payment-offer"><a href="/offer/" target="_blank" v-html="$t('global.offer')"/></p>
    </template>
    <the-sign v-else-if="user && user.code === 401"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheSign from '~/components/TheSign.vue';

export default {
  components: {
    TheSign,
  },

  data() {
    return {
      paymentActive: false,
      orderLoaded: false,
    };
  },

  computed: mapGetters({
    courses: 'user/courses',
    order: 'user/order',
    user: 'user/info',
  }),

  watch: {
    user() {
      this.getOrder();
    },
    courses() {
      this.getOrder();
    },
  },

  mounted() {
    this.getOrder();
  },

  methods: {
    async getOrder() {
      if (this.courses && this.courses[0] && !this.courses[0].pay && this.user && this.user.name) {
        const order = {
          courseId: this.courses[0]._id,
          cost: 100,
        };
        await this.$store.dispatch('user/SET_NEW_ORDER', order);
        this.orderLoaded = true;
      }
    },

    payStart() {
      this.paymentActive = true;
      this.$store.commit('user/SET_PAYMENT_STATUS', true);
    },
  },
};
</script>

<style>
.payment{
  &-wrap{
    transform: translate3d(-50%, -50%, 0);
    padding: 30px 30px 25px;
    border-radius: 10px;
    text-align: center;
    position: fixed;
    background: white;
    max-width: 300px;
    z-index: 99;
    width: 90%;
    left: 50%;
    top: 50%;

    button{
      margin-bottom: 0;
    }
    p{
      font-size: 100%;
    }
  }
  &-title{
    font-weight: 600;
    font-size: 220%;
    margin-top: 0;
    color: $dark;
  }
  &-offer{
    font-size: 80%;
  }
  &-button{
    font-size: 160%;
  }
}
</style>
