<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="account">Account</label>
        <input v-model="loginRequestDto.account" type="text" id="account" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="loginRequestDto.password" type="password" id="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LoginRequestDto from '../dtos/auth/loginRequestDto';

const router = useRouter();
const authStore = useAuthStore();

const loginRequestDto = ref(new LoginRequestDto('', ''));

const handleLogin = async () => {
  try {
    await authStore.login(loginRequestDto.value);
    alert('Login successful!');
    router.push({ name: 'Home' });
  } catch (error) {
    alert('Login failed. Please check your login model.');
  }
};
</script>

<style>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
}

.form-group input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
</style>