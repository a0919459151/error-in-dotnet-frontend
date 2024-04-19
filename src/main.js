import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './stores/auth';

const app = createApp(App);
const pinia = createPinia();
const authStore = useAuthStore(pinia);

app.use(router);
app.use(pinia);

axios.defaults.baseURL = 'https://localhost:7021';

axios.interceptors.request.use((config) => {
  const token = authStore.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    await authStore.refresh();
    originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`;
    return axios(originalRequest);
  }
  return Promise.reject(error);
});

app.mount('#app');
