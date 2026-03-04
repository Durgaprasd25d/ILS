const express = require("express");
const cors = require("cors");
const dns = require("dns");
const path = require("path");
const config = require("./config/config");
const connectDB = require("./config/db");
const routes = require("./routes");
const { seedPermissions } = require("./controllers/permissionController");

// Force IPv4
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const app = express();
const PORT = config.port;

// 1. Database Connection
connectDB();

// 2. CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const localOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ];

    const isAllowed =
      !origin ||
      config.allowedOrigins.indexOf(origin) !== -1 ||
      (config.env === "development" && localOrigins.includes(origin));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// 3. Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 4. Routes
app.use("/api", routes);

// 5. Seed Permissions
seedPermissions();

// 6. Global Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT} in ${config.env} mode`);
});
