import jwt from  "jsonwebtoken";
export const generateTokenAndSetCookie=(res,userId)=>{
    try {
        const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
}