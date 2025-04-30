import { Schema, Document, model, Types } from "mongoose";


export interface ITranscript extends Document {
  videoId: string;
  name: string;
  youtubeUrl: string;
  project: Types.ObjectId;
  transcript: string
  user:Types.ObjectId
  

}


const TranscriptSchema = new Schema<ITranscript>(
  {
    videoId: { type: String, required: true, unique: true },
    youtubeUrl: { type: String },
    name: { type: String },
    project: { type: Schema.ObjectId,ref:"project", required: true },
    transcript:{type:String, required:true},
        user: { type: Schema.ObjectId, ref:"users" , required:true},
    
  },
  { timestamps: true }
);

export const Transcript = model<ITranscript>("Transcript", TranscriptSchema);
