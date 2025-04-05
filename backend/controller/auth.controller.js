import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


export const signup=async(req,res)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })}
    try {
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword
        });
        try {
            generateTokenAndSetCookie(res,newUser._id);
            res.status(201).json({
                success:true,
                message:"User created successfully",
                user:newUser,
            });
        } catch (tokenError) {
            res.status(500).json({
                success:false,
                message:"Error generating authentication token"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })}
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        try {
            generateTokenAndSetCookie(res,user._id);
            res.status(200).json({
                success:true,
                message:"User logged in successfully",
                user,
            });
        } catch (tokenError) {
            res.status(500).json({
                success:false,
                message:"Error generating authentication token"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");

        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while logging out",
        });
    }
};



    
