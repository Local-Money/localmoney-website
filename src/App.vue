<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
@import "@/style/app.scss";

/* Main Style */
body {
  margin: 0 auto;
  font-family: "Poppins", sans-serif;
  color: $base-text;
  background-color: $background;
  min-width: 1000px;

  @media only screen and (max-width: 550px) {
    min-width: 0px;
  }
}

button {
  height: 40px;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  cursor: pointer;
}

::selection {
  color: $base-text;
  background-color: $primary;
}
</style>
