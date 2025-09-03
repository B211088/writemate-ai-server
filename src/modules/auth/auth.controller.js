import { successResponse } from "../../utils/response.js";
import authService from "./auth.service.js";

class AuthControler {
  async register(req, res, next) {
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

export default new AuthControler();
