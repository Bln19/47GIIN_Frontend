import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";
import DashboardView from "../views/DashboardView.vue";
import UrbanizationView from "../views/UrbanizationView.vue";
import EditOwnerView from "../views/EditOwnerView.vue";
import EditEmployeView from "../views/EditEmployeView.vue";

import LoginForm from "../components/LoginForm.vue";
import UrbForm from "../components/UrbForm.vue";
import UserRegisterForm from "../components/UserRegisterForm.vue";
import OwnerList from "../components/OwnerList.vue";
import EmployesList from "../components/EmployesList.vue";
import RolesList from "../components/RolesList.vue";
import RoleRegisterForm from "../components/RoleRegisterForm.vue";


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
    path: "/urbanization/:id",
    name: "urbanization",
    component: UrbanizationView,
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
  {
    path: "/propietarios/:id",
    name: "propietarios",
    component: OwnerList,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' }
  },
  {
    path: "/edit-propietario/:id",
    name: "edit-propietario",
    component: EditOwnerView,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' }
  },
  {
    path: "/empleados/:id",
    name: "empleados",
    component: EmployesList,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' }
  },
  {
    path: "/edit-empleado/:id",
    name: "edit-empleado",
    component: EditEmployeView,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' }
  },
  {
    path: "/roles/:id",
    name: "roles",
    component: RolesList,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' }
  },
  {
    path: "/add-role/:id",
    name: "add-role",
    component: RoleRegisterForm,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' }
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('role');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    next({ name: 'home' });
  } else {
    next();
  }
});


export default router;
