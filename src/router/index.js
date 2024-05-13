import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";
import DashboardView from "../views/DashboardView.vue";

import LoginForm from "../components/LoginForm.vue";
import UrbForm from "../components/UrbForm.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }
  },

  {
    path: "/login",
    name: "login",
    component: LoginForm, 
  },
  {
    path: "/urb",
    name: "urb",
    component: UrbForm, 
    props: true
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
