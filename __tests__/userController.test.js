const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');

// Mock necessary dependencies
jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  // Prueba para getUsers
  describe('getUsers', () => {
    it('should get a list of users', async () => {
      const mockUsers = [{ username: 'user1', email: 'user1@example.com' }, { username: 'user2', email: 'user2@example.com' }];

      // Mock the find method of User model to return the mockUsers
      User.find.mockResolvedValue(mockUsers);

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
      // Mock the find method of User model to reject with an error
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
        nombre: 'newuser',
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

      // Mock the necessary functions to simulate a successful user creation
      bcryptjs.genSalt.mockResolvedValue('salt');
      bcryptjs.hash.mockResolvedValue('hashedpassword');
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue(mockNewUser);
      jwt.sign.mockReturnValue('token');

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle errors when creating a user', async () => {
      const req = {
        body: { nombre: 'newuser', email: 'newuser@example.com', password: 'password' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the necessary functions to simulate a failed user creation due to a hashing error
      bcryptjs.genSalt.mockRejectedValue(new Error('Salt error'));
      bcryptjs.hash.mockRejectedValue(new Error('Hashing error'));

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error en el servidor' });
    });
  });
});
