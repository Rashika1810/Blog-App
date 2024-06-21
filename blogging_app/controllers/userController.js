// const userModel = require("../models/userModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.registerController = async (req, resp) => {
  try {
    const { username, email, password } = req.body;

    //user validation
    if (!username || !email || !password) {
      return resp.status(400).send({
        success: false,
        message: "All fields are required.",
      });
    }
    // check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return resp.status(401).send({
        success: false,
        message: "User already Exists",
      });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //saving new user to the database
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return resp.status(201).send({
      success: true,
      message: "Registration Successfull",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      success: false,
      message: "Error is user registration",
      error,
    });
  }
};
exports.loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return resp.status(401).send({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return resp.status(200).send({
        success: false,
        message: "User is not registered",
      });
    }
    //password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return resp.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return resp.status(200).send({
      success: true,
      messgae: "Login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      success: false,
      message: "Error is user login",
      error,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User data",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting user data",
      error,
    });
  }
};
