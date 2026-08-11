import Stripe from "stripe";
import {prisma} from "../../utils/prisma.js";
import { ICreatePayment } from "./payment.interface.js";
import config from "../../config/index.js";


const stripe = new Stripe(
  config.stripe.secretKey as string
);



const createCheckoutSession = async (
  userId: string,
  payload: ICreatePayment
) => {


  const { orderId } = payload;



  const order = await prisma.order.findFirst({

    where: {
      id: orderId,
      userId,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },

  });



  if (!order) {
    throw new Error("Order not found");
  }



  if (order.status !== "PENDING") {
    throw new Error("Order already processed");
  }



  const session = await stripe.checkout.sessions.create({

    payment_method_types: [
      "card",
    ],


    mode: "payment",


    customer_email: undefined,


    line_items: order.items.map((item) => ({

      price_data: {

        currency: "usd",

        product_data: {

          name: item.product.name,

          description: item.product.description,

        },


        unit_amount: Math.round(item.price * 100),

      },


      quantity: item.quantity,

    })),


    success_url:
      `${config.app.clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,


    cancel_url:
      `${config.app.clientUrl}/payment/cancel`,


  });



  await prisma.payment.create({

    data: {

      orderId: order.id,

      userId,

      amount: order.totalAmount,

      stripeSessionId: session.id,

    },

  });



  return {
    checkoutUrl: session.url,
  };

};



export const PaymentService = {
  createCheckoutSession,
};