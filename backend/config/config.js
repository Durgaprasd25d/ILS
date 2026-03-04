require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  env: NODE_ENV,
  port: process.env.PORT || 5000,
  mongodbUri:
    NODE_ENV === "production"
      ? process.env.MONGODB_URI_PROD
      : process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  allowedOrigins:
    NODE_ENV === "production"
      ? (process.env.ALLOWED_ORIGINS_PROD || "").split(",").map((o) => o.trim())
      : (process.env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()),
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.APP_MAIL || "interiqinteriors@gmail.com",
    pass: process.env.APP_PASSWORD || "lemg tadg wfhy auhk",
  },
};

module.exports = config;
