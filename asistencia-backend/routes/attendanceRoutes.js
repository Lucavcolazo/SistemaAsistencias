const express = require('express');
const { recordAttendance, getAttendanceByDNI } = require('../controllers/attendanceController'); // Asegurar que estas funciones existen

const router = express.Router();

router.post('/record', recordAttendance); // Registrar asistencia
router.get('/:dni', getAttendanceByDNI);  // Consultar asistencia por DNI

module.exports = router;