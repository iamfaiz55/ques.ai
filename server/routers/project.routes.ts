import express from "express";
import * as projectController from "../controllers/project.controller";


const projectRoutes = express.Router();

projectRoutes
    .post("/", projectController.createProject)
    .get("/", projectController.getAllProjects)

    // .post("/", protectedRoute, categoryController.addCategory)
// 
    // .put("/:id", protectedRoute, categoryController.updateCategory)

    // .delete("/:id", protectedRoute, categoryController.deleteCategory);

export default projectRoutes;
