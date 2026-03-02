const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dns = require('dns');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const slugify = require('slugify');
require('dotenv').config();

// Models
const Admin = require('./models/Admin');
const Blog = require('./models/Blog');
const PageContent = require('./models/PageContent');
const Inquiry = require('./models/Inquiry');
const Consultation = require('./models/Consultation');
const Permission = require('./models/Permission');

// Force IPv4
if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
}

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// 2. Enhanced CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim());

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin === 'http://localhost:5175') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Authorization required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: "interiqinteriors@gmail.com",
        pass: "lemg tadg wfhy auhk"
    }
});

// --- AUTH ROUTES ---
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token, user: { email: admin.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Setup Initial Admin (One-time use or utility)
app.post('/api/auth/setup', async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) return res.status(400).json({ message: 'Admin already exists' });

        const { email, password } = req.body;
        const newAdmin = new Admin({ email, password });
        await newAdmin.save();
        res.json({ success: true, message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- UPLOAD ROUTE ---
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        res.json({ featuredImage: `/uploads/${req.file.filename}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- BLOG ROUTES ---
app.get('/api/blogs', async (req, res) => {
    try {
        // Check permission
        const blogPermission = await Permission.findOne({ key: 'blogs' });
        if (blogPermission && !blogPermission.isEnabled) {
            return res.status(403).json({ message: 'Blog system is disabled' });
        }

        const { status } = req.query;
        const query = status ? { status } : {};
        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/blogs/:slug', async (req, res) => {
    try {
        // Check permission
        const blogPermission = await Permission.findOne({ key: 'blogs' });
        if (blogPermission && !blogPermission.isEnabled) {
            return res.status(403).json({ message: 'Blog system is disabled' });
        }

        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/blogs', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { title, summary, content, metaTitle, metaDescription, status } = req.body;
        const slug = slugify(title, { lower: true, strict: true });
        
        const newBlog = new Blog({
            title,
            slug,
            summary,
            content,
            featuredImage: req.file ? `/uploads/${req.file.filename}` : '',
            metaTitle: metaTitle || title,
            metaDescription,
            status: status || 'Draft'
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/blogs/:id', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { title, summary, content, metaTitle, metaDescription, status } = req.body;
        const updateData = {
            title,
            summary,
            content,
            metaTitle,
            metaDescription,
            status
        };

        if (title) {
            updateData.slug = slugify(title, { lower: true, strict: true });
        }

        if (req.file) {
            updateData.featuredImage = `/uploads/${req.file.filename}`;
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/blogs/:id', authenticateToken, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- CONTENT MANAGEMENT ROUTES ---
app.get('/api/content/:page', async (req, res) => {
    try {
        // 1. Check Page-Level Permission
        const pagePermission = await Permission.findOne({ key: req.params.page });
        if (pagePermission && !pagePermission.isEnabled) {
            return res.status(403).json({ message: 'Dynamic content disabled for this page', isStatic: true });
        }

        const content = await PageContent.findOne({ page: req.params.page });
        if (!content) return res.status(404).json({ message: 'Content not found' });

        // 2. Filter Sections based on Component-Level Permissions
        const allPermissions = await Permission.find({ key: { $regex: new RegExp(`^${req.params.page}\\.`) } });
        
        const filteredSections = { ...content.sections };
        allPermissions.forEach(p => {
            const sectionKey = p.key.split('.')[1]; // e.g., 'hero' from 'home.hero'
            if (!p.isEnabled && filteredSections[sectionKey]) {
                delete filteredSections[sectionKey];
            }
        });

        res.json({ ...content.toObject(), sections: filteredSections });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/content/:page', authenticateToken, async (req, res) => {
    try {
        const { sections } = req.body;
        let content = await PageContent.findOne({ page: req.params.page });
        
        if (content) {
            content.sections = sections;
            await content.save();
        } else {
            content = new PageContent({
                page: req.params.page,
                sections: sections
            });
            await content.save();
        }
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- INQUIRY ROUTES ---
app.post('/api/inquiry', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // 1. Save to Database
        const newInquiry = new Inquiry({ name, email, message });
        await newInquiry.save();

        // 2. Send Email
        const ownerMailOptions = {
            from: `"${name}" <${process.env.APP_MAIL || 'interiqinteriors@gmail.com'}>`,
            to: process.env.APP_MAIL || 'interiqinteriors@gmail.com',
            subject: `New Inquiry from ${name}`,
            html: `<h1>New Contact Form Submission</h1><p>From: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
        };

        await transporter.sendMail(ownerMailOptions);
        res.status(200).json({ success: true, message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Inquiry Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- PERMISSION ROUTES ---
app.get('/api/permissions', authenticateToken, async (req, res) => {
    try {
        const permissions = await Permission.find().sort({ key: 1 });
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/permissions/:id', authenticateToken, async (req, res) => {
    try {
        const { isEnabled } = req.body;
        const permission = await Permission.findByIdAndUpdate(
            req.params.id, 
            { isEnabled }, 
            { new: true }
        );
        res.json(permission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bulk update permissions for a subtree (recursive enable/disable)
app.put('/api/permissions/toggle-subtree/:id', authenticateToken, async (req, res) => {
    try {
        const { isEnabled } = req.body;
        const rootPermission = await Permission.findById(req.params.id);
        if (!rootPermission) return res.status(404).json({ message: 'Permission not found' });

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
});

app.post('/api/permissions/sync', authenticateToken, async (req, res) => {
    try {
        const standardPages = [
            { key: 'home', label: 'Homepage' },
            { key: 'about', label: 'About Us' },
            { key: 'services', label: 'Services' },
            { key: 'residential-portfolio', label: 'Residential Portfolio' },
            { key: 'commercial-portfolio', label: 'Commercial Portfolio' },
            { key: 'residential-interiors', label: 'Residential Interiors' },
            { key: 'contact', label: 'Contact Page' },
            { key: 'consultation', label: 'Book Consultation' },
            { key: 'blogs', label: 'Blog System' }
        ];

        // 1. Ensure Standard Pages exist
        for (const p of standardPages) {
            let perm = await Permission.findOne({ key: p.key });
            if (!perm) {
                perm = new Permission({ ...p, type: 'page' });
                await perm.save();
            }
        }

        const blogParent = await Permission.findOne({ key: 'blogs' });

        // 2. Scan Blogs for individual post permissions
        const blogs = await Blog.find();
        for (const blog of blogs) {
            const blogKey = `blog.${blog.slug}`;
            let blogPerm = await Permission.findOne({ key: blogKey });
            if (!blogPerm) {
                blogPerm = new Permission({
                    key: blogKey,
                    label: `Post: ${blog.title}`,
                    type: 'component',
                    parentId: blogParent._id
                });
                await blogPerm.save();
            }
        }

        // 3. Scan PageContent for dynamic sections
        const pageContents = await PageContent.find();
        for (const pc of pageContents) {
            let parent = await Permission.findOne({ key: pc.page });
            if (!parent) {
                const label = pc.page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                parent = new Permission({ 
                    key: pc.page, 
                    label: label + " Page", 
                    type: 'page' 
                });
                await parent.save();
            }

            // Sync sections
            if (pc.sections) {
                const sectionKeys = Object.keys(pc.sections);
                for (const sKey of sectionKeys) {
                    const fullKey = `${pc.page}.${sKey}`;
                    let sectionPerm = await Permission.findOne({ key: fullKey });
                    if (!sectionPerm) {
                        sectionPerm = new Permission({
                            key: fullKey,
                            label: sKey.charAt(0).toUpperCase() + sKey.slice(1) + " Section",
                            type: 'section',
                            parentId: parent._id
                        });
                        await sectionPerm.save();
                    }
                }
            }
        }

        const allPermissions = await Permission.find().sort({ key: 1 });
        res.json(allPermissions);
    } catch (error) {
        console.error('Permission Sync Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// --- DASHBOARD STATS API ---
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
    try {
        const blogCount = await Blog.countDocuments();
        const inquiryCount = await Inquiry.countDocuments();
        const consultationCount = await Consultation.countDocuments();

        // Get recent activity
        const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
        const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(3);
        const recentConsultations = await Consultation.find().sort({ createdAt: -1 }).limit(3);

        const activity = [
            ...recentBlogs.map(b => ({ type: 'blog', title: `New blog: "${b.title}"`, time: b.createdAt })),
            ...recentInquiries.map(i => ({ type: 'inquiry', title: `New inquiry from ${i.name}`, time: i.createdAt })),
            ...recentConsultations.map(c => ({ type: 'consultation', title: `New consultation: ${c.name}`, time: c.createdAt }))
        ].sort((a, b) => b.time - a.time).slice(0, 5);

        res.json({
            stats: {
                blogs: blogCount,
                inquiries: inquiryCount,
                consultations: consultationCount,
                visits: "2.8k" // Mocked until analytics integrated
            },
            activity
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- CONSULTATION ROUTE ---
app.post('/api/consultation', async (req, res, next) => {
    try {
        const { name, email, phone, serviceType, projectType, budget, timeline, message } = req.body;
        if (!name || !email || !phone || !serviceType) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // 1. Save to Database
        const newConsultation = new Consultation({
            name, email, phone, serviceType, projectType, budget, timeline, message
        });
        await newConsultation.save();

        // 2. Send Email
        const ownerMailOptions = {
            from: `"${name}" <${process.env.APP_MAIL || 'interiqinteriors@gmail.com'}>`,
            to: process.env.APP_MAIL || 'interiqinteriors@gmail.com',
            subject: `New Consultation Request: ${projectType || serviceType} - ${name}`,
            html: `<h1>New Consultation Request</h1><p>From: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Service: ${serviceType}</p><p>Budget: ${budget}</p><p>Timeline: ${timeline}</p><p>Message: ${message}</p>`
        };

        await transporter.sendMail(ownerMailOptions);
        res.status(200).json({ success: true, message: 'Consultation request sent successfully' });
    } catch (error) {
        next(error);
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'active', message: 'Server is alive' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

// 5. Seed Initial Permissions
const seedPermissions = async () => {
    try {
        const count = await Permission.countDocuments();
        if (count > 0) return;

        const pages = [
            { key: 'home', label: 'Homepage' },
            { key: 'about', label: 'About Us' },
            { key: 'services', label: 'Services' },
            { key: 'residential-portfolio', label: 'Residential Portfolio' },
            { key: 'commercial-portfolio', label: 'Commercial Portfolio' },
            { key: 'residential-interiors', label: 'Residential Interiors' },
            { key: 'contact', label: 'Contact Page' },
            { key: 'consultation', label: 'Book Consultation' }
        ];

        for (const page of pages) {
            const parent = new Permission({ ...page, type: 'page' });
            await parent.save();

            // Add basic sections for each page
            const sections = [
                { key: `${page.key}.hero`, label: 'Hero Section', type: 'section', parentId: parent._id },
                { key: `${page.key}.content`, label: 'Main Content', type: 'section', parentId: parent._id }
            ];
            await Permission.insertMany(sections);
        }
        console.log('Permissions seeded successfully');
    } catch (error) {
        console.error('Error seeding permissions:', error);
    }
};
seedPermissions();

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
