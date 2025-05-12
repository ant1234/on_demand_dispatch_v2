// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import SignUpView from '@/views/auth/SignUpView.vue';

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
];

const router = createRouter({
//   history: createWebHistory(),
    history: createWebHistory('/app'),
  routes,
});

export default router;
