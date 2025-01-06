import dotenv from "dotenv";
dotenv.config();

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  STRIPE_KEY,
  MAIL,
  MAILPASS,
  FRONTEND_BASE_URL,
  SERVER_URL,
} = process.env;

const config = {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  STRIPE_KEY,
  MAIL,
  MAILPASS,
  FRONTEND_BASE_URL,
  SERVER_URL,
};

export default config;
