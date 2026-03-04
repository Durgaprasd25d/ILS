const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const contentRoutes = require("./contentRoutes");
const inquiryRoutes = require("./inquiryRoutes");
const consultationRoutes = require("./consultationRoutes");
const permissionRoutes = require("./permissionRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const uploadRoutes = require("./uploadRoutes");

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/content", contentRoutes);
router.use("/inquiry", inquiryRoutes);
router.use("/consultation", consultationRoutes);
router.use("/permissions", permissionRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/upload", uploadRoutes);

// Shared health endpoint
router.get("/", (req, res) => {
  res.status(200).json({ status: "active", message: "Server is alive" });
});

module.exports = router;
