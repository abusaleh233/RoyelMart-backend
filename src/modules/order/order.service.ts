import {prisma} from "../../utils/prisma.js";
import { ICreateOrder } from "./order.interface.js";


const createOrder = async (
  userId: string,
  payload: ICreateOrder
) => {

  const { couponId } = payload;


  // Find user cart
  const cart = await prisma.cart.findUnique({

    where: {
      userId
    },

    include: {
      items: {
        include: {
          product: true
        }
      }
    }

  });


  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }



  let totalAmount = 0;



  for (const item of cart.items) {

    if (item.quantity > item.product.stock) {
      throw new Error(
        `${item.product.name} stock is not available`
      );
    }


    totalAmount += item.product.price * item.quantity;

  }



  // Create order transaction
  const order = await prisma.$transaction(async (tx) => {


    // Create order
    const newOrder = await tx.order.create({

      data: {

        userId,

        totalAmount,

        couponId,

        items: {

          create: cart.items.map((item) => ({

            productId: item.productId,

            quantity: item.quantity,

            price: item.product.price

          }))

        }

      },

      include: {

        items: true

      }

    });



    // Update stock
    for (const item of cart.items) {

      await tx.product.update({

        where: {
          id: item.productId
        },

        data: {

          stock: {
            decrement: item.quantity
          }

        }

      });

    }



    // Clear cart
    await tx.cartItem.deleteMany({

      where: {

        cartId: cart.id

      }

    });



    return newOrder;


  });



  return order;

};

const getMyOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
      coupon: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};


const getSingleOrder = async (
  userId: string,
  orderId: string
) => {
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
      payment: true,
      coupon: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

const getAllOrders = async () => {

  const orders = await prisma.order.findMany({

    include: {

      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      items: {
        include: {
          product: true,
        },
      },

      payment: true,
      coupon: true,

    },

    orderBy: {
      createdAt: "desc",
    },

  });


  return orders;

};



const updateOrderStatus = async (
  orderId: string,
  status: any
) => {


  const order = await prisma.order.findUnique({

    where: {
      id: orderId,
    },

  });


  if (!order) {
    throw new Error("Order not found");
  }



  const updatedOrder = await prisma.order.update({

    where: {
      id: orderId,
    },


    data: {
      status,
    },


  });


  return updatedOrder;

};





export const OrderService = {
  createOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
};