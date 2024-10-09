import Router from "express";
import {login} from "../controllers/user.controllers.js"
import { registerEmployee , getAllEmployees } from "../controllers/employee.controller.js";

const router=Router()
router.route("/login").post(login);
router.route("/create-employee").post(registerEmployee);
router.route("/employees").get( getAllEmployees);

export default router 