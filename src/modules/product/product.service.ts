import {prisma} from "../../utils/prisma.js";
import { IProduct } from "./product.interface.js";


const createProduct = async (
  userId: string,
  payload: IProduct
) => {

  const result = await prisma.product.create({

    data: {
      ...payload,
      sellerId: userId
    }

  });

  return result;
};



const getAllProducts = async () => {

  const result = await prisma.product.findMany({

    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }

  });


  return result;
};



const getSingleProduct = async (
  id: string
) => {

  const result = await prisma.product.findUnique({

    where: {
      id
    },

    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }

  });


  if (!result) {
    throw new Error("Product not found");
  }


  return result;
};



const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
) => {


  const result = await prisma.product.update({

    where:{
      id
    },

    data: payload

  });


  return result;

};



const deleteProduct = async (
  id:string
) => {


  const result = await prisma.product.delete({

    where:{
      id
    }

  });


  return result;

};



export const ProductService = {

  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct

};