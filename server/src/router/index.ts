const Router = require("express").Router;
import { userController } from "../controllers/user-controller";
import authMiddleware from "../middlewares/auth-middleware"

const router = new Router();
import { body } from "express-validator";


router.post("/registration", 
body('email').isEmail(),
body('password').isLength({min:3, max:32}),
userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

export default router;
