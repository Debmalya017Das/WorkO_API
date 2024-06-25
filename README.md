## WorkO_API
WorkO_API is a project designed to manage work-related tasks efficiently through a robust API. This document provides instructions for setting up the project and details about the tests performed.

Table of Contents
Requirements
Setup
Running the API
Testing
Contributing
License
Requirements
To set up and run this project, ensure you have the following prerequisites installed:

Node.js (v14.x or later)
npm (v6.x or later)
MongoDB
Setup
Clone the repository


git clone https://github.com/Debmalya017Das/WorkO_API.git
cd WorkO_API
Install dependencies

Install the required dependencies using npm.
```
npm install

```
Set up environment variables

I have provided the dot env file. Just change the mongo_url as per requirement. Example:
MONGO_URI = ' your mongo server string '.

Ensure MongoDB is running on your system. 

Start the API server using npm.
```
npm run dev

```
The API should now be running at http://localhost:3000.

## Testing
This project includes a set of tests to ensure the API functions correctly. The tests are written using Jest.

 Run tests

Execute the tests using the following command:

npm test
Test coverage

## API Endpoints

- POST /worko/user/register - Register a new user
- POST /worko/user/login - Login a user
- GET /worko/user/:id - Get a user by ID
- GET /worko/user - Get all users
- PUT /worko/user/:id - Update a user
- DELETE /worko/user/:id - Delete a user (

License
This project is licensed under the MIT License.

