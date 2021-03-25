<template>
  <section v-if="data" class="admin-add">
    <h1>Add course</h1>
    <input v-model="data.name" placeholder="Name"/>
    <input v-model="data.slug" placeholder="Url"/>
    <textarea v-model="data.description" placeholder="Description"/>
    <input v-model="data.preview" placeholder="Preview"/>
    <textarea v-model="data.lessons" placeholder="Lessons" class="admin-add--lessons"/>
    <button @click="addCourse()">Add</button>
  </section>
</template>

<script>
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

  methods: {
    async addCourse() {
      const lessons = JSON.parse(this.data.lessons);
      this.data.lessons = lessons;
      await this.$store.dispatch('admin/ADD_COURSE', this.data);
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
