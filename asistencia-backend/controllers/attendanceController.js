const Attendance = require('../models/Attendance');

const recordAttendance = async (req, res) => {
    try {
        const { dni, materia, horaInicio, horaFin } = req.body;

        if (!dni || !materia || !horaInicio || !horaFin) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        const newAttendance = new Attendance({
            dni,
            materia,
            horaInicio,
            horaFin
        });

        await newAttendance.save();
        res.json({ msg: 'Asistencia registrada correctamente' });

    } catch (error) {
        console.error("Error en recordAttendance:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const getAttendanceByDNI = async (req, res) => {
    try {
        const { dni } = req.params;
        const attendanceRecords = await Attendance.find({ dni });

        if (!attendanceRecords.length) {
            return res.status(404).json({ msg: 'No se encontraron registros para este DNI' });
        }

        res.json(attendanceRecords);
    } catch (error) {
        console.error("Error en getAttendanceByDNI:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = { recordAttendance, getAttendanceByDNI };