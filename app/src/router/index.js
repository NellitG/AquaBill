import { createRouter, createWebHistory } from "vue-router";
import { HomeView, PostsView, DetailsView, LoginView, ClientsView, ReadingsView, HistoryView, SignUpView, DestinationView } from "../views";
import { useAuthStore } from "../store";
import History from '@/components/History.vue';

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/posts", name: "posts", component: PostsView },
  { path: "/posts/:id", name: "details", component: DetailsView, props: true },
  {path:"/clients", name:"Clients", component: () => import("../views/ClientsView.vue")},
  {path:"/readings", name:"Readings", component: () => import("../views/ReadingsView.vue")},
  {path:"/history", name:"History", component: () => import("../views/HistoryView.vue")},
  {path: "/SignUp", name: "signup", component: () => import("../views/SignUpView.vue")},
  {path: "/destination", name: "destination", component: () => import("../views/DestinationView.vue")},
  {path: "/history", component: History},
];

/**Initialize here */
const router = createRouter({ history: createWebHistory(), routes });



export default router;
