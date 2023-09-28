import router from "@/router";
router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/login") {
    next();
    return;
  }
  if (localStorage.getItem("token")) {
    next();
  } else {
    next({ path: "/login" });
  }
});
