import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        product_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        img_url: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
