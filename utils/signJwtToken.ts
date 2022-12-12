import jwt from "jsonwebtoken"

export const signToken = (data:any) => {
  return jwt.sign(data, process.env.JWT_SECRET||'');
};