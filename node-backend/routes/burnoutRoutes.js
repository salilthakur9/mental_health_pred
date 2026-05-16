import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getBurnoutHistory
} from "../controllers/burnoutController.js";

const router = express.Router();

router.get("/history", protect, getBurnoutHistory);

export default router;