class UserDto {
  constructor(data) {
    this.id = data._id;
    this.email = data.email;
    this.name = data.name;
    this.age = data.age;
    this.city = data.city;
    this.zipCode = data.zipCode;
  }
}

module.exports = UserDto;