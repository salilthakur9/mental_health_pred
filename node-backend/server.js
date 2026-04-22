import express from "express";
import axios from "axios";
import cors from "cors";
import suggestions from "./suggestions.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
  try {
    const { features } = req.body;

    // Validation
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({
        error: "Invalid features array"
      });
    }

    // Call FastAPI
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      { features }
    );

    const prediction = response.data.prediction;

    // Get suggestions
    const resultData = suggestions[prediction];

    res.json({
      prediction,
      level: resultData.level,
      suggestions: resultData.tips
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: "Prediction failed"
    });
  }
});

app.listen(5000, () => {
  console.log("Node server running on port 5000 🚀");
});