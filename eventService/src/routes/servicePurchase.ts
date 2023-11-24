import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IServicePurchase } from "../models/servicePurchase";
import servicePurchaseController from "../controllers/servicePurchaseController";
router.post("/create/order",  async (req, res) => {
    try {
const body = req.body;
        const controller = new servicePurchaseController();
        const response:any = await controller.createOrder(body);
        res.status(200).json(successResponse("create servicePurchase", response, res.statusCode));
    } catch (error) {
   console.log(error)
        res.status(500).json(errorResponse("error in create servicePurchase", res.statusCode));
    }
});



router.post("/capture/payment",  async (req, res) => {
    try {
const body = req.body;
        const controller = new servicePurchaseController();
        const response:any = await controller.capturePament(body);
        res.status(200).json(successResponse("create servicePurchase", response, res.statusCode));
    } catch (error) {
   console.log(error)
        res.status(500).json(errorResponse("error in create servicePurchase", res.statusCode));
    }
});


router.post("/post/detail",  async (req, res) => {
    try {
const body = req.body;
        const controller = new servicePurchaseController();
        const response:any = await controller.userAccountDetailForPost(body);
        res.status(200).json(successResponse("create post detail", response, res.statusCode));
    } catch (error) {
   console.log(error)
        res.status(500).json(errorResponse("error in create post detail", res.statusCode));
    }
});


router.post("/post/gift/transtion",  async (req, res) => {
    try {
const body = req.body;
        const controller = new servicePurchaseController();
        const response:any = await controller.getPostGiftTranstion(body);
        res.status(200).json(successResponse(" post  gift transtion detail", response, res.statusCode));
    } catch (error) {
   console.log(error)
        res.status(500).json(errorResponse("error in  post gift transtion detail", res.statusCode));
    }
});


router.post("/achivement/gift/transtion",  async (req, res) => {
    try {
const body = req.body;
        const controller = new servicePurchaseController();
        const response:any = await controller.getAchivementGiftTranstion(body);
        res.status(200).json(successResponse("create post detail", response, res.statusCode));
    } catch (error) {
   console.log(error)
        res.status(500).json(errorResponse("error in create post detail", res.statusCode));
    }
});


router.post("/achivement/detail",  async (req, res) => {
    try {
const body = req.body;
        const controller = new servicePurchaseController();
        const response:any = await controller.userAccountDetailForAchivement(body);
        res.status(200).json(successResponse("create achivement detail", response, res.statusCode));
    } catch (error) {
   console.log(error)
        res.status(500).json(errorResponse("error in create achivement detail", res.statusCode));
    }
});

// router.post("/edit",  async (req, res) => {
//     try {
//         const servicePurchaseId = req.body.servicePurchaseId;
//         const body = req.body as IservicePurchase;
//         const controller = new servicePurchaseController();
//         const response: IservicePurchase = await controller.editservicePurchase(body, servicePurchaseId);
//         res.status(200).json(successResponse("edit servicePurchase", response, res.statusCode));
//     } catch (error) {
      
//         res.status(500).json(errorResponse("error in edit servicePurchase", res.statusCode));
//     }
// });

// router.get("/servicePurchaseList", checkAuth, async (req, res) => {
//     try {
//         const controller = new servicePurchaseController();
//         const stateId = req.query.stateId;
//         const response: IservicePurchase[] = await controller.getservicePurchaseList(stateId);
//         res.status(200).json(successResponse("servicePurchase list", response, res.statusCode));
//     } catch (error) {
      
//         res.status(500).json(errorResponse("error in servicePurchase list", res.statusCode));
//     }
// });


// router.get("/infobyid",  async (req, res) => {
//     try {
//         const servicePurchaseId: any = req.query.servicePurchaseId;
//         const controller = new servicePurchaseController();
//         const response: any = await controller.getservicePurchaseInfoById(servicePurchaseId);
//         res.status(200).json(successResponse("getservicePurchase", response, res.statusCode));
//     } catch (error) {
      
//         res.status(500).json(errorResponse("error in getservicePurchase", res.statusCode));
//     }
// });


// router.post("/delete", checkAuth, async (req, res) => {
//     try {
//         const servicePurchaseId = req.body.id;
//         const controller = new servicePurchaseController();
//         const response: IservicePurchase = await controller.deleteservicePurchase(servicePurchaseId);
//         res.status(200).json(successResponse("deleteservicePurchase", response, res.statusCode));
//     } catch (error) { 
//         res.status(500).json(errorResponse("error in deleteservicePurchase", res.statusCode));
//     }
// });

export default router;