const Blog = require("../models/Blog");
const Inquiry = require("../models/Inquiry");
const Consultation = require("../models/Consultation");

exports.getStats = async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments();
    const inquiryCount = await Inquiry.countDocuments();
    const consultationCount = await Consultation.countDocuments();

    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(3);
    const recentConsultations = await Consultation.find()
      .sort({ createdAt: -1 })
      .limit(3);

    const activity = [
      ...recentBlogs.map((b) => ({
        type: "blog",
        title: `New blog: "${b.title}"`,
        time: b.createdAt,
      })),
      ...recentInquiries.map((i) => ({
        type: "inquiry",
        title: `New inquiry from ${i.name}`,
        time: i.createdAt,
      })),
      ...recentConsultations.map((c) => ({
        type: "consultation",
        title: `New consultation: ${c.name}`,
        time: c.createdAt,
      })),
    ]
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);

    res.json({
      stats: {
        blogs: blogCount,
        inquiries: inquiryCount,
        consultations: consultationCount,
        visits: "2.8k",
      },
      activity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

