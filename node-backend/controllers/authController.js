import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


// ================= REGISTER =================

export const registerUser = async (req, res) => {

  try {

    const {
      username,
      password,
      age,
      acceptedTerms
    } = req.body;


    // VALIDATIONS

    if (!username || !password || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (age < 13) {
      return res.status(400).json({
        success: false,
        message: "Age must be 13 or above"
      });
    }

    if (!acceptedTerms) {
      return res.status(400).json({
        success: false,
        message: "Please accept terms and conditions"
      });
    }


    // CHECK EXISTING USER

    const existingUser = await User.findOne({
      username: username.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }


    // HASH PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);


    // CREATE USER

    const user = await User.create({

      username,

      password: hashedPassword,

      age,

      acceptedTerms

    });


    // GENERATE TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    res.status(201).json({

      success: true,

      token,

      user: {
        id: user._id,
        username: user.username,
        age: user.age
      }

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration failed"
    });

  }

};



// ================= LOGIN =================

export const loginUser = async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body;


    // VALIDATIONS

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }


    // FIND USER

    const user = await User.findOne({
      username: username.toLowerCase()
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }


    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }


    // GENERATE TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    res.status(200).json({

      success: true,

      token,

      user: {
        id: user._id,
        username: user.username,
        age: user.age
      }

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });

  }

};

export const getCurrentUser = async (req, res) => {

  try {

    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });

  }

};