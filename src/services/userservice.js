const UserDao = require('../dao/userdao');
const UserDto = require('../dto/userdto');
const { validateUser, validateUserUpdate } = require('../validators/uservalidator');

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
    const { error } = validateUserUpdate({ id, ...userData });
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const userToCreate = {
      ...userData,
      password: hashedPassword
    };

    const user = await UserDao.create(userToCreate);
    return new UserDto(user);
  }
 
}

module.exports = new UserService();