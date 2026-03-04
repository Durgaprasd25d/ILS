const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      config.jwtSecret,
      { expiresIn: "24h" },
    );
    res.json({ success: true, token, user: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.setup = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0)
      return res.status(400).json({ message: "Admin already exists" });

    const { email, password } = req.body;
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
