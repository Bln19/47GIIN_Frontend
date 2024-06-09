import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ContactView from '../views/ContactView.vue';
import DashboardView from '../views/DashboardView.vue';
import UrbanizationView from '../views/UrbanizationView.vue';
import EditOwnerView from '../views/EditOwnerView.vue';
import EditEmployeView from '../views/EditEmployeView.vue';
import PermissionsView from '../views/PermissionsView.vue';
import EditRoleView from '../views/EditRoleView.vue';
import EditPermissionsView from '../views/EditPermissionsView.vue';



import LoginForm from '../components/LoginForm.vue';
import UrbForm from '../components/UrbForm.vue';
import UserRegisterForm from '../components/UserRegisterForm.vue';
import OwnerList from '../components/OwnerList.vue';
import EmployesList from '../components/EmployesList.vue';
import RolesList from '../components/RolesList.vue';
import RoleRegisterForm from '../components/RoleRegisterForm.vue';
import PermissionsList from '../components/PermissionsList.vue';
import PermissionsForm from '../components/PermissionsForm.vue';
import RegisterUrbanizationForm from '../components/RegisterUrbanizationForm.vue';


import store from '../store';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: DashboardView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/urbanization/:id',
    name: 'urbanization',
    component: UrbanizationView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/register_urbanization',
    name: 'add-urbanizacion',
    component: RegisterUrbanizationForm,
    meta: { requiresAuth: true, role: 'superadmin'},

  },
  {
    path: '/',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/urb/:id',
    name: 'urb',
    component: UrbForm,
    props: true,
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegisterForm,
    meta: {
      requiresAuth: true,
      role: 'administrador',
    },
  },
  {
    path: '/propietarios/:id',
    name: 'propietarios',
    component: OwnerList,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/edit-propietario/:id',
    name: 'edit-propietario',
    component: EditOwnerView,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/empleados/:id',
    name: 'empleados',
    component: EmployesList,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/edit-empleado/:id',
    name: 'edit-empleado',
    component: EditEmployeView,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/roles/:id',
    name: 'roles',
    component: RolesList,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/roles/:id/permisos',
    name: 'permissions-role',
    component: PermissionsView,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/roles/add',
    name: 'add-rol',
    component: RoleRegisterForm,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/roles/:id/edit',
    name: 'edit-rol',
    component: EditRoleView,
    props: true,
    meta: {requiresAuth: true, role: 'administrador'},

  },
  {
    path: '/permissions/:id',
    name: 'permissions',
    component: PermissionsList,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/permisos/:id',
    name: 'edit-permiso',
    component: EditPermissionsView,
    props: true,
    meta: { requiresAuth: true, role: 'administrador' },
  },
  {
    path: '/permissions/add',
    name: 'add-permiso',
    component: PermissionsForm,
    meta: { requiresAuth: true, role: 'administrador' },
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const role = store.getters.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.meta.role && to.meta.role !== role) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;