import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home";
import lbp from "@/pages/lbp";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/lbp",
      name: "lbp",
      component: lbp,
    },
  ],
});

export default router;
