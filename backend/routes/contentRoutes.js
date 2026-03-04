const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");
const authenticateToken = require("../middleware/auth");

router.get("/:page", contentController.getPageContent);
router.post("/:page", authenticateToken, contentController.updatePageContent);

module.exports = router;
