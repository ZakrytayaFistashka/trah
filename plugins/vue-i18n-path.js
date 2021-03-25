import Vue from 'vue';
import { mapGetters } from 'vuex';

Vue.mixin({
  computed: {
    ...mapGetters({
      locale: 'page/locale',
    }),
  },

  methods: {
    $tpath(link) {
      const currentLang = this.locale !== this.$i18n.fallbackLocale ? `/${this.locale}` : '';
      return `${currentLang}${link}`;
    },
  },
});
