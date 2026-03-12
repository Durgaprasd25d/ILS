const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const createToken = (admin) =>
  jwt.sign({ id: admin._id, email: admin.email }, config.jwtSecret, {
    expiresIn: "24h",
  });

const buildAuthResponse = (admin, message) => ({
  success: true,
  message,
  token: createToken(admin),
  user: { email: admin.email },
});

exports.login = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.json(buildAuthResponse(admin, "Login successful"));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already registered with this email",
      });
    }

    const admin = await Admin.create({ email, password });

    res
      .status(201)
      .json(buildAuthResponse(admin, "Admin registered successfully"));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.setup = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0)
      return res.status(400).json({ message: "Admin already exists" });

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json(buildAuthResponse(newAdmin, "Admin created successfully"));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
