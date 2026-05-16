import mongoose from "mongoose";

const aiConversationSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  prompt: {
    type: String,
    required: true
  },

  response: {
    type: String,
    required: true
  },

  recommendations: {
    type: [String],
    default: []
  }

}, {
  timestamps: true
});

const AIConversation = mongoose.model(
  "AIConversation",
  aiConversationSchema
);

export default AIConversation;