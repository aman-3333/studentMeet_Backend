import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import SponsorsPartnerController from "../controllers/sponsorsPartnerController";
import { IPartner } from "../models/sponsorPartner";
import { ISponsorship } from "../models/sponsorshipDetails";




router.post("/create", checkAuth, async (req, res) => {
    try {
        const body = req.body as IPartner;
        const controller = new SponsorsPartnerController();
        const response: any = await controller.createSponsorsPartner(body);
        res.status(200).json(successResponse("create shop", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in create shop", res.statusCode));
    }
});
router.post("/create/sponsorship", checkAuth, async (req, res) => {
    try {
        const body = req.body as ISponsorship;
        const controller = new SponsorsPartnerController();
        const response: any = await controller.createSponsorship(body);
        res.status(200).json(successResponse("create shop", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in create shop", res.statusCode));
    }
});
router.patch("/edit/:id",  async (req, res) => {
    try {
        const SponsorsPartnerId:any= req.params.id;
        const body = req.body as IPartner;
        const controller = new SponsorsPartnerController();
        const response: IPartner = await controller.editSponsorsPartner(body, SponsorsPartnerId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/getInfo", checkAuth, async (req, res) => {
    try {
        const userId = req.query.userId;
        const controller = new SponsorsPartnerController();
        const response: IPartner = await controller.getSponsorsPartnerByUserId(userId);
        res.status(200).json(successResponse("get SponsorsPartner shop", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in fetching SponsorsPartner shop", res.statusCode));
    }
});
/////////////////////////////////////city///////////////////////////////////////////////////////////

//Agent





router.patch("/SponsorsPartnerActivate", checkAuth, async (req, res) => {
    try {
        const SponsorsPartnerId = req.body.SponsorsPartnerId;
        const status = req.body.status;
        const ownerId = req.body.ownerId;

        const planId = req.body.planId;

        const controller = new SponsorsPartnerController();
        const response: IPartner = await controller.SponsorsPartnerActivate(status, ownerId, planId, SponsorsPartnerId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/getSponsorsPartnerAdminPannel", checkAuth, async (req, res) => {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;

        const status = req.query.status;
        const categoryId = req.query.categoryId;
        const StarPerformerId = req.query.stateId;
        const cityId = req.query.cityId;
        const stateId = req.query.stateId;
        const limit = req.query.limit;
        const area = req.query.area;
        const skip = req.query.skip;
        const search = req.query.search;
        const controller = new SponsorsPartnerController();
        const response: any = await controller.getSponsorsPartnerAdminPannel(latitude, longitude, area, status,
            categoryId, stateId, cityId, limit, skip, search);
        res.status(200).json(successResponse("shop list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in shop list", res.statusCode));
    }
});




router.get("/InfoById", checkAuth, async (req, res) => {
    try {
        const partnerId: any = req.query.partnerId;
        const controller = new SponsorsPartnerController();
        const response: any = await controller.getSponsorsPartnerInfoById(partnerId);
        res.status(200).json(successResponse("get shop", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get shop", res.statusCode));
    }
});


router.get("/deleteShop/:id", checkAuth, async (req, res) => {
    try {
        const shopId = req.params.id;
        const controller = new SponsorsPartnerController();
        const response: IPartner = await controller.deleteSponsorsPartner(shopId);
        res.status(200).json(successResponse("delete shop", response, res.statusCode));

    } catch (error) {
        
        res.status(500).json(errorResponse("error in delete shop", res.statusCode));
    }
})















export default router;