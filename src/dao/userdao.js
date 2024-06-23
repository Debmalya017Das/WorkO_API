const User = require('../models/usermodel');

class UserDao {
  async findAll() {
    return await User.find({ isDeleted: false });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async softDelete(id) {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

}


module.exports = new UserDao();