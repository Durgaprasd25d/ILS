const Permission = require("../models/Permission");
const Blog = require("../models/Blog");
const PageContent = require("../models/PageContent");

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().sort({ key: 1 });
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { isEnabled } = req.body;
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { isEnabled },
      { new: true },
    );
    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleSubtree = async (req, res) => {
  try {
    const { isEnabled } = req.body;
    const rootPermission = await Permission.findById(req.params.id);
    if (!rootPermission)
      return res.status(404).json({ message: "Permission not found" });

    const toggleChildren = async (parentId, state) => {
      const children = await Permission.find({ parentId });
      for (const child of children) {
        child.isEnabled = state;
        await child.save();
        await toggleChildren(child._id, state);
      }
    };

    rootPermission.isEnabled = isEnabled;
    await rootPermission.save();
    await toggleChildren(rootPermission._id, isEnabled);

    const allPermissions = await Permission.find().sort({ key: 1 });
    res.json(allPermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.syncPermissions = async (req, res) => {
  try {
    const standardPages = [
      { key: "home", label: "Homepage" },
      { key: "about", label: "About Us" },
      { key: "services", label: "Services" },
      { key: "residential-portfolio", label: "Residential Portfolio" },
      { key: "commercial-portfolio", label: "Commercial Portfolio" },
      { key: "residential-interiors", label: "Residential Interiors" },
      { key: "contact", label: "Contact Page" },
      { key: "consultation", label: "Book Consultation" },
      { key: "blogs", label: "Blog System" },
    ];

    for (const p of standardPages) {
      let perm = await Permission.findOne({ key: p.key });
      if (!perm) {
        perm = new Permission({ ...p, type: "page" });
        await perm.save();
      }
    }

    const blogParent = await Permission.findOne({ key: "blogs" });
    const blogs = await Blog.find();
    for (const blog of blogs) {
      const blogKey = `blog.${blog.slug}`;
      let blogPerm = await Permission.findOne({ key: blogKey });
      if (!blogPerm) {
        blogPerm = new Permission({
          key: blogKey,
          label: `Post: ${blog.title}`,
          type: "component",
          parentId: blogParent._id,
        });
        await blogPerm.save();
      }
    }

    const pageContents = await PageContent.find();
    for (const pc of pageContents) {
      let parent = await Permission.findOne({ key: pc.page });
      if (!parent) {
        const label = pc.page
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        parent = new Permission({
          key: pc.page,
          label: label + " Page",
          type: "page",
        });
        await parent.save();
      }

      if (pc.sections) {
        const sectionKeys = Object.keys(pc.sections);
        for (const sKey of sectionKeys) {
          const fullKey = `${pc.page}.${sKey}`;
          let sectionPerm = await Permission.findOne({ key: fullKey });
          if (!sectionPerm) {
            sectionPerm = new Permission({
              key: fullKey,
              label: sKey.charAt(0).toUpperCase() + sKey.slice(1) + " Section",
              type: "section",
              parentId: parent._id,
            });
            await sectionPerm.save();
          }
        }
      }
    }

    const allPermissions = await Permission.find().sort({ key: 1 });
    res.json(allPermissions);
  } catch (error) {
    console.error("Permission Sync Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.seedPermissions = async () => {
  try {
    const count = await Permission.countDocuments();
    if (count > 0) return;

    const pages = [
      { key: "home", label: "Homepage" },
      { key: "about", label: "About Us" },
      { key: "services", label: "Services" },
      { key: "residential-portfolio", label: "Residential Portfolio" },
      { key: "commercial-portfolio", label: "Commercial Portfolio" },
      { key: "residential-interiors", label: "Residential Interiors" },
      { key: "contact", label: "Contact Page" },
      { key: "consultation", label: "Book Consultation" },
    ];

    for (const page of pages) {
      const parent = new Permission({ ...page, type: "page" });
      await parent.save();

      const sections = [
        {
          key: `${page.key}.hero`,
          label: "Hero Section",
          type: "section",
          parentId: parent._id,
        },
        {
          key: `${page.key}.content`,
          label: "Main Content",
          type: "section",
          parentId: parent._id,
        },
      ];
      await Permission.insertMany(sections);
    }
    console.log("Permissions seeded successfully");
  } catch (error) {
    console.error("Error seeding permissions:", error);
  }
};
