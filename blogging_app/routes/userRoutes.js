const express = require("express");
const {
  loginController,
  registerController,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();

// Login For Users
router.post("/login", loginController);
// Register For Users
router.post("/register", registerController);
router.get("/get-user/:id", getUserById);

module.exports = router;
