const router = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// sign-up route

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    if (password.length < 9) {
      return res.status(400).json({
        message: "The password length should be more than 9 characters.",
      });
    }

    // check user exist or not
    const existingEmail = await user.findOne({ email: email });
    const existingUsername = await user.findOne({ username: username });
    if (existingEmail || existingUsername) {
      return res
        .status(400)
        .json({ message: "User already exist with this email or username" });
    }
    //  encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new user({ email, username, password: hashedPassword });
    await newUser.save();
    return res.status(200).json({ message: "Account Created Successfully!" });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// sign-in route
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    // check user exist
    const existingUser = await user.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    // Matching Password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.SECRET_KEY
    );
    res.cookie("podcasterusertoken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    return res.status(200).json({
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      message: "Sign-In Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// logout route

router.post("/log-out", async (req, res) => {
  try {
    res.clearCookie("podcasterusertoken", {
      httpOnly: true,
      path:"/",
      domain:"localhost"
    });
    res.json({ message: "User Logged Out" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// check cookie route
router.get("/check-cookie", async (req, res) => {
  try {
    const token = req.cookies.podcasterusertoken;
    if (token) {
      return res.json({ message: true });
    }
    return res.json({ message: false });
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).json({ error });
  }
});

// route to fetch user details
router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const existingUser = await user
      .findOne({ email: email })
      .select("-password");
    res.status(200).json({
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});


module.exports = router;
