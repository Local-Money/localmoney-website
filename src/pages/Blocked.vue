<template>
  <head>
    <title>Local Terra</title>
  </head>
  <body>
    <section></section>
  </body>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Blocked",
  components: {},

  data: () => ({
    isMobile: false,
  }),

  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
</style>
