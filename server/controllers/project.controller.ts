
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
// import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { Project } from "../models/Project";


export const createProject = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { name } = req.body;
  
 
  const data = await Project.create({name})
    res.status(201).json({
      message: "Project Create successfully",
      result:data
    });
  });
export const getAllProjects = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const data = await Project.find()
    res.status(201).json({
      message: "Projects Fetch successfully",
      result:data
    });
  });
