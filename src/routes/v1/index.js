const express = require("express");
const UserController = require("../../controllers/user-controller");
const AuthMiddleware = require("../../middlewares/auth-middlewares");

const router = express.Router();

router.post('/signup', AuthMiddleware.validateUserAuth, UserController.create);
router.post('/signin', AuthMiddleware.validateUserAuth, UserController.signIn);

router.get('/isAuthenticated', UserController.isAuthenticated);
router.get('/isAdmin', AuthMiddleware.validateIsAdminRequest, UserController.isAdmin);

module.exports = router;