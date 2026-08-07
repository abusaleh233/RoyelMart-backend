import { Request, Response } from "express";
import { authService } from "./auth.service.js";



const register = async (
    req: Request,
    res: Response
) => {
    try {

        const result = await authService.registerUser(
            req.body
        );


        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });


    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};



const login = async (
    req: Request,
    res: Response
) => {

    try {

        const result = await authService.loginUser(
            req.body
        );


        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });


    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};

const getMyProfile = async (
    req: Request,
    res: Response
) => {

    const user = await authService.getMyProfile(
        req.user.id
    );


    res.status(200).json({

        success: true,
        message: "Profile fetched successfully",
        data: user

    });

};



export const authController = {
    register,
    login,
    getMyProfile,
};