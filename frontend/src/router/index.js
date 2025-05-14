// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import SignUpView from '@/views/auth/SignUpView.vue';
import DashboardView from '@/views/admin/DashboardView.vue';

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
  },
];

const router = createRouter({
//   history: createWebHistory(),
    history: createWebHistory('/app'),
  routes,
});

export default router;
