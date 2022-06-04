import { createRouter, createWebHashHistory } from "vue-router"
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/user/login/index.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/chat/index.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  console.log(to)
  if (!to.name || to.name === "/") {
    return { name: "Login" }
  }
})

export default router
