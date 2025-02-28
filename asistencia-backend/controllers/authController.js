const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { dni, nombre, apellido, email, password, rol } = req.body;

        let user = await User.findOne({ dni });
        if (user) return res.status(400).json({ msg: 'El usuario ya está registrado' });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario con la contraseña encriptada
        user = new User({ dni, nombre, apellido, email, password: hashedPassword, rol });
        await user.save();

        res.json({ msg: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error("Error en registerUser:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { dni, password } = req.body;

        const user = await User.findOne({ dni });
        if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            dni: user.dni,  // 👈 Ahora el frontend recibe el DNI correctamente
            rol: user.rol
        });

    } catch (error) {
        console.error("Error en loginUser:", error);
        res.status(500).json({ msg: 'Error en el servidor' });
};
}

module.exports = { registerUser, loginUser };