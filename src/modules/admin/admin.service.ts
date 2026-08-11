import {prisma} from "../../utils/prisma.js";
import {
  IUpdateUserRole,
  IUpdateOrderStatus
} from "./admin.interface.js";


// Dashboard

const getDashboardStats = async () => {

  const totalUsers = await prisma.user.count();

  const totalProducts = await prisma.product.count();

  const totalOrders = await prisma.order.count();


  const orders = await prisma.order.findMany({
    where:{
      status:"DELIVERED"
    },
    select:{
      totalAmount:true
    }
  });


  const totalRevenue = orders.reduce(
    (sum, order)=> sum + order.totalAmount,
    0
  );


  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue
  };

};



// Get all users

const getAllUsers = async()=>{

 return await prisma.user.findMany({

  select:{
    id:true,
    name:true,
    email:true,
    phone:true,
    role:true,
    image:true,
    createdAt:true
  },

  orderBy:{
    createdAt:"desc"
  }

 });

};



// Update user role

const updateUserRole = async(
 userId:string,
 payload:IUpdateUserRole
)=>{


const user = await prisma.user.findUnique({
 where:{
  id:userId
 }
});


if(!user){
 throw new Error("User not found");
}



return await prisma.user.update({

 where:{
  id:userId
 },


 data:{
  role:payload.role
 },


 select:{
  id:true,
  name:true,
  email:true,
  role:true
 }

});


};




// Delete user

const deleteUser = async(
 userId:string
)=>{


const user = await prisma.user.findUnique({
 where:{
  id:userId
 }
});


if(!user){
 throw new Error("User not found");
}



return await prisma.user.update({

where:{
 id:userId
},

data:{
 isDeleted:true
}

});


};




// Get all orders

const getAllOrders = async()=>{


return await prisma.order.findMany({

include:{

 user:{
  select:{
   id:true,
   name:true,
   email:true
  }
 },


 items:{
  include:{
   product:true
  }
 },


 payment:true

},


orderBy:{
 createdAt:"desc"
}


});


};




// Update order status


const updateOrderStatus = async(

 orderId:string,

 payload:IUpdateOrderStatus

)=>{


const order = await prisma.order.findUnique({

where:{
 id:orderId
}

});


if(!order){

 throw new Error("Order not found");

}



return await prisma.order.update({

where:{
 id:orderId
},


data:{
 status:payload.status
}


});


};



export const AdminService = {

getDashboardStats,

getAllUsers,

updateUserRole,

deleteUser,

getAllOrders,

updateOrderStatus

};