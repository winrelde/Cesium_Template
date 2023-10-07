import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/Login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/components/Home/index.vue"),
    redirect: "/project1",
    children: [
      {
        path: "/project1",
        name: "project1",
        component: () => import("@/components/Navigation/Project1.vue"),
      },
      {
        path: "/project2",
        name: "project2",
        component: () => import("@/components/Navigation/Project2.vue"),
      },
      {
        path: "/project3",
        name: "project3",
        component: () => import("@/components/Navigation/Project3.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
