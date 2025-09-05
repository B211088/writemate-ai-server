import jwt from "jsonwebtoken";

export const createJWT = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
