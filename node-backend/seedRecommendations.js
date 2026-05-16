import dotenv from "dotenv";
import mongoose from "mongoose";

import Recommendation from "./models/Recommendation.js";

import recommendations from "./data/recommendations.js";

dotenv.config();

const seedData = async () => {

  try {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected ✅");


    // CLEAR OLD DATA

    await Recommendation.deleteMany();

    console.log("Old recommendations removed");


    // INSERT NEW DATA

    await Recommendation.insertMany(recommendations);

    console.log("Recommendations seeded ✅");


    process.exit();

  }

  catch (error) {

    console.error(error);

    process.exit(1);

  }

};

seedData();