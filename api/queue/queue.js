import Queue from 'bull';
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import JobOrder from "../models/jobOrderModel.js";

const initQueue = () => {
    const flashsaleQueue = new Queue('flash_sale', 'redis://127.0.0.1:6379');

    flashsaleQueue.process(async function (job, done) {
        let id = job.id
        let data = job.data

        // handle reduce quantity and create order
        let product = await Product.findOneAndUpdate(
            {
                product_id: data.product_id,
                quantity: { $gt: 0 }
            },
            { $inc: { quantity: -1 } },
            { returnOriginal: false }
        )
        if (!product) {
            await JobOrder.updateOne({ job_id: id }, { $set: { order_id: null, status: 0 } })
            // or give a error if error
            done(new Error('error'));
        }

        let order_id = new Date().getTime()
        let order = await Order.create({ order_id, product_id: product.product_id, job_id: id, user_id: data.user_id })

        if (order.order_id) {
            await JobOrder.updateOne({ job_id: id }, { $set: { order_id: order.order_id, status: 1 } })
            // call done when finished
            done();
        } else {
            await JobOrder.updateOne({ job_id: id }, { $set: { order_id: null, status: 0 } })
            // or give a error if error
            done(new Error('error'));
        }
    });

    return flashsaleQueue
}

export default initQueue