

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { User } from "../models/User";
// import { generateToken } from "../utils/generateToken";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/generateToken";

dotenv.config();





export const register = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists. Please log in." });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = await User.create({ name, email, password: hashedPassword });
  
    res.status(201).json({
      message: "User registered successfully",
    });
  });




export const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: "Username (email or mobile) is required" });
    }


    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({ message: "User not found with provided email " });
    }

    const token = generateToken({ userId: user._id, name: user.name })

    res.status(200).json({
        message: "Login successfully",
        result: {name:user.name, email:user.email, _id:user._id, token}
    });
});



export const signOut = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ message: "Logged out successfully" });
});


