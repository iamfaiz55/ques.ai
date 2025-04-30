import mongoose, {  Schema, Types } from "mongoose";

export interface IProject extends Document {
    _id?: string;
    name: string;
    user:Types.ObjectId
}


const projectSchema = new Schema<IProject>({
    name: { type: String },
    user: { type: Schema.ObjectId, ref:"users" , required:true},
 
}, { timestamps: true });


  

export const Project = mongoose.model<IProject>("project", projectSchema);


