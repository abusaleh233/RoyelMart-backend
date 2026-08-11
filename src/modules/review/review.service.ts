import {prisma} from "../../utils/prisma.js";
import {
  ICreateReview,
  IUpdateReview
} from "./review.interface.js";



// Create Review

const createReview = async(
 userId:string,
 payload:ICreateReview
)=>{


const product = await prisma.product.findUnique({

where:{
 id:payload.productId
}

});


if(!product){

throw new Error("Product not found");

}



// Check already review

const existingReview = await prisma.review.findFirst({

where:{
 userId,
 productId:payload.productId
}

});


if(existingReview){

throw new Error(
"You already reviewed this product"
);

}



const review = await prisma.review.create({

data:{

 userId,

 productId:payload.productId,

 rating:payload.rating,

 comment:payload.comment

},


include:{

user:{
select:{
 id:true,
 name:true,
 image:true
}
}

}

});


return review;


};






// Get Product Reviews


const getProductReviews = async(
productId:string
)=>{


const reviews = await prisma.review.findMany({

where:{
 productId
},


include:{

user:{
select:{
 id:true,
 name:true,
 image:true
}
}

},


orderBy:{
 createdAt:"desc"
}


});


return reviews;


};






// Update Review


const updateReview = async(

userId:string,

reviewId:string,

payload:IUpdateReview

)=>{


const review = await prisma.review.findFirst({

where:{

id:reviewId,

userId

}

});



if(!review){

throw new Error(
"Review not found"
);

}



const updatedReview = await prisma.review.update({

where:{
 id:reviewId
},


data:payload


});


return updatedReview;


};







// Delete Review


const deleteReview = async(

userId:string,

reviewId:string

)=>{


const review = await prisma.review.findFirst({

where:{

id:reviewId,

userId

}

});



if(!review){

throw new Error(
"Review not found"
);

}



await prisma.review.delete({

where:{
 id:reviewId
}

});


return null;


};






export const ReviewService = {

createReview,

getProductReviews,

updateReview,

deleteReview

};