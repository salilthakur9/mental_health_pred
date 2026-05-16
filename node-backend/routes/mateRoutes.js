import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  chatWithMate
} from "../controllers/mateController.js";

const router = express.Router();

router.post(
  "/chat",
  protect,
  chatWithMate
);

export default router;