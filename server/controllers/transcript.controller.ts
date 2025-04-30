

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
// import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import axios from "axios";
import { User } from "../models/User";
// import { generateToken } from "../utils/generateToken";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/generateToken";
import { Transcript } from "../models/Transcript";
import { Types } from "mongoose";

dotenv.config();

interface TranscriptItem {
  text: string;
  [key: string]: any; // in case there are other fields like start, duration
}

interface TranscriptResponse {
  transcript: TranscriptItem[];
}
// Helper to extract videoId from a YouTube URL
const extractVideoId = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
  
      if (hostname === 'youtu.be') {
        return parsedUrl.pathname.substring(1);
      } else if (hostname.includes('youtube.com')) {
        return parsedUrl.searchParams.get('v');
      }
  
      return null;
    } catch (error) {
      return null;
    }
  };
  
export const fetchTranscriptFromYoutube = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { youtubeUrl, projectId, name } = req.body;
    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) { 
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
  
    const options = {
      method: 'GET',
      url: 'https://youtube-transcript3.p.rapidapi.com/api/transcript',
      params: { videoId ,lang: 'en'},
      headers: {
        'x-rapidapi-key': '71c2ea8ae2msh491b3bb37857407p1ab5f7jsn2450bf15b020',
        'x-rapidapi-host': 'youtube-transcript3.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request<TranscriptResponse>(options);
      // console.log("response :", response);
      
      const transcriptArray = response.data.transcript;
      const fullText = transcriptArray.map((item) => item.text).join(' ');
  
      if(!fullText){
         return res.status(501).json({message:"Something Wents Wrong With FUll TEXT"})
      }
// console.log("projectId", projectId);
const userId  = req.user as {userId:Types.ObjectId,iat:number,exp:number}

      await Transcript.create({videoId,project:projectId, transcript:fullText,  youtubeUrl, name, user:userId.userId })

      return res.status(200).json({
       message:"Transcript Created Successfully"
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch transcript' });
    }
  });
  
  

export const getAllTranscriptById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  
  const data = await Transcript.find({project:id})
 
  res.status(201).json({
    message: "All Transcripts Fetch successfully",
    result:data
  });
});
export const getAllTranscripts  = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const userId  = req.user as {userId:string,iat:number,exp:number}

  const data = await Transcript.find({user:userId.userId})
//  console.log("dataaa", data);
 
  res.status(201).json({
    message: "All Transcripts Fetch successfully",
    result:data
  });
});


  
export const getTranscriptById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
  
 
    const data = await Transcript.findById(id)
      res.status(201).json({
        message: "Transcript Fetch successfully",
        result:data
    });
});


