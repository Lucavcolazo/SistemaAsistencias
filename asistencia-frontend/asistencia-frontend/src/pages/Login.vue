<template>
  <div class="container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="loginUser">
      <input type="text" v-model="dni" placeholder="DNI" required />

      <div class="password-container">
        <input type="password" v-model="password" placeholder="Contraseña" required />
      </div>

      <button type="submit">Ingresar</button>
      <p v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const dni = ref('');
const password = ref('');
const errorMsg = ref('');
const router = useRouter();

const loginUser = async () => {
    try {
        const response = await api.post('/auth/login', {
            dni: dni.value,
            password: password.value
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('dni', response.data.dni);  // 👈 Ahora guardamos el DNI del backend
        localStorage.setItem('rol', response.data.rol);

        if (response.data.rol === 'admin') {
            router.push('/admin');
        } else {
            router.push('/dashboard');
        }
    } catch (error) {
        errorMsg.value = 'Error en el inicio de sesión';
    }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
}

.password-container {
  position: relative;
  display: flex;
}
</style>