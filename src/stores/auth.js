import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  }),
  actions: {
    setAccessToken(accessToken) {
      localStorage.setItem('accessToken', accessToken);
      this.accessToken = accessToken;
    },
    setRefreshToken(refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
      this.refreshToken = refreshToken;
    },
    clearTokens() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.accessToken = null;
      this.refreshToken = null;
    },
    async login(loginRequestDto) {
      const response = await axios.post('/api/Auth/Login', loginRequestDto);
      this.setAccessToken(response.data.accessToken);
      this.setRefreshToken(response.data.refreshToken);
    },
    async refresh() {
      const response = await axios.post('/api/Auth/Refresh', { refreshToken: this.refreshToken });
      this.setAccessToken(response.data.accessToken);
    },
    async logout() {
      await axios.post('/api/Auth/Logout');
      this.clearTokens();
    },
  },
});
