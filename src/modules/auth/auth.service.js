import { throwError } from "../../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

class AuthService {
  async register({ name, email, password }) {
    const existing = await User.findOne({ email });
    if (existing) throwError("Email already registered!", 400);

    const user = await User.create({
      name,
      email,
      passwordHash: password,
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throwError("Invalid email!", 401);
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) throwError("Invalid password!", 401);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

export default new AuthService();
