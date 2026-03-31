const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getUsers,
  createUser,
  getUserById,
} = require("../controllers/userController");
const { login } = require("../controllers/loginController");

const validateUser = require("../middleware/validateUser");

// define routes
router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, validateUser, createUser);
router.get("/:id", getUserById);
router.post("/login", login);

module.exports = router;
