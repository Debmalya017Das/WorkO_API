## WorkO_API
WorkO_API is a project designed to manage work-related tasks efficiently through a robust API. This document provides instructions for setting up the project and details about the tests performed.


To set up and run this project, ensure you have the following prerequisites installed:

1) Node.js (v14.x or later)
2) npm (v6.x or later)
3) MongoDB
   
## Setup
Clone the repository

```
git clone https://github.com/Debmalya017Das/WorkO_API.git
cd WorkO_API
```
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
```
npm test

```
Test coverage

## API Endpoints

- POST /worko/user/register - Register a new user
- POST /worko/user/login - Login a user
- GET /worko/user/:id - Get a user by ID
- GET /worko/user - Get all users
- PUT /worko/user/:id - Update a user
- DELETE /worko/user/:id - Delete a user

  ## Note : All the tests work by interacting with the mongodb server. If mongodb is not connected then the tests will be failed.

## Demo of working on my local device 
![image](https://github.com/Debmalya017Das/WorkO_API/assets/106435168/471a1da9-66c7-4c32-b9a0-3dcaaecaa30a)
![image](https://github.com/Debmalya017Das/WorkO_API/assets/106435168/a340821c-6ab6-401e-8efb-bf1f46720725)



License
This project is licensed under the MIT License.

