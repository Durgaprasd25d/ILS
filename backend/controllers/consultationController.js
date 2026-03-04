const Consultation = require("../models/Consultation");
const transporter = require("../config/transporter");
const config = require("../config/config");

exports.createConsultation = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      projectType,
      budget,
      timeline,
      message,
    } = req.body;
    if (!name || !email || !phone || !serviceType) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newConsultation = new Consultation({
      name,
      email,
      phone,
      serviceType,
      projectType,
      budget,
      timeline,
      message,
    });
    await newConsultation.save();

    const ownerMailOptions = {
      from: `"${name}" <${config.smtp.user}>`,
      to: config.smtp.user,
      subject: `New Consultation Request: ${projectType || serviceType} - ${name}`,
      html: `<h1>New Consultation Request</h1><p>From: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Service: ${serviceType}</p><p>Budget: ${budget}</p><p>Timeline: ${timeline}</p><p>Message: ${message}</p>`,
    };
    await transporter.sendMail(ownerMailOptions);
    res.status(200).json({
      success: true,
      message: "Consultation request sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

