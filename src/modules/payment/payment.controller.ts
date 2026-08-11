import { Request, Response } from "express";
import { PaymentService } from "./payment.service.js";


const createCheckoutSession = async (
  req: Request,
  res: Response
) => {

  try {

    const result = await PaymentService.createCheckoutSession(
      req.user.id,
      req.body
    );


    res.status(200).json({

      success: true,

      message: "Checkout session created successfully",

      data: result,

    });


  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }

};



export const PaymentController = {
  createCheckoutSession,
};