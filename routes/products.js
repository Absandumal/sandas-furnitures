const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const productsPath = path.join(__dirname, "..", "data", "products.json");

function readProducts() {
  const raw = fs.readFileSync(productsPath, "utf-8");
  return JSON.parse(raw);
}

// GET /api/products?category=sofa
router.get("/", (req, res) => {
  try {
    const products = readProducts();
    const { category } = req.query;

    if (category && category !== "all") {
      return res.json(products.filter((p) => p.category === category));
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Could not load products" });
  }
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  try {
    const products = readProducts();
    const product = products.find((p) => p.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Could not load product" });
  }
});

module.exports = router;
