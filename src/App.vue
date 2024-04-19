<template>
  <div id="app">

    <Navbar v-if="isAuthenticated" />

    <!-- Conditional rendering based on authentication state -->
    <div v-if="isAuthenticated">
      isAuthenticated: {{ isAuthenticated }}
      <router-view />
    </div>
    <div v-else>
      isAuthenticated: {{ isAuthenticated }}
      <Login />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
import Navbar from './components/Navbar.vue';
import Login from './components/Login.vue';

const authStore = useAuthStore();

const isAuthenticated = computed(() => !!authStore.accessToken);
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
