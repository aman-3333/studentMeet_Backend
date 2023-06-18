import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";
import  { IUserrole} from "../models/userRole";
import UserroleController from "../controllers/userRoleController";

router.post("/createUserrole", async (req, res) => {
    try {
        const body = req.body as IUserrole;
     
        const controller = new UserroleController();
        const response:IUserrole = await controller.createUserrole(body);
        res.status(200).json(successResponse("create Userrole", response, res.statusCode));
    } catch(error) {
      
        res.status(500).json(errorResponse("error in create Userrole", res.statusCode));
    }
});

router.patch("/editUserrole/:id", async (req, res) => {
    try {
        const UserroleId = req.params.id;
        
        const body = req.body as IUserrole;
        const controller = new UserroleController();
        const response: IUserrole = await controller.editUserrole(body, UserroleId);
        res.status(200).json(successResponse("Userrole update", response, res.statusCode));
    } catch(error) {
        
        res.status(500).json(errorResponse("error in Userrole update", res.statusCode));
    }
});

router.get("/UserroleList", async (req, res) => {
    try {
        const controller = new UserroleController();
  
        const response: IUserrole[] = await controller.getUserrole();
        res.status(200).json(successResponse("get Userrole", response, res.statusCode));
    } catch(error) {
   
        res.status(500).json(errorResponse("error in get Userrole", res.statusCode));
    }
});


router.get("/getUserroleInfoById", async (req, res) => {
    try {
        const UserroleInfoById: any= req.query.UserroleInfoById;
        const userId=req.body.userId;
        const controller = new UserroleController();
        const response: IUserrole = await controller.getUserroleInfoById(UserroleInfoById);
        res.status(200).json(successResponse("get Userrole by Id ", response, res.statusCode));
    } catch(error) {
        
        res.status(500).json(errorResponse("error in get Userrole by Id", res.statusCode));
    }
});
router.patch("/deleteUserrole/:id", async (req, res) => {
    try {
        const UserroleId = req.params.id;
        const controller = new UserroleController();
        const response: IUserrole = await controller.deleteUserrole(UserroleId);
        res.status(200).json(successResponse("Userrole update", response, res.statusCode));
    } catch(error) {
        
        res.status(500).json(errorResponse("error in Userrole update", res.statusCode));
    }
});



export default router;