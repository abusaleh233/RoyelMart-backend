import { Request, Response } from "express";
import { UserService } from "./user.service.js";



// Get Profile


const getMyProfile = async(

req:Request,

res:Response

)=>{


try{


const result = await UserService.getMyProfile(

req.user.id

);



res.status(200).json({

success:true,

message:"Profile fetched successfully",

data:result

});



}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};





// Update Profile


const updateProfile = async(

req:Request,

res:Response

)=>{


try{


const result = await UserService.updateProfile(

req.user.id,

req.body

);



res.status(200).json({

success:true,

message:"Profile updated successfully",

data:result

});



}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};







// Delete Account


const deleteMyAccount = async(

req:Request,

res:Response

)=>{


try{


const result = await UserService.deleteMyAccount(

req.user.id

);



res.status(200).json({

success:true,

message:"Account deleted successfully",

data:result

});



}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};






export const UserController = {


getMyProfile,

updateProfile,

deleteMyAccount


};