const Inquiry = require("../models/Inquiry");
const transporter = require("../config/transporter");
const config = require("../config/config");

exports.createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newInquiry = new Inquiry({ name, email, message });
    await newInquiry.save();

    const ownerMailOptions = {
      from: `"${name}" <${config.smtp.user}>`,
      to: config.smtp.user,
      subject: `New Inquiry from ${name}`,
      html: `<h1>New Contact Form Submission</h1><p>From: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    await transporter.sendMail(ownerMailOptions);
    res
      .status(200)
      .json({ success: true, message: "Inquiry sent successfully" });
  } catch (error) {
    console.error("Inquiry Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
