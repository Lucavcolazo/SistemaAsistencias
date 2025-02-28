import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async login(dni, password) {
            try {
                const response = await axios.post('http://localhost:3000/api/auth/login', { dni, password });
                this.token = response.data.token;
                this.user = { dni, rol: response.data.rol };
                localStorage.setItem('token', this.token);
                return { success: true };
            } catch (error) {
                return { success: false, message: error.response?.data?.msg || 'Error al iniciar sesión' };
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
        }
    }
});
