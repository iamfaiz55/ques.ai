
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
// import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { Project } from "../models/Project";
import { Types } from "mongoose";


export const createProject = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { name } = req.body;
  
    const userId  = req.user as {userId:Types.ObjectId,iat:number,exp:number}
    // console.log("userId", userId?.userId);
  const data = await Project.create({name, user:userId?.userId})
    res.status(201).json({
      message: "Project Create successfully",
      result:data
    });
  });
export const getAllProjects = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId  = req.user as {userId:string,iat:number,exp:number}


  const data = await Project.find({user:userId?.userId})
    res.status(201).json({
      message: "Projects Fetch successfully",
      result:data
    });
  });
