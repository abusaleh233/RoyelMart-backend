import { Request, Response } from "express";
import { CartService } from "./cart.service.js";


type ProductParams = {
  productId: string;
};


const addToCart = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user.id;

    const result = await CartService.addToCart(
      userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: result
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



const getMyCart = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user.id;

    const result = await CartService.getMyCart(userId);

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: result
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const updateCartItem = async (
    
  req: Request<ProductParams>,
  res: Response
) => {

  try {

    const result = await CartService.updateCartItem(
      req.user.id,
      req.params.productId,
      Number(req.body.quantity)
    );

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: result
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



const removeFromCart = async (
  req: Request<ProductParams>,
  res: Response
) => {

  try {

    await CartService.removeFromCart(
      req.user.id,
      req.params.productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully"
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



const clearCart = async (
  req: Request,
  res: Response
) => {

  try {

    await CartService.clearCart(req.user.id);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully"
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};



export const CartController = {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart,
  clearCart
};