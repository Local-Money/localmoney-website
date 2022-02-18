<template>
  <head>
    <title>Local Terra</title>
  </head>
  <body>
    <section class="section-spacer">
      <div class="wrap page-layout">
        <div class="wrap-img">
          <img
            src="@/assets/logo-horizontal-dark.svg"
            alt="Local Terra Logo"
            class="logo"
          />
        </div>
        <div class="wrap-content">
          <div class="wrap-img">
            <img src="@/assets/img-02.png" alt="Local Terra Logo" />
          </div>
          <div class="content">
            <h2>Ooops...</h2>
            <p>
              Unfortunately, the location you are trying to access the LBP is
              not permitted.
            </p>
          </div>
        </div>
      </div>
    </section>
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

section {
  display: flex;

  .logo {
    margin-bottom: 24px;
  }

  .wrap-content {
    .wrap-img {
      width: 30%;
      img {
        width: 100%;
      }
    }
    .content {
      width: 50%;
      h2 {
        margin-bottom: 16px;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  section {
    display: flex;
    text-align: center;

    .logo {
      margin-bottom: 32px;
    }

    .wrap-content {
      .wrap-img {
        width: 60%;
        margin: 0 auto 16px;
        img {
          width: 100%;
        }
      }
      .content {
        width: 100%;
        h2 {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
