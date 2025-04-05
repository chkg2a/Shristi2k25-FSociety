import jwt from "jsonwebtoken";
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

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};