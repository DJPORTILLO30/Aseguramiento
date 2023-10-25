const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user'); // Asegúrate de que sea la ruta correcta a tu controlador

// Mock de funciones y objetos necesarios para las pruebas
jest.mock('../models/user'); // Mock del modelo User
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  // Prueba para getUsers
  describe('getUsers', () => {
    it('should get a list of users', async () => {
      const mockUsers = [{ username: 'user1', email: 'user1@example.com' }, { username: 'user2', email: 'user2@example.com' }];
      User.find.mockResolvedValue(mockUsers); // Simula la respuesta de la base de datos

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors when getting users', async () => {
        User.find.mockRejectedValue(new Error('Database error'));
      
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        await userController.getUsers(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener los usuarios', error: expect.any(Error) });
      });
  });

  // Prueba para createUser
  describe('createUser', () => {
    it('should create a new user', async () => {
        const mockNewUser = {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'hashedpassword',
        };
      
        const req = {
          body: mockNewUser,
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        bcrypt.hash.mockResolvedValue('hashedpassword');
        User.prototype.save.mockResolvedValue({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'hashedpassword',
        });
        jwt.sign.mockReturnValue('token');
      
        await userController.createUser(req, res);
      
        expect(res.status).toHaveBeenCalledWith(201);
      });

    it('should handle errors when creating a user', async () => {
        const req = {
          body: { username: 'newuser', email: 'newuser@example.com', password: 'password' },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        bcrypt.hash.mockRejectedValue(new Error('Hashing error'));
      
        await userController.createUser(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error al crear el usuario', error: expect.any(Error) });
      });
  });
});
