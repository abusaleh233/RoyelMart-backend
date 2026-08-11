import {prisma }from "../../utils/prisma.js";
import { IUserUpdate } from "./user.interface.js";


// Get my profile

const getMyProfile = async (
  userId: string
) => {


const user = await prisma.user.findUnique({

where:{
 id:userId
},


select:{
 id:true,
 name:true,
 email:true,
 phone:true,
 image:true,
 role:true
}


});


if(!user){

throw new Error("User not found");

}


return user;


};




// Update profile


const updateProfile = async(

userId:string,

payload:IUserUpdate

)=>{


const user = await prisma.user.findUnique({

where:{
 id:userId
}

});


if(!user){

throw new Error("User not found");

}



const updatedUser = await prisma.user.update({

where:{
 id:userId
},


data:payload,


select:{
 id:true,
 name:true,
 email:true,
 phone:true,
 image:true,
 role:true
}


});


return updatedUser;


};





// Delete own account


const deleteMyAccount = async(

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




const deletedUser = await prisma.user.update({

where:{
 id:userId
},


data:{
 isDeleted:true
},


select:{
 id:true,
 name:true,
 email:true,
 isDeleted:true
}


});



return deletedUser;


};






export const UserService = {


getMyProfile,

updateProfile,

deleteMyAccount


};