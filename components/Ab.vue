<template>
  <div v-if="visible">
    <slot v-if="a" name="a"></slot>
    <slot v-if="b" name="b"></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
  },

  data() {
    return {
      visible: false,
      a: false,
      b: false,
    };
  },

  computed: {
    testName() {
      const ab = this.a ? 'A' : 'B';
      return `${this.name} / ${ab}`;
    },
  },

  mounted() {
    this.randomizeAB();
    this.visible = true;
    this.$nextTick(() => {
      this.defineAB();
    });
  },

  methods: {
    randomizeAB() {
      if (Math.random() >= 0.5) this.a = true;
      else this.b = true;
    },
    defineAB() {
      if (process.env.NODE_ENV === 'production') {
        window.mixpanel.track(this.testName);
      }
    },
  },
};
</script>
