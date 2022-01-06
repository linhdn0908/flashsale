import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    product_id: {
        type: String, required: true
    },
    quantity: {
        type: Number, required: true
    }
})

const ordersSchema = mongoose.Schema(
    {
        order_id: {
            type: String,
            required: true,
        },
        product_id: {
            type: String
        },
        user_id: {
            type: String,
            required: true
        },
        job_id: {
            type: String,
            required: true
        }
    },
);

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
