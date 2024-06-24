const bcrypt = require('bcrypt');
const UserService = require('../services/userservice');
const UserDao = require('../dao/userdao');
const { validateUserUpdate } = require('../validators/uservalidator'); // Import validateUserUpdate

jest.mock('../dao/userdao');
jest.mock('bcrypt');

describe('UserService', () => {
  const mockUserInput = {
    email: 'test@example.com',
    name: 'Test User',
    age: 30,
    city: 'Test City',
    zipCode: '12345',
  };

  const mockUserOutput = {
    _id: '123',
    ...mockUserInput
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createUser should create a new user', async () => {
    UserDao.create.mockResolvedValue(mockUserOutput);
    const result = await UserService.createUser(mockUserInput);
    expect(result).toEqual(expect.objectContaining({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    }));
    expect(UserDao.create).toHaveBeenCalledWith(mockUserInput);
  });

  test('getUserById should return a user', async () => {
    UserDao.findById.mockResolvedValue(mockUserOutput);
    const result = await UserService.getUserById('123');
    expect(result).toEqual(expect.objectContaining({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    }));
    expect(UserDao.findById).toHaveBeenCalledWith('123');
  });

  test('getAllUsers should return all users', async () => {
    const mockUsers = [mockUserOutput];
    UserDao.findAll.mockResolvedValue(mockUsers);
    const result = await UserService.getAllUsers();
    expect(result).toEqual(mockUsers.map(user => expect.objectContaining({
      id: user._id,
      email: user.email,
      name: user.name,
    })));
    expect(UserDao.findAll).toHaveBeenCalled();
  });


  test('deleteUser should delete a user', async () => {
    UserDao.softDelete.mockResolvedValue(mockUserOutput);
    const result = await UserService.deleteUser('123');
    expect(result).toEqual(expect.objectContaining({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    }));
    expect(UserDao.softDelete).toHaveBeenCalledWith('123');
  });

  test('validateUser should validate user credentials', async () => {
    const password = 'password123';
    const hashedPassword = '$2b$10$abcdefghijklmnopqrstuvwxyz01234';
    const validUser = { ...mockUserOutput, password: hashedPassword };

    UserDao.findByEmail.mockResolvedValue(validUser);

    // Mock bcrypt.compare
    bcrypt.compare.mockResolvedValue(true);

    const result = await UserService.validateUser('test@example.com', password);
    expect(result).toEqual(expect.objectContaining({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    }));
    expect(UserDao.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  test('validateUser should return null for invalid credentials', async () => {
    const password = 'invalidPassword';
    const invalidUser = { ...mockUserOutput, password: '$2b$10$invalidhash1234567890' };

    UserDao.findByEmail.mockResolvedValue(invalidUser);

    // Mock bcrypt.compare for invalid password
    bcrypt.compare.mockResolvedValue(false);

    const result = await UserService.validateUser('test@example.com', password);
    expect(result).toBeNull();
    expect(UserDao.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  // Add more tests as needed
});
