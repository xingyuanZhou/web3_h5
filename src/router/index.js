import { createRouter, createWebHistory } from "vue-router";
import Tabbar from "../components/Tabbar/Tabbar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Tabbar,
      redirect: '/home',
      children: [
        {
          path: "/home",
          component: () => import("@/views/home/home.vue"),
        },
        {
          path: "/power",
          component: () => import("@/views/power/power.vue"),
        },
        {
          path: "/profit",
          component: () => import("@/views/profit/profit.vue"),
        },
        {
          path: "/recommend",
          component: () => import("@/views/recommend/recommend.vue"),
        },
      ],
    },
    {
      path: "/trans",
      component: () => import("@/views/trans/trans.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  next()
})
export default router;
