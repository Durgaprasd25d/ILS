const Blog = require("../models/Blog");
const Permission = require("../models/Permission");
const slugify = require("slugify");
const cloudinaryService = require("../services/cloudinaryService");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogPermission = await Permission.findOne({ key: "blogs" });
    if (blogPermission && !blogPermission.isEnabled) {
      return res.status(403).json({ message: "Blog system is disabled" });
    }

    const { status } = req.query;
    const query = status ? { status } : {};
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blogPermission = await Permission.findOne({ key: "blogs" });
    if (blogPermission && !blogPermission.isEnabled) {
      return res.status(403).json({ message: "Blog system is disabled" });
    }

    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, summary, content, metaTitle, metaDescription, status } =
      req.body;
    const slug = slugify(title, { lower: true, strict: true });

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await cloudinaryService.uploadImage(
        req.file.buffer,
        "blogs",
      );
      imageUrl = uploadResult.secure_url;
    }

    const newBlog = new Blog({
      title,
      slug,
      summary,
      content,
      featuredImage: imageUrl,
      metaTitle: metaTitle || title,
      metaDescription,
      status: status || "Draft",
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, summary, content, metaTitle, metaDescription, status } =
      req.body;

    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog)
      return res.status(404).json({ message: "Blog not found" });

    const updateData = {
      title,
      summary,
      content,
      metaTitle,
      metaDescription,
      status,
    };

    if (title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }

    if (req.file) {
      // Delete old image from Cloudinary
      const oldPublicId = cloudinaryService.getPublicIdFromUrl(
        existingBlog.featuredImage,
      );
      if (oldPublicId) {
        await cloudinaryService.deleteImage(oldPublicId);
      }

      // Upload new image
      const uploadResult = await cloudinaryService.uploadImage(
        req.file.buffer,
        "blogs",
      );
      updateData.featuredImage = uploadResult.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(blog);
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Delete image from Cloudinary
    const publicId = cloudinaryService.getPublicIdFromUrl(blog.featuredImage);
    if (publicId) {
      await cloudinaryService.deleteImage(publicId);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: error.message });
  }
};
