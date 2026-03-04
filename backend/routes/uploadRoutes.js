const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/upload");
const cloudinaryService = require("../services/cloudinaryService");

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      const result = await cloudinaryService.uploadImage(
        req.file.buffer,
        "general",
      );
      res.json({ featuredImage: result.secure_url });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ message: error.message });
    }
  },
);

module.exports = router;
