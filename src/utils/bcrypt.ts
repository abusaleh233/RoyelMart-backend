import bcrypt from "bcrypt";
import config from "../config/index.js";


const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(
    password,
    config.bcrypt.saltRounds
  );
};


const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(
    plainPassword,
    hashedPassword
  );
};


export const bcryptHelper = {
  hashPassword,
  comparePassword,
};