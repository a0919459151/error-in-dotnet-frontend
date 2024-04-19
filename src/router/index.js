import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/Login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
