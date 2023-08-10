import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IRole } from "../models/role";

import RoleController from "../controllers/RoleController";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new RoleController();
        const response = await controller.createRole(body);
        res.status(200).json(successResponse("create Role", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create Role", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const RoleId = req.params.id;
        const body = req.body as IRole;
        const controller = new RoleController();
        const response: IRole = await controller.editRole(body, RoleId);
        res.status(200).json(successResponse("edit Role", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Role", res.statusCode));
    }
});

router.get("/list",  async (req, res) => {
    try {
        const controller = new RoleController();
        const response: IRole[] = await controller.getRoleList();
        res.status(200).json(successResponse("Role list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Role list", res.statusCode));
    }
});


router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const RoleId: any = req.query.RoleId;
        const controller = new RoleController();
        const response: any = await controller.getRoleInfoById(RoleId);
        res.status(200).json(successResponse("getRole", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getRole", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const RoleId = req.params.id;
        const controller = new RoleController();
        const response: IRole = await controller.deleteRole(RoleId);
        res.status(200).json(successResponse("deleteRole", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteRole", res.statusCode));
    }
})


export default router;