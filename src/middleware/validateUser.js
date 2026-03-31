const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      error: { message: "Name is required" },
    });
  }

  if (typeof email !== "string" || !email.trim() || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      error: { message: "Valid email is required" },
    });
  }

  // move to next step
  next();
};

module.exports = validateUser;
