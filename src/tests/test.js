const UserService = require('../services/userservice');
const UserDao = require('../dao/userdao');

jest.mock('../dao/userdao');

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

  // Add more tests here
});