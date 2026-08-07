import { Request, Response } from "express";
import { CategoryService } from "./category.service.js";


const createCategory = async (
    req: Request,
    res: Response
) => {

    const result = await CategoryService.createCategory(
        req.body
    );


    res.status(201).json({

        success: true,
        message: "Category created successfully",
        data: result

    });

};



const getAllCategories = async (
    req: Request,
    res: Response
) => {

    const result = await CategoryService.getAllCategories();


    res.status(200).json({

        success: true,
        message: "Categories fetched successfully",
        data: result

    });

};



const getSingleCategory = async (
    req: Request,
    res: Response
) => {

    const result = await CategoryService.getSingleCategory(
        req.params.id as string
    );


    res.status(200).json({

        success: true,
        message: "Category fetched successfully",
        data: result

    });

};



const updateCategory = async (
    req: Request,
    res: Response
) => {

    const result = await CategoryService.updateCategory(
        req.params.id as string,
        req.body 
    );


    res.status(200).json({

        success:true,
        message:"Category updated successfully",
        data:result

    });

};



const deleteCategory = async (
    req: Request,
    res: Response
) => {

    const result = await CategoryService.deleteCategory(
        req.params.id as string
    );


    res.status(200).json({

        success:true,
        message:"Category deleted successfully",
        data:result

    });

};



export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
};