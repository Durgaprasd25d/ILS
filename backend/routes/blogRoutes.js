const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);
router.post("/", authenticateToken, upload.single("image"), blogController.createBlog);
router.put("/:id", authenticateToken, upload.single("image"), blogController.updateBlog);
router.delete("/:id", authenticateToken, blogController.deleteBlog);

module.exports = router;

