import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    children: [],
    meta: {},
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login/index.vue"),
    children: [],
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/components/Home/GMap.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
