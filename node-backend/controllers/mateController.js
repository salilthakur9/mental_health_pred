import { GoogleGenAI } from "@google/genai";
import User from "../models/User.js";

import Recommendation from "../models/Recommendation.js";

import AIConversation from "../models/AIConversation.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatWithMate = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // GET USER

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // GET LATEST BURNOUT

    const latestBurnout = user.burnoutHistory[0];

    let burnoutLevel = "unknown";

    if (latestBurnout) {
      if (latestBurnout.prediction === 0) {
        burnoutLevel = "low";
      } else if (latestBurnout.prediction === 1) {
        burnoutLevel = "moderate";
      } else {
        burnoutLevel = "high";
      }
    }

    // FETCH RECOMMENDATIONS

    const recommendations = await Recommendation.find({
      burnoutLevels: burnoutLevel,
    }).limit(3);

    const recommendationTitles = recommendations.map((item) => item.title);

    // SYSTEM PROMPT

    const systemPrompt = `

You are an AI wellness companion called BurnoutMate.

The user currently has:
- Burnout level: ${burnoutLevel}

Your response style:
- emotionally supportive
- concise
- practical
- calm and friendly
- maximum 200 words
- avoid sounding robotic
- avoid extremely long answers

Response structure:
1. Emotional understanding
2. Practical suggestions
3. Encouraging ending

Avoid medical diagnosis.

`;

    // AI RESPONSE

    const prompt = `

You are BurnoutMate, an emotionally supportive AI wellness companion.

User burnout level: ${burnoutLevel}

User message:
"${message}"

Your response style:
- supportive
- calm
- practical
- concise
- human-like
- maximum 150 words

Structure:
1. Emotional understanding
2. Practical suggestions
3. Encouraging ending

Avoid medical diagnosis.

`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,
    });

    const aiResponse = response.text;

    // SAVE CONVERSATION

    await AIConversation.create({
      user: req.user,

      prompt: message,

      response: aiResponse,

      recommendations: recommendationTitles,
    });

    res.status(200).json({
      success: true,

      response: aiResponse,

      recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: "AI Mate failed",
    });
  }
};
