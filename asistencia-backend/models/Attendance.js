const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    dni: { type: String, required: true },
    materia: { type: String, required: true },
    horaInicio: { type: String, required: true },
    horaFin: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);