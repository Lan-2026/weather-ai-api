const express = require("express");
const router = express.Router();

const { chat, weatherChat } = require("../controllers/aiController");

router.post("/chat", chat);
router.post("/weather", weatherChat);

module.exports = router;
