import { Router } from "express";
import AuthController from "./auth.controller.js";

const router = Router();

router.post("/register", (req, res, next) =>
  AuthController.register(req, res, next)
);
router.post("/login", (req, res, next) => AuthController.login(req, res, next));
router.post("/logout", (req, res, next) =>
  AuthController.logout(req, res, next)
);

export default router;
