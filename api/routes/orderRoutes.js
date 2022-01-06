import express from "express";
import {
    addOrderToQueue,
    getStatusOrderByJobID
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/queues").post(protect, addOrderToQueue);

// router.route("/getStatusOrder").post(protect, getStatusOrder);

router
    .route("/:job_id")
    .get(getStatusOrderByJobID)

export default router;
