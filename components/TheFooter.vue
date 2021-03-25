<template>
  <footer class="footer">
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    lang: 'page/lang',
  }),
};
</script>
