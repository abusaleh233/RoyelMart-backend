import { Request, Response } from "express";
import { OrderService } from "./order.service.js";


const createOrder = async (
  req: Request,
  res: Response
) => {

  try {

    const result = await OrderService.createOrder(
      req.user.id,
      req.body
    );


    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result
    });


  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const getMyOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await OrderService.getMyOrders(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const getSingleOrder = async (
  req: Request<{ orderId: string }>,
  res: Response
) => {
  try {
    const result = await OrderService.getSingleOrder(
      req.user.id,
      req.params.orderId
    );

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (
  req: Request,
  res: Response
) => {

  try {

    const result = await OrderService.getAllOrders();


    res.status(200).json({

      success: true,

      message: "All orders fetched successfully",

      data: result,

    });


  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};



const updateOrderStatus = async (
  req: Request<{orderId:string}>,
  res: Response
) => {

  try {


    const result = await OrderService.updateOrderStatus(

      req.params.orderId,

      req.body.status

    );


    res.status(200).json({

      success: true,

      message: "Order status updated successfully",

      data: result,

    });


  } catch (error:any) {

    res.status(400).json({

      success:false,

      message:error.message,

    });

  }

};



export const OrderController = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
};