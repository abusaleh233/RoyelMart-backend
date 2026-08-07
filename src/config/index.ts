import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    port: process.env.PORT || 5000,
    appUrl: process.env.APP_URL,
    clientUrl: process.env.CLIENT_URL,
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};