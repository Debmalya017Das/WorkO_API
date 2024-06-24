const UserDao = require('../dao/userdao');
const UserDto = require('../dto/userdto');
const { validateUser, validateUserUpdate } = require('../validators/uservalidator');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(userData) {
    const { error } = validateUser(userData);
    if (error) throw new Error(error.details[0].message);

    const user = await UserDao.create(userData);
    return new UserDto(user);
  }

  async getUserById(id) {
    const user = await UserDao.findById(id);
    if (!user) throw new Error('User not found');
    return new UserDto(user);
  }

  async getAllUsers() {
    const users = await UserDao.findAll();
    return users.map(user => new UserDto(user));
  }

  async updateUser(id, userData) {
    const { error } = validateUserUpdate(userData); // Remove id from validation
    if (error) throw new Error(error.details[0].message);

    const user = await UserDao.update(id, userData);
    if (!user) throw new Error('User not found');
    return new UserDto(user);
  }

  async deleteUser(id) {
    const user = await UserDao.softDelete(id);
    if (!user) throw new Error('User not found');
    return new UserDto(user);
  }

  async validateUser(email, password) {
    const user = await UserDao.findByEmail(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? new UserDto(user) : null;
  }

  async createUserWithPassword(userData, password) {
    console.log('Creating user with password');
    console.log('User data:', userData);
    console.log('Password provided:', password ? 'Yes' : 'No');
    
    if (!password) {
      throw new Error('Password is required');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Hashed password:', hashedPassword);

    const userToCreate = {
      ...userData,
      password: hashedPassword
    };

    const user = await UserDao.create(userToCreate);
    console.log('User created:', user ? 'Yes' : 'No');
    return new UserDto(user);
  }
}

module.exports = new UserService();
