<template>
  <div class="container">
    <h1>Panel de Administración</h1>
    <input type="text" v-model="dniBuscar" placeholder="Buscar por DNI" />
    <button @click="buscarAsistencias">Buscar</button>

    <div v-if="asistencias.length > 0" class="results">
      <h2>Resultados:</h2>
      <ul>
        <li v-for="asistencia in asistencias" :key="asistencia._id">
          📅 {{ asistencia.fecha }} | {{ asistencia.nombre }} - {{ asistencia.materia }} ({{ asistencia.horaInicio }} - {{ asistencia.horaFin }})
        </li>
      </ul>
    </div>
    <p v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import api from '../services/api';


const dniBuscar = ref('');
const asistencias = ref([]);
const errorMsg = ref('');

const buscarAsistencias = async () => {
  try {
    const response = await api.get(`/attendance/${dniBuscar.value}`);
    asistencias.value = response.data;
  } catch (error) {
    errorMsg.value = 'Error al obtener asistencias';
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

.results {
  margin-top: 20px;
  background: #333;
  padding: 10px;
  border-radius: 5px;
}
</style>