import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
});

export default router;
