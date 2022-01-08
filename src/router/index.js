import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home"
import LBP from "@/pages/LBP"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/lbp",
      name: "LBP",
      component: LBP,
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
});

export default router;