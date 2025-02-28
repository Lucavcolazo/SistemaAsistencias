<template>
  <div class="container">
    <h1>Registrar Asistencia</h1>
    <p>Seleccione la materia y las horas trabajadas:</p>

    <form @submit.prevent="registrarAsistencia">
      <select v-model="materia" required>
        <option value="">Seleccione una materia</option>
        <option value="Matemáticas">Matemáticas</option>
        <option value="Historia">Historia</option>
        <option value="Ciencias">Ciencias</option>
      </select>

      <input type="time" v-model="horaInicio" required />
      <input type="time" v-model="horaFin" required />

      <button type="submit">Guardar</button>
    </form>

    <!-- Notificación de éxito -->
    <div v-if="showSuccessMessage" class="success-overlay">
      <div class="success-message">
        <h2>Asistencia Registrada</h2>
        <p>La materia fue guardada correctamente.</p>
        <button @click="resetForm">Registrar otra asistencia</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const materia = ref('');
const horaInicio = ref('');
const horaFin = ref('');
const showSuccessMessage = ref(false);

const registrarAsistencia = async () => {
    try {
        const dniUsuario = localStorage.getItem('dni');
        console.log("DNI obtenido:", dniUsuario);  // 👈 Verificamos en consola

        if (!dniUsuario) {
            console.error("Error: No hay DNI en localStorage");
            return;
        }

        await api.post('/attendance/record', {
            dni: dniUsuario,  // 👈 Se enviará el DNI correctamente desde la base de datos
            materia: materia.value,
            horaInicio: horaInicio.value,
            horaFin: horaFin.value
        });

        showSuccessMessage.value = true;
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};

const resetForm = () => {
  showSuccessMessage.value = false;
  materia.value = '';
  horaInicio.value = '';
  horaFin.value = '';
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  background: #222;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

button {
  background-color: #1e90ff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0f78d3;
}

/* Notificación de pantalla completa */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-message {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>