import {prisma} from "../../utils/prisma.js";
import { IAddToCart } from "./cart.interface.js";


const addToCart = async (
  userId: string,
  payload: IAddToCart
) => {

  const { productId, quantity = 1 } = payload;


  // Check product
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  });


  if (!product) {
    throw new Error("Product not found");
  }


  // Check stock
  if (product.stock < quantity) {
    throw new Error("Insufficient product stock");
  }


  // Find user's cart
  let cart = await prisma.cart.findUnique({
    where: {
      userId
    }
  });


  // Create cart if doesn't exist
  if (!cart) {

    cart = await prisma.cart.create({
      data: {
        userId
      }
    });

  }


  // Check if product already exists in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    }
  });


  if (existingItem) {

    const newQuantity = existingItem.quantity + quantity;


    if (newQuantity > product.stock) {
      throw new Error("Insufficient product stock");
    }


    return await prisma.cartItem.update({

      where: {
        id: existingItem.id
      },

      data: {
        quantity: newQuantity
      },

      include: {
        product: true
      }

    });

  }


  return await prisma.cartItem.create({

    data: {
      cartId: cart.id,
      productId,
      quantity
    },

    include: {
      product: true
    }

  });

};



const getMyCart = async (
  userId: string
) => {

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


  if (!cart) {
    throw new Error("Cart is empty");
  }


  return cart;

};

const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {

  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }


  const cart = await prisma.cart.findUnique({
    where: {
      userId
    }
  });


  if (!cart) {
    throw new Error("Cart not found");
  }


  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    },

    include: {
      product: true
    }
  });


  if (!cartItem) {
    throw new Error("Product not found in cart");
  }


  if (quantity > cartItem.product.stock) {
    throw new Error("Insufficient product stock");
  }


  const result = await prisma.cartItem.update({

    where: {
      id: cartItem.id
    },

    data: {
      quantity
    },

    include: {
      product: true
    }

  });


  return result;
};



const removeFromCart = async (
  userId: string,
  productId: string
) => {

  const cart = await prisma.cart.findUnique({
    where: {
      userId
    }
  });


  if (!cart) {
    throw new Error("Cart not found");
  }


  const cartItem = await prisma.cartItem.findUnique({

    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    }

  });


  if (!cartItem) {
    throw new Error("Product not found in cart");
  }


  await prisma.cartItem.delete({

    where: {
      id: cartItem.id
    }

  });


  return null;
};



const clearCart = async (
  userId: string
) => {

  const cart = await prisma.cart.findUnique({
    where: {
      userId
    }
  });


  if (!cart) {
    throw new Error("Cart not found");
  }


  await prisma.cartItem.deleteMany({

    where: {
      cartId: cart.id
    }

  });


  return null;
};



export const CartService = {
   addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart,
  clearCart
};