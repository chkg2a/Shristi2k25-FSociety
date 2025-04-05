import User from "../model/user.model.js";


export const check=async(req,res)=>{
    
    try {
        if (!req.userId) {
          return res.status(400).json({ message: "Invalid user" });
        }
        const user = await User.findById(
          req.userId
        ).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, user });
      } catch (error) {
        console.error("Error in checkAuth:", error.message);
        res.status(500).json({ message: "Internal server error" });
      }
}