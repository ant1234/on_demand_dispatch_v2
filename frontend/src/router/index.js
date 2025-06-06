// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import SignUpView from '@/views/auth/SignUpView.vue';
import DashboardView from '@/views/admin/AdminView.vue';
import UsersView from '@/views/admin/users/UserView.vue';
import VehicleView from '@/views/admin/vehicles/VehicleView.vue';
import WelcomeView from '@/views/admin/welcome/WelcomeView.vue';
import { isAdmin } from "@/middleware/isAdmin";
import ProfileView from '@/views/admin/users/ProfileView.vue';
import CustomerMapView from '@/views/admin/map/CustomerMapView.vue';
import DriverMapView from '@/views/admin/map/DriverMapView.vue';


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
        beforeEnter: isAdmin, 
      },
      {
        path: '/vehicles',
        component: VehicleView,
      },
      {
        path: '/welcome',
        component: WelcomeView,
      },
      {
        path: '/profile',
        component: ProfileView,
      },
      {
        path: '/customer_map',
        component: CustomerMapView,
      },
      {
        path: '/driver_map',
        component: DriverMapView,
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
