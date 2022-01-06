// import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import Queue from 'bull';
import JobOrder from "../models/jobOrderModel.js";
import Order from "../models/orderModel.js";


// @desc    Get logged in user products
// @route   GET /api/products
// @access  Private
const addOrderToQueue = asyncHandler(async (req, res) => {
    const { user_id, product_id } = req.body;
    let existOrder = await Order.findOne({ user_id: user_id, product_id: product_id })
    if (existOrder) {
        res.status(404).json({ existOrder: true, message: "You already bought 1 product in this deal" });
        return;
    }
    const flashsaleQueue = new Queue('flash_sale', 'redis://127.0.0.1:6379');
    let job = await flashsaleQueue.add({ user_id, product_id });
    await JobOrder.create({
        job_id: job.id, order_id: null, status: 10
    });
    res.json(job.id)
});

const getStatusOrderByJobID = asyncHandler(async (req, res) => {
    const jobOrder = await JobOrder.find({ job_id: req.params.job_id });

    if (jobOrder) {
        res.json(jobOrder);
    } else {
        res.status(404).json({ message: "Job Order not found" });
    }

    res.json(jobOrder);
});

export { addOrderToQueue, getStatusOrderByJobID };
