<template>
  <section class="admin">
    <h1>Admin</h1>
    <div v-if="courses.length" class="admin--courses">
      <h3>Courses</h3>
      <p v-for="course in courses" :key="course.slug">
        <nuxt-link :to="`/admin/courses/${course._id}/`">{{ course.name }}</nuxt-link>
      </p>
    </div>
    <nuxt-link class="no-link" to="/admin/add/">
      <button class="button-big">Add course</button>
    </nuxt-link>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      reviewSlide: 1,
    };
  },

  computed: {
    ...mapGetters({
      courses: 'admin/courses',
    }),
  },

  mounted() {
    this.$store.dispatch('admin/GET_COURSES');
  },

  methods: {
  },
};
</script>

<style>
.admin{
  padding: 80px;
  &--courses{
    margin-bottom: 20px;
  }
}
</style>
