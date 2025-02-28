<template>
    <div class="container">
      <h1>Registro</h1>
      <form @submit.prevent="registerUser">
        <input type="text" v-model="dni" placeholder="DNI" required />
        <input type="text" v-model="nombre" placeholder="Nombre" required />
        <input type="text" v-model="apellido" placeholder="Apellido" required />
        <input type="email" v-model="email" placeholder="Correo" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <select v-model="rol">
          <option value="profesor">Profesor</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      <p v-if="errorMsg">{{ errorMsg }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '../services/api';
  
  const dni = ref('');
  const nombre = ref('');
  const apellido = ref('');
  const email = ref('');
  const password = ref('');
  const rol = ref('profesor');
  const errorMsg = ref('');
  const router = useRouter();
  
  const registerUser = async () => {
      try {
          console.log("Datos enviados:", {
              dni: dni.value,
              nombre: nombre.value,
              apellido: apellido.value,
              email: email.value,
              password: password.value,
              rol: rol.value
          });
  
          const response = await api.post('/auth/register', {
              dni: dni.value,
              nombre: nombre.value,
              apellido: apellido.value,
              email: email.value,
              password: password.value,
              rol: rol.value
          });
  
          console.log("Respuesta del servidor:", response.data);
          router.push('/login'); // Redirigir al login después del registro
      } catch (error) {
          console.error("Error en el registro:", error);
          errorMsg.value = error.response?.data?.msg || 'Error al registrar usuario';
      }
  };
  </script>