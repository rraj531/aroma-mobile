require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const sequelize = require("./config/database");
const { errorHandler } = require("./middleware/errorHandler");

// Route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const couponRoutes = require("./routes/couponRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const frontendRoot = path.resolve(__dirname, "..");

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Frontend files and assets
app.get(["/", "/index.html", "/aroma1.html"], (req, res) => {
  res.sendFile(path.join(frontendRoot, "aroma1.html"));
});
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(frontendRoot, "style.css"));
});
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(frontendRoot, "script.js"));
});
app.get("/api.js", (req, res) => {
  res.sendFile(path.join(frontendRoot, "api.js"));
});
app.use("/images", express.static(path.join(frontendRoot, "images")));
app.use("/videos", express.static(path.join(frontendRoot, "videos")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

// API health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Aroma Mobile & Electronics API Running",
    status: "OK",
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to Database and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    return sequelize.sync(); // Sync models with database
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      );
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
