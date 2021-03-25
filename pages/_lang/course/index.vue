<template>
  <section class="inner">
    <div class="panel">
      <h2 v-html="$t('projects.stories')"/>
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
