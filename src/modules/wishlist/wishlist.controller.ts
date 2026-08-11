import { Request, Response } from "express";
import { WishlistService } from "./wishlist.service.js";

type ProductParams = {
  productId: string;
};


const addToWishlist = async (
  req: Request,
  res: Response
) => {

  try {

    const result = await WishlistService.addToWishlist(
      req.user.id,
      req.body
    );


    res.status(201).json({
      success: true,
      message: "Product added to wishlist successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



const getMyWishlist = async (
  req: Request,
  res: Response
) => {

  try {

    const result = await WishlistService.getMyWishlist(
      req.user.id
    );


    res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



const removeFromWishlist = async (
  req: Request<ProductParams>,
  res: Response
) => {

  try {

    await WishlistService.removeFromWishlist(
      req.user.id,
      req.params.productId
    );


    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully"
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



export const WishlistController = {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist
};