import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";



// import authRouter from "./routes/auth.routes";
import passport from "./services/passport"
// import userRouter from "./routes/user.routes";
import { protectedRoute } from "./utils/protected";
import transcriptRoutes from "./routers/transscription.routes";
import projectRoutes from "./routers/project.routes";
import authRoutes from "./routers/auth.routes";
// import transactionRoutes from "./routes/transaction.routes";
// import subscriptionRouter from "./routes/subscription.routes";
// import categoryRoutes from "./routes/category.routes";

dotenv.config()
const app = express()
app.use(express.json())



app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(passport.initialize())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/transcript",protectedRoute, transcriptRoutes)
app.use("/api/v1/project", protectedRoute,projectRoutes)




app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Resource not found", });
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Something went wrong ", error: err.message });
})

mongoose.connect(process.env.MONGO_URL || "").catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});


const PORT = process.env.PORT || 5000
mongoose.connection.once("open", async () => {
    console.log("MongoDb Connected", process.env.MONGO_URL)
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
});

