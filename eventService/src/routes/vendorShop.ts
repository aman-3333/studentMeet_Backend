import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";
import { IVendorShop } from "../models/VendorShop";
import VendorShopController from "../controllers/VendorShopController";
router.post("/create", async (req, res) => {
    try {
        const body = req.body;
        const controller = new VendorShopController();
        const response = await controller.createVendorShop(body);
        res.status(200).json(successResponse("create VendorShop", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create VendorShop", res.statusCode));
    }
});

router.patch("/edit/:id", async (req, res) => {
    try {
        const VendorShopId = req.params.id;
        const body = req.body as IVendorShop;
        const controller = new VendorShopController();
        const response: IVendorShop = await controller.editVendorShop(body, VendorShopId);
        res.status(200).json(successResponse("edit VendorShop", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit VendorShop", res.statusCode));
    }
});

router.get("/list", async (req, res) => {
    try {
        const controller = new VendorShopController();
        const stateId = req.query.stateId;
        const response: IVendorShop[] = await controller.getVendorShopList(stateId);
        res.status(200).json(successResponse("VendorShop list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in VendorShop list", res.statusCode));
    }
});


router.get("/infobyid", async (req, res) => {
    try {
        const VendorShopId: any = req.query.VendorShopId;
        const controller = new VendorShopController();
        const response: any = await controller.getVendorShopInfoById(VendorShopId);
        res.status(200).json(successResponse("getVendorShop", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getVendorShop", res.statusCode));
    }
});


router.patch("/delete/:id", async (req, res) => {
    try {
        const VendorShopId = req.params.id;
        const controller = new VendorShopController();
        const response: IVendorShop = await controller.deleteVendorShop(VendorShopId);
        res.status(200).json(successResponse("deleteVendorShop", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteVendorShop", res.statusCode));
    }
})


export default router;