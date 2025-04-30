

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


export const googleLogin = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { idToken } = req.body
// console.log("idtoken", idToken);

    if (!idToken) {
        return res.status(400).json({ message: 'Missing Google ID token' });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
// console.log(" process.env.GOOGLE_CLIENT_ID :", process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
// console.log("ticket", ticket);

    const payload = ticket.getPayload();
    if (!payload) {
        return res.status(401).json({ message: 'Invalid token payload' });
    }
    
    const { name, email, picture } = payload
    const user = await User.findOne({ email }).lean()
    // console.log("user", user);

    if (user) {
        const token = generateToken({ userId: user._id, name: user.name })

      
        res.status(200).json({ message: "Sign In Successfully", result:{
            _id: user._id,
            name: user.name,
            mobile: user.email,
            // email: user.email,
            // role: user.role,
            token,
        }  })

    } else {
        // console.log("newUser creating");
        const newUser = await User.create({
            name,
            email,
            profile: picture,
       
        })
        console.log("newUser", newUser);
        const token = generateToken({ userId: newUser._id, name:newUser.name });

     

        return res.status(200).json({ message: "Sign Up Successfully", result:{
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token,
        } })
    }

})
