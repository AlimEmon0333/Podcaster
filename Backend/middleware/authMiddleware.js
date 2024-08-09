const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.podcasterusertoken;  // Correct token name
  console.log("Token:", token);
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("Decoded:", decoded);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "No Token Provided" });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
