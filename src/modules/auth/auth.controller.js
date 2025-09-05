import admin from "../../config/firebase-admin.js";
import { createJWT } from "../../utils/jwt.js";
import { errorResponse, successResponse } from "../../utils/response.js";
import User from "../user/user.model.js";
import authService from "./auth.service.js";

class AuthController {
  async register(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      errorResponse(res, "Please enter complete information!", 400);
    }
    try {
      console.log(req.body);
      const user = await authService.register(req.body);
      return successResponse(res, user, "Register Account Successfully!", 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        errorResponse(res, "Please enter complete information!", 400);
      }
      const data = await authService.login(req.body);
      res.cookie("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return successResponse(res, data.user, "Login Successfully!", 200);
    } catch (error) {
      next(error);
    }
  }

  async googleLogin(req, res, next) {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        errorResponse(res, "idToken is required", 400);
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log({ decodedToken });
      const { uid, email, name, picture } = decodedToken;

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          uid,
          email,
          name,
          avatar: picture,
          provider: "google",
        });
      }

      const token = createJWT(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      successResponse(res, user, "Google login successful", 200);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return successResponse(res, null, "Logout successful");
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
