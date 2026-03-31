const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const login = asyncHandler(async (req, res) => {
  const { username } = req.body;

  // simple mock (no DB yet)
  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  const token = jwt.sign({ username }, "secretKey", { expiresIn: "1h" });

  res.json({ token });
});

module.exports = {
  login,
};
