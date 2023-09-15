const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Routes for authentication
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/:id/roles', userController.getUserRoles);
router.post('/:userId/assignRole', userController.assignRoleToUser);

router.get('/isUsernameTaken/:username', userController.isUsernameTaken);

router.post('/initiate-password-reset', userController.initiatePasswordReset);
router.post('/reset-password', userController.resetPassword);

module.exports = router;