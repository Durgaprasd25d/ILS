const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enhanced CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim());

const corsOptions = {
    origin: true, // Reflects the requesting origin back (needed for credentials)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_MAIL,
        pass: process.env.APP_PASSWORD
    }
});

// Test Connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// Health Check Endpoint (Keep-Alive)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'active', message: 'Server is alive' });
});

// 2. Consultation Form Endpoint
app.post('/api/consultation', async (req, res, next) => {
    try {
        const { name, email, phone, serviceType, projectType, message } = req.body;

        // Basic Validation
        if (!name || !email || !phone || !serviceType) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Email to Owner
        const ownerMailOptions = {
            from: `"${name}" <${process.env.APP_MAIL}>`,
            to: process.env.APP_MAIL,
            subject: `New Consultation Request: ${projectType || serviceType} - ${name}`,
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #c9a961;">
                    <h2 style="color: #c9a961; font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 30px; border-bottom: 1px solid #c9a961; padding-bottom: 10px;">New Consultation Request</h2>
                    
                    <div style="margin-bottom: 25px;">
                        <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Client Name</p>
                        <p style="margin: 0; font-size: 18px; font-weight: 500;">${name}</p>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Contact Details</p>
                        <p style="margin: 0; font-size: 16px;">Email: ${email}</p>
                        <p style="margin: 0; font-size: 16px;">Phone: ${phone}</p>
                    </div>

                    <div style="grid-template-columns: 1fr 1fr; display: grid; gap: 20px; margin-bottom: 25px;">
                        <div>
                            <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Service Type</p>
                            <p style="margin: 0; font-size: 16px; text-transform: capitalize;">${serviceType}</p>
                        </div>
                        <div>
                            <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Project Type</p>
                            <p style="margin: 0; font-size: 16px; text-transform: capitalize;">${projectType || 'N/A'}</p>
                        </div>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Project Vision</p>
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #cccccc;">${message || 'No additional details provided.'}</p>
                    </div>

                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1a1a1a; font-size: 12px; color: #666666; text-align: center;">
                        <p>© 2026 INTERIQ INTERIORS. Luxury Design Consultation System.</p>
                    </div>
                </div>
            `
        };

        // Confirmation Email to User
        const userMailOptions = {
            from: `"INTERIQ INTERIORS" <${process.env.APP_MAIL}>`,
            to: email,
            subject: `Your Consultation Request with INTERIQ INTERIORS`,
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #c9a961;">
                    <h1 style="color: #c9a961; font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 20px; text-align: center;">Welcome to the Vision</h1>
                    <p style="font-size: 16px; line-height: 1.6; color: #cccccc; margin-bottom: 30px; text-align: center;">
                        Dear ${name}, thank you for reaching out to INTERIQ INTERIORS. We have received your request for a <strong>${serviceType}</strong> consultation and our design team is already reviewing your vision.
                    </p>
                    
                    <div style="background-color: #0c0c0c; padding: 30px; border-left: 2px solid #c9a961; margin-bottom: 30px;">
                        <h3 style="color: #c9a961; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin-top: 0;">Next steps</h3>
                        <p style="font-size: 14px; color: #999999; margin-bottom: 0;">
                            Our principal designer will contact you within the next 48 hours to schedule a detailed discovery call and discuss your ${projectType || 'project'} narrative.
                        </p>
                    </div>

                    <div style="text-align: center; margin-bottom: 40px;">
                        <p style="font-size: 14px; color: #666666; font-style: italic;">
                            "Precision in detail, luxury in life."
                        </p>
                    </div>

                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
                        <p style="color: #c9a961; font-size: 14px; font-weight: 600; margin-bottom: 5px;">INTERIQ INTERIORS</p>
                        <p style="font-size: 11px; color: #444444; text-transform: uppercase; letter-spacing: 2px;">Luxury Residential & Commercial Design</p>
                        <p style="font-size: 11px; color: #444444; margin-top: 15px;">B-202, Biraja Complex, Bomikhal, Bhubaneswar</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(userMailOptions);
        res.status(200).json({ success: true, message: 'Consultation request sent successfully' });
    } catch (error) {
        next(error);
    }
});

// 3. Join Circle Endpoint
app.post('/api/join-circle', async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // Email to Owner
        const ownerMailOptions = {
            from: `"The Circle" <${process.env.APP_MAIL}>`,
            to: process.env.APP_MAIL,
            subject: `New Member Joined The Circle: ${email}`,
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 500px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #c9a961; text-align: center;">
                    <h2 style="color: #c9a961; font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px;">The Private Circle</h2>
                    <p style="color: #c9a961; font-size: 10px; uppercase; letter-spacing: 3px; margin-bottom: 30px;">New Membership Alert</p>
                    
                    <p style="font-size: 16px; color: #cccccc; margin-bottom: 10px;">A new visionary has joined our exclusive circle:</p>
                    <p style="font-size: 22px; font-weight: 600; color: #ffffff; border: 1px solid #333; padding: 15px; display: inline-block;">${email}</p>
                    
                    <div style="margin-top: 40px; border-top: 1px solid #1a1a1a; padding-top: 20px; font-size: 11px; color: #444444;">
                        <p>© 2026 INTERIQ INTERIORS. Exclusive Circle Management.</p>
                    </div>
                </div>
            `
        };

        // Welcome Email to User
        const userMailOptions = {
            from: `"INTERIQ INTERIORS" <${process.env.APP_MAIL}>`,
            to: email,
            subject: `Welcome to The Circle | INTERIQ INTERIORS`,
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #c9a961;">
                    <h1 style="color: #c9a961; font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 15px; text-align: center; text-transform: uppercase; letter-spacing: 4px;">Welcome to The Circle</h1>
                    <p style="font-size: 15px; line-height: 1.8; color: #cccccc; margin-bottom: 30px; text-align: center;">
                        You are now part of an exclusive community of design visionaries. Prepare to receive private project insights, early access to new collections, and the latest trends in high-end luxury interiors.
                    </p>
                    
                    <div style="text-align: center; margin: 40px 0;">
                        <div style="display: inline-block; padding: 2px; background: linear-gradient(to right, #c9a961, #b89851); border-radius: 0;">
                            <div style="background: #050505; padding: 15px 40px;">
                                <span style="color: #c9a961; font-size: 12px; font-weight: bold; letter-spacing: 3px; text-decoration: none;">PRIVILEGED ACCESS ENABLED</span>
                            </div>
                        </div>
                    </div>

                    <p style="font-size: 13px; color: #666666; text-align: center; line-height: 1.6;">
                        Thank you for choosing to belong among the few who define architectural elegance.
                    </p>

                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
                        <p style="color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 3px;">The Private Circle • INTERIQ INTERIORS</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(userMailOptions);
        res.status(200).json({ success: true, message: 'Joined the circle successfully' });
    } catch (error) {
        next(error);
    }
});

// 4. General Inquiry Endpoint
app.post('/api/inquiry', async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Email to Owner
        const ownerMailOptions = {
            from: `"${name}" <${process.env.APP_MAIL}>`,
            to: process.env.APP_MAIL,
            subject: `General Inquiry: ${name}`,
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #c9a961;">
                    <h2 style="color: #c9a961; font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 30px; border-bottom: 1px solid #c9a961; padding-bottom: 10px;">General Inquiry</h2>
                    
                    <div style="margin-bottom: 25px;">
                        <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Name</p>
                        <p style="margin: 0; font-size: 18px;">${name}</p>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Email</p>
                        <p style="margin: 0; font-size: 16px;">${email}</p>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <p style="margin: 5px 0; color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Message</p>
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #cccccc;">${message}</p>
                    </div>

                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1a1a1a; font-size: 12px; color: #666666; text-align: center;">
                        <p>© 2026 INTERIQ INTERIORS. Contact Portal.</p>
                    </div>
                </div>
            `
        };

        // Acknowledgment Email to User
        const userMailOptions = {
            from: `"INTERIQ INTERIORS" <${process.env.APP_MAIL}>`,
            to: email,
            subject: `Thank you for contacting INTERIQ INTERIORS`,
            html: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; border: 1px solid #c9a961;">
                    <h2 style="color: #c9a961; font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px; text-align: center;">Message Received</h2>
                    <p style="font-size: 15px; line-height: 1.7; color: #cccccc; margin-bottom: 30px; text-align: center;">
                        Dear ${name}, thank you for reaching out to us. We have received your message regarding your design inquiry and appreciate your interest in our architectural services.
                    </p>
                    
                    <div style="border: 1px solid #1a1a1a; padding: 25px; margin-bottom: 30px;">
                        <p style="color: #c9a961; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">Summary of your vision</p>
                        <p style="font-size: 14px; color: #888888; font-style: italic; border-left: 2px solid #333; padding-left: 15px;">"${message}"</p>
                    </div>

                    <p style="font-size: 14px; color: #999999; text-align: center;">
                        One of our design consultants will review your narrative and respond shortly.
                    </p>

                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
                        <p style="color: #c9a961; font-size: 13px; font-weight: 600;">INTERIQ INTERIORS</p>
                        <p style="font-size: 10px; color: #444444; letter-spacing: 2px; margin-top: 5px;">WWW.INTERIQINTERIORS.COM</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(ownerMailOptions);
        await transporter.sendMail(userMailOptions);
        res.status(200).json({ success: true, message: 'Inquiry sent successfully' });
    } catch (error) {
        next(error);
    }
});

// 5. Global Error Handler
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()}:`, err.message);
    
    // Handle CORS errors specifically
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'Access denied: Unauthorized origin',
            error: 'CORS_POLICY_VIOLATION'
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: 'An internal server error occurred',
        error: process.env.NODE_ENV === 'production' ? 'INTERNAL_ERROR' : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
