import Router from "express";
import {registerUser, login,logoutUser} from "../controllers/user.controllers.js"
import { registerEmployee , getAllEmployees } from "../controllers/employee.controller.js";
import { checkRole, authenticate} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middlewares.js";

const router=Router()
router.route("/registerUser").post(upload.none(),registerUser);
router.route("/login").post(upload.none(), login);
router.route("/create-employee").post(upload.single("profileImg"),authenticate,registerEmployee);
router.route("/employees").get( authenticate,checkRole("admin"),getAllEmployees);
router.route("/logout").post(authenticate,logoutUser);

export default router    