import { Request, Response } from "express";
import { AdminService } from "./admin.service.js";



// Dashboard

const getDashboardStats = async(
req:Request,
res:Response
)=>{

try{


const result =
await AdminService.getDashboardStats();



res.status(200).json({

success:true,

message:"Dashboard data fetched successfully",

data:result

});


}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}

};




// Users


const getAllUsers = async(
req:Request,
res:Response
)=>{

try{


const result =
await AdminService.getAllUsers();


res.status(200).json({

success:true,

message:"Users fetched successfully",

data:result

});


}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}

};





const updateUserRole = async(
req:Request<{ userId: string }>,
res:Response
)=>{

try{


const result =
await AdminService.updateUserRole(

req.params.userId,

req.body

);



res.status(200).json({

success:true,

message:"User role updated successfully",

data:result

});


}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}

};





const deleteUser = async(
req:Request<{ userId: string }>,
res:Response
)=>{

try{


const result =
await AdminService.deleteUser(

req.params.userId

);



res.status(200).json({

success:true,

message:"User deleted successfully",

data:result

});


}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}

};






// Orders


const getAllOrders = async(
req:Request,
res:Response
)=>{

try{


const result =
await AdminService.getAllOrders();



res.status(200).json({

success:true,

message:"Orders fetched successfully",

data:result

});


}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}

};






const updateOrderStatus = async(
req:Request<{ orderId: string }>,
res:Response
)=>{

try{


const result =
await AdminService.updateOrderStatus(

req.params.orderId,

req.body

);



res.status(200).json({

success:true,

message:"Order status updated successfully",

data:result

});


}catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}

};





export const AdminController = {


getDashboardStats,

getAllUsers,

updateUserRole,

deleteUser,

getAllOrders,

updateOrderStatus


};