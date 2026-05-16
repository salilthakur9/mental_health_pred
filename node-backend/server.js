import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

import suggestions from "./suggestions.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import User from "./models/User.js";
import burnoutRoutes from "./routes/burnoutRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/burnout", burnoutRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.post("/api/predict", protect, async (req, res) => {

  try {

    const { features } = req.body;

    if (!features || !Array.isArray(features)) {

      return res.status(400).json({
        success: false,
        error: "Invalid features array"
      });

    }

    if (features.length !== 7) {

      return res.status(400).json({
        success: false,
        error: "Exactly 7 features required"
      });

    }


    // FASTAPI CALL

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      { features }
    );


    const prediction = response.data.prediction;


    // LEVEL MAPPING

    let level = "";

    if (prediction === 0) {
      level = "Low Burnout";
    }

    else if (prediction === 1) {
      level = "Moderate Burnout";
    }

    else {
      level = "High Burnout";
    }


    // EXTRACT FEATURES

    const [
      stress,
      sleep,
      study,
      screen,
      exam,
      physical,
      family
    ] = features;


    // FIND USER

    const user = await User.findById(req.user);

    if (!user) {

      return res.status(404).json({
        success: false,
        error: "User not found"
      });

    }


    // SAVE HISTORY

    user.burnoutHistory.unshift({

      stress,
      sleep,
      study,
      screen,
      exam,
      physical,
      family,

      prediction,
      level

    });


    // KEEP ONLY LAST 10

    if (user.burnoutHistory.length > 10) {
      user.burnoutHistory.pop();
    }


    await user.save();


    res.status(200).json({

      success: true,

      prediction,

      level,

      historyCount: user.burnoutHistory.length

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      error: "Prediction failed"

    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});