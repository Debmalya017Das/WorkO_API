const mongoose = require('mongoose');
const UserService = require('../services/userservice');
const UserDao = require('../dao/userdao');
const User = require('../models/usermodel'); // Import the User model
const dotenv = require('dotenv');

dotenv.config();

describe('UserService Integration Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({}); // Completely remove all documents
  });

  const createMockUser = (index = 0) => ({
    email: `test${index}@example.com`,
    name: `Test User ${index}`,
    age: 30,
    city: 'Test City',
    zipCode: '12345',
    password: 'testPassword123'
  });

  test('createUser should create a new user', async () => {
    const mockUser = createMockUser();
    const result = await UserService.createUserWithPassword(mockUser, mockUser.password);
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(mockUser.email);
    expect(result.name).toBe(mockUser.name);

    const userInDb = await UserDao.findById(result.id);
    expect(userInDb).toBeTruthy();
    expect(userInDb.email).toBe(mockUser.email);
  });

test('getUserById should return a user', async () => {
  const mockUser = createMockUser(1);
  const createdUser = await UserService.createUserWithPassword(mockUser, mockUser.password);
  const result = await UserService.getUserById(createdUser.id);
  expect(result.id.toString()).toEqual(createdUser.id.toString()); // Convert both to strings
  expect(result.email).toBe(mockUser.email);
  expect(result.name).toBe(mockUser.name);
});

  test('getAllUsers should return all users', async () => {
    await UserService.createUserWithPassword(createMockUser(2), 'password');
    await UserService.createUserWithPassword(createMockUser(3), 'password');
    
    const result = await UserService.getAllUsers();
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('id');
    expect(result[1]).toHaveProperty('id');
  });

  test('updateUser should update a user', async () => {
  const mockUser = createMockUser(4);
  const createdUser = await UserService.createUserWithPassword(mockUser, mockUser.password);
  const updatedData = { name: 'Updated Name', age: 31 };
  const result = await UserService.updateUser(createdUser.id, updatedData);
  expect(result.name).toBe(updatedData.name);
  expect(result.age).toBe(updatedData.age);

  const userInDb = await UserDao.findById(createdUser.id);
  expect(userInDb.name).toBe(updatedData.name);
  expect(userInDb.age).toBe(updatedData.age);
});

  test('deleteUser should soft delete a user', async () => {
    const mockUser = createMockUser(5);
    const createdUser = await UserService.createUserWithPassword(mockUser, mockUser.password);
    await UserService.deleteUser(createdUser.id);

    const userInDb = await UserDao.findById(createdUser.id);
    expect(userInDb.isDeleted).toBe(true);

    const allUsers = await UserService.getAllUsers();
    expect(allUsers.find(u => u.id === createdUser.id)).toBeUndefined();
  });

  test('validateUser should validate user credentials', async () => {
    const mockUser = createMockUser(6);
    await UserService.createUserWithPassword(mockUser, mockUser.password);
    const result = await UserService.validateUser(mockUser.email, mockUser.password);
    expect(result).toBeTruthy();
    expect(result.email).toBe(mockUser.email);
  });

  test('validateUser should return null for invalid credentials', async () => {
    const mockUser = createMockUser(7);
    await UserService.createUserWithPassword(mockUser, mockUser.password);
    const result = await UserService.validateUser(mockUser.email, 'wrongpassword');
    expect(result).toBeNull();
  });
});