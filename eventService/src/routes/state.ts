import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";

import { IState } from "../models/State";
import StateController from "../controllers/StateController";


router.post("/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new StateController();
        const response = await controller.createState(body);
        res.status(200).json(successResponse("create State", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in create State", res.statusCode));
    }
});
router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const StateId = req.params.id;
        req.body.user=res.locals.user
        const body = req.body as IState;
        const controller = new StateController();
        const response: IState = await controller.editState(body, StateId);
        res.status(200).json(successResponse("edit State", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit State", res.statusCode));
    }
});

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new StateController();
        const response: IState[] = await controller.getStateList();
        res.status(200).json(successResponse("State list", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in State list", res.statusCode));
    }
});


router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const StateId = req.query.id;
        const controller = new StateController();
        const response: IState = await controller.getStateInfoById(StateId);
        res.status(200).json(successResponse("get State", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in get State", res.statusCode));
    }
});


router.get("/delete", checkAuth, async (req, res) => {
    try {
        const StateId = req.body.stateId;
        const controller = new StateController();
        const response: IState = await controller.deleteState(StateId);
        res.status(200).json(successResponse("delete State", response, res.statusCode));

    } catch (error) {
  
        res.status(500).json(errorResponse("error in delete State", res.statusCode));
    }
})



export default router;