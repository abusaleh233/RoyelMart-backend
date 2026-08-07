import { prisma } from "../../utils/prisma.js";
import { bcryptHelper } from "../../utils/bcrypt.js";
import { jwtHelper } from "../../helpers/jwt.js";
import config from "../../config/index.js";


interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}


interface LoginPayload {
  email: string;
  password: string;
}


const registerUser = async (payload: RegisterPayload) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });


  if (existingUser) {
    throw new Error("User already exists");
  }


  const hashedPassword = await bcryptHelper.hashPassword(
    payload.password
  );


  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      phone: payload.phone,
    },
  });


  const accessToken = jwtHelper.createToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );


  const refreshToken = jwtHelper.createToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );


  return {
    user,
    accessToken,
    refreshToken,
  };
};



const loginUser = async (payload: LoginPayload) => {

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });


  if (!user) {
    throw new Error("User not found");
  }


  const isPasswordMatched =
    await bcryptHelper.comparePassword(
      payload.password,
      user.password
    );


  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }


  const accessToken = jwtHelper.createToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );


  const refreshToken = jwtHelper.createToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );


  return {
    user,
    accessToken,
    refreshToken,
  };
};




const getMyProfile = async(userId:string)=>{

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


    return user;

};




export const authService = {
  registerUser,
  loginUser,
  getMyProfile
};