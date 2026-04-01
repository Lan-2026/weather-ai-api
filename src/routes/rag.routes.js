const express = require("express");
const router = express.Router();
const ragController = require("../controllers/rag.controller");

router.post("/query", ragController.queryRag);

module.exports = router;
