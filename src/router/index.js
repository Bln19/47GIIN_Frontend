import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";
import DashboardView from "../views/DashboardView.vue";

import LoginForm from "../components/LoginForm.vue";
import UrbForm from "../components/UrbForm.vue";
import UserRegisterForm from "../components/UserRegisterForm.vue";

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
    path: "/dashboard/:id",
    name: "dashboard",
    component: DashboardView,
    props: true,
    meta: { requiresAuth: true }
  },

  {
    path: "/login",
    name: "login",
    component: LoginForm, 
  },
  {
    path: "/urb/:id",
    name: "urb",
    component: UrbForm, 
    props: true
  },
  {
    path: "/register",
    name: "register",
    component: UserRegisterForm, 
    meta: { 
      requiresAuth: true,
      role: 'administrador'
    }
  },
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('user');
  const userRole = sessionStorage.getItem('role');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    next({ name: 'home' });
  } else {
    next();
  }
});


export default router;
