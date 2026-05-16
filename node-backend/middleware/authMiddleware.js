import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {

  try {

    let token;

    const authHeader = req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer")
    ) {

      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded.id;

      next();

    }

    else {

      return res.status(401).json({
        success: false,
        message: "Not authorized"
      });

    }

  }

  catch (error) {

    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Token failed"
    });

  }

};

export default protect;