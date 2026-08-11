import {prisma} from "../../utils/prisma.js";
import { IAddToWishlist } from "./wishlist.interface.js";


const addToWishlist = async (
  userId: string,
  payload: IAddToWishlist
) => {

  const { productId } = payload;


  // Check product exists
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  });


  if (!product) {
    throw new Error("Product not found");
  }


  // Find wishlist
  let wishlist = await prisma.wishlist.findUnique({
    where: {
      userId
    }
  });


  // Create wishlist if not exists
  if (!wishlist) {

    wishlist = await prisma.wishlist.create({
      data: {
        userId
      }
    });

  }


  // Check duplicate product
  const existingItem = await prisma.wishlistItem.findUnique({
    where: {
      wishlistId_productId: {
        wishlistId: wishlist.id,
        productId
      }
    }
  });


  if (existingItem) {
    throw new Error("Product already exists in wishlist");
  }


  const result = await prisma.wishlistItem.create({

    data: {
      wishlistId: wishlist.id,
      productId
    },

    include: {
      product: true
    }

  });


  return result;

};



const getMyWishlist = async (
  userId: string
) => {


  const wishlist = await prisma.wishlist.findUnique({

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


  if (!wishlist) {
    throw new Error("Wishlist is empty");
  }


  return wishlist;

};



const removeFromWishlist = async (
  userId: string,
  productId: string
) => {


  const wishlist = await prisma.wishlist.findUnique({

    where: {
      userId
    }

  });


  if (!wishlist) {
    throw new Error("Wishlist not found");
  }


  const item = await prisma.wishlistItem.findUnique({

    where: {

      wishlistId_productId: {
        wishlistId: wishlist.id,
        productId
      }

    }

  });


  if (!item) {
    throw new Error("Product not found in wishlist");
  }


  await prisma.wishlistItem.delete({

    where: {
      id: item.id
    }

  });


  return null;

};



export const WishlistService = {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist
};