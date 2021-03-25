<template>
  <section v-if="data" class="admin-add">
    <h1>Edit course</h1>
    <input v-model="data.name" placeholder="Name"/>
    <input v-model="data.slug" placeholder="Url"/>
    <textarea v-model="data.description" placeholder="Description"/>
    <input v-model="data.preview" placeholder="Preview"/>
    <textarea v-model="data.lessons" class="admin-add--lessons" placeholder="Lessons"/>
    <button @click="updateCourse()">Save</button>
    <button @click="deleteCourse()">Delete</button>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      data: {
        name: '',
        slug: '',
        description: '',
        preview: '',
        lessons: [],
      },
    };
  },

  computed: {
    ...mapGetters({
      course: 'admin/course',
    }),
  },

  mounted() {
    this.getCourse();
  },

  methods: {
    async getCourse() {
      await this.$store.dispatch('admin/GET_COURSE', this.$route.params.course);
      const lessons = JSON.stringify(this.course.lessons);
      this.data = JSON.parse(JSON.stringify(this.course));
      this.data.lessons = lessons;
    },

    async updateCourse() {
      const lessons = JSON.parse(this.data.lessons);
      this.data.lessons = lessons;
      await this.$store.dispatch('admin/UPDATE_COURSE', this.data);
      this.$router.push('/admin/');
    },

    deleteCourse() {
      this.$store.dispatch('admin/DELETE_COURSE', this.$route.params.course);
      this.$router.push('/admin/');
    },
  },
};
</script>

<style>
.admin-add{
  padding: 80px;

  &--lessons{
    min-height: 300px;
  }

  textarea,
  input{
    border: solid 1px #ddd;
    text-align: left;
    padding: 4px 8px;
    max-width: 500px;
    font-size: 120%;
    display: block;
    color: $dark;
    width: 100%;
  }
}
</style>
