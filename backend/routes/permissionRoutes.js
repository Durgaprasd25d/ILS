const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");
const authenticateToken = require("../middleware/auth");

router.get("/", authenticateToken, permissionController.getPermissions);
router.put("/:id", authenticateToken, permissionController.updatePermission);
router.put("/toggle-subtree/:id", authenticateToken, permissionController.toggleSubtree);
router.post("/sync", authenticateToken, permissionController.syncPermissions);

module.exports = router;

