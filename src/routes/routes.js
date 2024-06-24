const express = require('express');
const UserController = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authMiddleware);

router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);


module.exports = router;