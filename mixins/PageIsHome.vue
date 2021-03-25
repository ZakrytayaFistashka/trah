<script>
export default {
  data() {
    return {
      isHome: false,
      isDarkTheme: false,
    };
  },

  watch: {
    $route() {
      this.isHomePage();
    },
  },

  mounted() {
    this.isHomePage();
  },

  methods: {
    isHomePage() {
      this.isHome = this.$route.fullPath === '/ru/' || this.$route.fullPath === '/en/' || this.$route.path === '/';
      if (!this.isHome) {
        this.isDarkTheme = true;
        document.body.classList.add('theme-light');
      } else if (this.isHome) {
        document.body.classList.remove('theme-light');
      }
    },
  },
};
</script>
