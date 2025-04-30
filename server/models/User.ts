import mongoose, {  Schema } from "mongoose";

export interface IUser extends Document {
    _id?: string;
    name: string;
     email:string;
    profile: string
    sessionToken: string | null
}


const userSchema = new Schema<IUser>({
    name: { type: String },
    profile: { type: String},
    email: { type: String, required: true},    
    sessionToken: { type: String, default: null },
}, { timestamps: true });


  

export const User = mongoose.model<IUser>("Users", userSchema);


