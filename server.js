require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const productsRouter = require("./routes/products");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/products", productsRouter);
app.use("/api/contact", contactRouter);

// Fallback: send index.html for any non-API route (simple SPA-style fallback)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ success: false, message: "Not found" });
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Sandas Furnitures server running at http://localhost:${PORT}`);
});
