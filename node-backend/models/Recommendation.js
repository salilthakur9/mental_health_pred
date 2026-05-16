import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  moodTags: {
    type: [String],
    default: []
  },

  burnoutLevels: {
    type: [String],
    default: []
  },

  description: {
    type: String
  },

  platform: {
    type: String
  },

  link: {
    type: String
  },

  image: {
    type: String
  }

}, {
  timestamps: true
});

const Recommendation = mongoose.model(
  "Recommendation",
  recommendationSchema
);

export default Recommendation;