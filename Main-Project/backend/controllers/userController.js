const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userModel");
const propertySchema = require("../schemas/propertyModel");
const bookingSchema = require("../schemas/bookingModel");

//////////////////// REGISTER ////////////////////
const registerController = async (req, res) => {
  try {
    const existsUser = await userSchema.findOne({ email: req.body.email });

    if (existsUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    let granted = req.body.type === "Owner" ? "ungranted" : undefined;

    const newUser = new userSchema({
      ...req.body,
      granted,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Register Success",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//////////////////// LOGIN ////////////////////
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,   // ✅ FIXED HERE
      { expiresIn: "1d" }
    );

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//////////////////// FORGOT PASSWORD ////////////////////
const forgotPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//////////////////// AUTH ////////////////////
const authController = async (req, res) => {
  try {
    const user = await userSchema.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Auth error",
    });
  }
};

//////////////////// GET ALL PROPERTIES ////////////////////
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await propertySchema.find({});

    return res.status(200).json({
      success: true,
      data: allProperties,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//////////////////// BOOKING ////////////////////
const bookingHandleController = async (req, res) => {
  try {
    const { propertyid } = req.params;
    const { userDetails, status, userId, ownerId } = req.body;

    const booking = new bookingSchema({
      propertyId: propertyid,
      userID: userId,
      ownerID: ownerId,
      userName: userDetails.fullName,
      phone: userDetails.phone,
      bookingStatus: status,
    });

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking status updated",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error handling booking",
    });
  }
};

//////////////////// GET BOOKINGS ////////////////////
const getAllBookingsController = async (req, res) => {
  try {
    const { userId } = req.body;

    const bookings = await bookingSchema.find({
      userID: userId,
    });

    return res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  authController,
  getAllPropertiesController,
  bookingHandleController,
  getAllBookingsController,
};
