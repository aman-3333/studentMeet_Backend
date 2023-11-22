import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IGiftMoney } from "../models/giftMoney";
import giftMoneyController from "../controllers/giftMoneyController";
router.post("/create/order",  async (req, res) => {
    try {
const body = req.body;
        const controller = new giftMoneyController();
        const response:any = await controller.createOrder(body);
        res.status(200).json(successResponse("create giftMoney", response, res.statusCode));
    } catch (error) {
   console.log(error)
        res.status(500).json(errorResponse("error in create giftMoney", res.statusCode));
    }
});


// router.post("/edit",  async (req, res) => {
//     try {
//         const giftMoneyId = req.body.giftMoneyId;
//         const body = req.body as IgiftMoney;
//         const controller = new giftMoneyController();
//         const response: IgiftMoney = await controller.editgiftMoney(body, giftMoneyId);
//         res.status(200).json(successResponse("edit giftMoney", response, res.statusCode));
//     } catch (error) {
      
//         res.status(500).json(errorResponse("error in edit giftMoney", res.statusCode));
//     }
// });

// router.get("/giftMoneyList", checkAuth, async (req, res) => {
//     try {
//         const controller = new giftMoneyController();
//         const stateId = req.query.stateId;
//         const response: IgiftMoney[] = await controller.getgiftMoneyList(stateId);
//         res.status(200).json(successResponse("giftMoney list", response, res.statusCode));
//     } catch (error) {
      
//         res.status(500).json(errorResponse("error in giftMoney list", res.statusCode));
//     }
// });


// router.get("/infobyid",  async (req, res) => {
//     try {
//         const giftMoneyId: any = req.query.giftMoneyId;
//         const controller = new giftMoneyController();
//         const response: any = await controller.getgiftMoneyInfoById(giftMoneyId);
//         res.status(200).json(successResponse("getgiftMoney", response, res.statusCode));
//     } catch (error) {
      
//         res.status(500).json(errorResponse("error in getgiftMoney", res.statusCode));
//     }
// });


// router.post("/delete", checkAuth, async (req, res) => {
//     try {
//         const giftMoneyId = req.body.id;
//         const controller = new giftMoneyController();
//         const response: IgiftMoney = await controller.deletegiftMoney(giftMoneyId);
//         res.status(200).json(successResponse("deletegiftMoney", response, res.statusCode));
//     } catch (error) { 
//         res.status(500).json(errorResponse("error in deletegiftMoney", res.statusCode));
//     }
// });

export default router;