import mongoose from "mongoose";

import dotenv from "dotenv";

import recommendations from "./data/recommendations.js";

import Recommendation from "./models/Recommendation.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

await Recommendation.deleteMany();

await Recommendation.insertMany(recommendations);

console.log("Seed inserted ✅");

process.exit();