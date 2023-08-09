import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { IBankDetails } from "../models/bankDetails";

import BankDetailsController from "../controllers/BankDetailsController";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new BankDetailsController();
        const response = await controller.createBankDetails(body);
        res.status(200).json(successResponse("create BankDetails", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create BankDetails", res.statusCode));
    }
});

router.patch("/BankDetails/:id", checkAuth, async (req, res) => {
    try {
        const BankDetailsId = req.params.id;
        const body = req.body as IBankDetails;
        const controller = new BankDetailsController();
        const response: IBankDetails = await controller.editBankDetails(body, BankDetailsId);
        res.status(200).json(successResponse("edit BankDetails", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit BankDetails", res.statusCode));
    }
});

router.get("/BankDetailsList", checkAuth, async (req, res) => {
    try {
        const controller = new BankDetailsController();
        const stateId = req.query.stateId;
        const response: IBankDetails[] = await controller.getBankDetailsList(stateId);
        res.status(200).json(successResponse("BankDetails list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in BankDetails list", res.statusCode));
    }
});


router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const BankDetailsId: any = req.query.BankDetailsId;
        const controller = new BankDetailsController();
        const response: any = await controller.getBankDetailsInfoById(BankDetailsId);
        res.status(200).json(successResponse("getBankDetails", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getBankDetails", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const BankDetailsId = req.params.id;
        const controller = new BankDetailsController();
        const response: IBankDetails = await controller.deleteBankDetails(BankDetailsId);
        res.status(200).json(successResponse("deleteBankDetails", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteBankDetails", res.statusCode));
    }
})


export default router;