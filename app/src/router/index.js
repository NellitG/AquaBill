import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "home", component: () => import("@/views/HomeView.vue") },
  { path: "/login", name: "login", component: () => import("@/views/LoginView.vue") },
  { path: "/posts", name: "posts", component: () => import("@/views/PostsView.vue") },
  { path: "/posts/:id", name: "details", component: () => import("@/views/DetailsView.vue"), props: true },
  { path: "/clients", name: "clients", component: () => import("@/views/ClientsView.vue") },
  { path: "/readings", name: "readings", component: () => import("@/views/ReadingsView.vue") },
  { path: "/history", name: "history", component: () => import("@/views/HistoryView.vue") },
  { path: "/logout", name: "logout", component: () => import("@/views/LogoutView.vue") },
  { path: "/destination", name: "destination", component: () => import("@/views/DestinationView.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔥 Global Auth Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  const protectedRoutes = ["/dashboard", "/clients", "/readings", "/history"];

  // If you're hitting a protected route without a token → redirect to login
  if (protectedRoutes.includes(to.path) && !isAuthenticated) {
    return next("/login");
  }

  next();
});

export default router;
