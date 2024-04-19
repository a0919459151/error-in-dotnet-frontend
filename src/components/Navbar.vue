<template>
  <nav class="navbar">
      <button @click="logout">Logout</button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  alert('You have been logged out.');
  router.push({ name: 'Login' });
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f5f5f5;
}

.navbar button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>