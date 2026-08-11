import { Request, Response } from "express";
import { ReviewService } from "./review.service.js";



// Create Review

const createReview = async(
req:Request,
res:Response
)=>{


try{


const result = await ReviewService.createReview(

req.user.id,

req.body

);



res.status(201).json({

success:true,

message:"Review created successfully",

data:result

});



}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};






// Get Product Reviews


const getProductReviews = async(

req:Request<{ productId: string }>,

res:Response

)=>{


try{


const result = await ReviewService.getProductReviews(

req.params.productId

);



res.status(200).json({

success:true,

message:"Reviews fetched successfully",

data:result

});



}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};







// Update Review


const updateReview = async(

req:Request<{ reviewId: string }>,

res:Response

)=>{


try{


const result = await ReviewService.updateReview(

req.user.id,

req.params.reviewId,

req.body

);



res.status(200).json({

success:true,

message:"Review updated successfully",

data:result

});



}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};






// Delete Review


const deleteReview = async(

req:Request<{ reviewId: string }>,

res:Response

)=>{


try{


await ReviewService.deleteReview(

req.user.id,

req.params.reviewId

);



res.status(200).json({

success:true,

message:"Review deleted successfully"

});



}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};






export const ReviewController = {

createReview,

getProductReviews,

updateReview,

deleteReview

};