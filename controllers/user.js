const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

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
        const { nombre, email, password } = req.body;
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'El email ya está registrado' });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
          nombre,
          email,
          password: hashedPassword,
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'Usuario registrado correctamente' });
      } catch (error) {
        console.error('Error en el registro de usuario', error);
        res.status(500).json({ message: 'Error en el servidor' });
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
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Credenciales de inicio de sesión inválidas' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Credenciales de inicio de sesión inválidas' });
        }
    
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.claveSecreta, { expiresIn: '3h' });
    
    
        res.json({ message: 'Inicio de sesión exitoso', token });
      } catch (error) {
        console.error('Error en el inicio de sesión', error);
        res.status(500).json({ message: 'Error en el servidor' });
      } 
    };

    exports.perfil = async (req, res) => {
        try {
          const usuario = req.usuario;
      
          const user = await User.findOne({ email: usuario.email });
          if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
      
          res.json({ message: 'Acceso autorizado a la ruta protegida', user });
        } catch (error) {
          console.error('Error al buscar el usuario en la base de datos', error);
          res.status(500).json({ message: 'Error en el servidor' });
        }
      };

    




