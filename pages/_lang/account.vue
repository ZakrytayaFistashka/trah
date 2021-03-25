<template>
  <section class="account">
    <div class="panel">
      <h1 v-html="$t('global.learning_centre')"/>
      <projects/>
    </div>
  </section>
</template>

<script>
import Projects from '~/components/Projects.vue';

export default {
  components: {
    Projects,
  },
};
</script>
