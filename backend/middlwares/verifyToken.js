import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
  

    if (!decoded.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    const currentDate = new Date();
    const lastReset = new Date(user.lastCreditReset);
    
    if (currentDate.getDate() !== lastReset.getDate() || 
        currentDate.getMonth() !== lastReset.getMonth() ||
        currentDate.getFullYear() !== lastReset.getFullYear()) {
      user.credits = 20; 
      user.lastCreditReset = currentDate;
      await user.save();
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};