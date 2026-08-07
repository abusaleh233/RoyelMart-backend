import express from "express";
import { CategoryController } from "./category.controller.js";
import auth from "../../middlewares/auth.js";


const router = express.Router();


// Public routes
router.get(
    "/",
    CategoryController.getAllCategories
);


router.get(
    "/:id",
    CategoryController.getSingleCategory
);


// Admin routes
router.post(
    "/",
    auth("ADMIN"),
    CategoryController.createCategory
);


router.patch(
    "/:id",
    auth("ADMIN"),
    CategoryController.updateCategory
);


router.delete(
    "/:id",
    auth("ADMIN"),
    CategoryController.deleteCategory
);


export default router;