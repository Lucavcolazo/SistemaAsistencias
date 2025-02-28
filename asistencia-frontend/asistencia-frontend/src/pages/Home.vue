<template>
  <div class="container">
    <h1>Bienvenido a la App de Asistencia</h1>
    <p>Selecciona una opción:</p>
    <button @click="goToLogin">Iniciar Sesión</button>
    <button @click="goToRegister">Registrarse</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};

const goToRegister = () => {
  router.push('/register');
};
</script>