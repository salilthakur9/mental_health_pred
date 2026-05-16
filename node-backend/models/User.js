import mongoose from "mongoose";

const burnoutSchema = new mongoose.Schema({

  stress: {
    type: Number
  },

  sleep: {
    type: Number
  },

  study: {
    type: Number
  },

  screen: {
    type: Number
  },

  exam: {
    type: Number
  },

  physical: {
    type: Number
  },

  family: {
    type: Number
  },

  prediction: {
    type: Number
  },

  level: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { _id: false });

const moodSchema = new mongoose.Schema({

  sentiment: {
    type: String
  },

  emotion: {
    type: String
  },

  score: {
    type: Number
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { _id: false });

const diarySchema = new mongoose.Schema({

  text: {
    type: String
  },

  aiResponse: {
    type: String
  },

  challenge: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { _id: false });

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true,
    min: 13
  },

  acceptedTerms: {
    type: Boolean,
    required: true
  },

  burnoutHistory: {
    type: [burnoutSchema],
    default: []
  },

  moodHistory: {
    type: [moodSchema],
    default: []
  },

  diaryEntries: {
    type: [diarySchema],
    default: []
  }

}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;