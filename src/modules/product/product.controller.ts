import { Request, Response } from "express";
import { ProductService } from "./product.service.js";


const createProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user.id;

    const result = await ProductService.createProduct(
      userId,
      req.body
    );


    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result
    });


  } catch(error:any){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }

};



const getAllProducts = async(
 req:Request,
 res:Response
)=>{

 try{

  const result = await ProductService.getAllProducts();


  res.status(200).json({
    success:true,
    message:"Products fetched successfully",
    data:result
  });


 }catch(error:any){

  res.status(400).json({
    success:false,
    message:error.message
  });

 }

};



const getSingleProduct = async(
 req:Request,
 res:Response
)=>{

 try{

  const result = await ProductService.getSingleProduct(
    req.params.id as string
  );


  res.status(200).json({
    success:true,
    message:"Product fetched successfully",
    data:result
  });


 }catch(error:any){

  res.status(400).json({
    success:false,
    message:error.message
  });

 }

};



const updateProduct = async(
 req:Request,
 res:Response
)=>{

 try{

  const result = await ProductService.updateProduct(
    req.params.id as string,
    req.body
  );


  res.status(200).json({
    success:true,
    message:"Product updated successfully",
    data:result
  });


 }catch(error:any){

  res.status(400).json({
    success:false,
    message:error.message
  });

 }

};



const deleteProduct = async(
 req:Request,
 res:Response
)=>{

 try{

  await ProductService.deleteProduct(
    req.params.id as string
  );


  res.status(200).json({
    success:true,
    message:"Product deleted successfully"
  });


 }catch (error: any) {
  console.error(error);

  res.status(400).json({
    success: false,
    message: error.message,
    error: error,
  });
}

};



export const ProductController = {
 createProduct,
 getAllProducts,
 getSingleProduct,
 updateProduct,
 deleteProduct
};