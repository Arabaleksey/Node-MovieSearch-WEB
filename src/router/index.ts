const Router = require("express").Router;
import tokenMiddlewares from "../middlewares/token-middlewares";
import authMiddlewares from "../middlewares/auth-middlewares";
import { userController } from "../controllers/user-controller";

const router = new Router();
import { body } from "express-validator";


router.post("/registration", 
body('email').isEmail(),
body('password').isLength({min:3, max:32}),
userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", authMiddlewares, userController.refresh);

export default router;
