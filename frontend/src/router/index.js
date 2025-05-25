// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import SignUpView from '@/views/auth/SignUpView.vue';
import DashboardView from '@/views/admin/AdminView.vue';
import UsersView from '@/views/admin/users/UserView.vue';
import VehicleView from '@/views/admin/vehicles/VehicleView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: '/users',
        component: UsersView,
      },
      {
        path: '/vehicles',
        component: VehicleView,
      }
    ],
  },
];

const router = createRouter({
//   history: createWebHistory(),
    history: createWebHistory('/app'),
  routes,
});

export default router;
