import mongoose, {  Schema } from "mongoose";

export interface IProject extends Document {
    _id?: string;
    name: string;
    
}


const projectSchema = new Schema<IProject>({
    name: { type: String },
 
}, { timestamps: true });


  

export const Project = mongoose.model<IProject>("project", projectSchema);


