import { createApp } from "vue";
import VueApexCharts from "vue3-apexcharts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMobileDetection from "vue-mobile-detection";

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .use(VueMobileDetection)
  .mount("#app");
