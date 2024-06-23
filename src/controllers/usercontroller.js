const UserService = require('../services/userservice');
const jwt = require('jsonwebtoken');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.userId, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async partialUpdateUser(req, res) {
    try {
      const user = await UserService.partialUpdateUser(req.params.userId, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.userId);
      res.json({ message: 'User soft deleted successfully', user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }


async login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async register(req, res) {
    try {
      const { email, name, age, city, zipCode, password } = req.body;
      const userData = { email, name, age, city, zipCode };
      const user = await UserService.createUserWithPassword(userData, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();