import User from "../models/User.js";

import Recommendation from "../models/Recommendation.js";


export const getRecommendations = async (req, res) => {

  try {

    const user = await User.findById(req.user);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }


    // CHECK HISTORY

    if (user.burnoutHistory.length === 0) {

      return res.status(200).json({

        success: true,

        message:
          "No burnout history found",

        recommendations: []

      });

    }


    // GET LATEST RECORD

    const latestBurnout =
      user.burnoutHistory[0];


    let burnoutLevel = "";


    if (latestBurnout.prediction === 0) {
      burnoutLevel = "low";
    }

    else if (latestBurnout.prediction === 1) {
      burnoutLevel = "moderate";
    }

    else {
      burnoutLevel = "high";
    }


    // FETCH MATCHING RECOMMENDATIONS

    const recommendations =
      await Recommendation.find({

        burnoutLevels: burnoutLevel

      }).limit(10);


    res.status(200).json({

      success: true,

      burnoutLevel,

      recommendations

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      message:
        "Failed to fetch recommendations"

    });

  }

};