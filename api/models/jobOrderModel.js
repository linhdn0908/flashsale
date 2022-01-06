import mongoose from "mongoose";

const jobOrderSchema = mongoose.Schema(
    {
        job_id: {
            type: String,
            required: true,
        },
        order_id: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        }
    },
);

const JobOrder = mongoose.model("JobOrder", jobOrderSchema);

export default JobOrder;
