const PageContent = require("../models/PageContent");
const Permission = require("../models/Permission");

exports.getPageContent = async (req, res) => {
  try {
    const pagePermission = await Permission.findOne({ key: req.params.page });
    if (pagePermission && !pagePermission.isEnabled) {
      return res.status(403).json({
        message: "Dynamic content disabled for this page",
        isStatic: true,
      });
    }

    const content = await PageContent.findOne({ page: req.params.page });

    // If no content exists yet, return empty defaults instead of 404
    if (!content) {
      return res.json({
        page: req.params.page,
        sections: {},
        isInitialized: false,
      });
    }

    const allPermissions = await Permission.find({
      key: { $regex: new RegExp(`^${req.params.page}\\.`) },
    });

    const filteredSections = { ...(content.sections || {}) };
    allPermissions.forEach((p) => {
      const sectionKey = p.key.split(".")[1];
      if (!p.isEnabled && filteredSections[sectionKey]) {
        delete filteredSections[sectionKey];
      }
    });

    res.json({
      ...content.toObject(),
      sections: filteredSections,
      isInitialized: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const { sections } = req.body;
    let content = await PageContent.findOne({ page: req.params.page });

    if (content) {
      content.sections = sections;
      await content.save();
    } else {
      content = new PageContent({
        page: req.params.page,
        sections: sections,
      });
      await content.save();
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
