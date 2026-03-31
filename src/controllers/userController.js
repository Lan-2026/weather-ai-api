const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/userService");
// temporary in-memory data
const users = [];

// GET /users
const getUsers = asyncHandler(async (req, res) => {
  const users = userService.getAllUsers();
  res.json({ success: true, data: users });
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);
  const user = userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  res.json({ success: true, data: user });
});

// POST /users
const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const newUser = userService.createUser(name.trim(), email.trim());

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

module.exports = {
  getUsers,
  createUser,
  getUserById,
};
