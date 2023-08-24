const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();  
        res.status(200).json(users);
        console.log("Obteniendo usuarios...");
        console.log(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

        newUser.password = hashedPassword; 
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;  
        const user = await User.findById(userId);  

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

//Login Añadido

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};




