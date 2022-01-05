import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
});

export { getProducts };
