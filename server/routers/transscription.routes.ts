import express from "express";
import * as categoryController from "../controllers/transcript.controller";


const transcriptRoutes = express.Router();

transcriptRoutes
    .post("/", categoryController.fetchTranscriptFromYoutube)
.get("/all/:id", categoryController.getAllTranscriptById)
.get("/projects-all", categoryController.getAllTranscripts)
.get("/:id", categoryController.getTranscriptById)
    // .post("/", protectedRoute, categoryController.addCategory)
// 
    // .put("/:id", protectedRoute, categoryController.updateCategory)

    // .delete("/:id", protectedRoute, categoryController.deleteCategory);

export default transcriptRoutes;
