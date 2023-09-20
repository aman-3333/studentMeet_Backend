import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import SponsorshipController from "../controllers/sponsorshipController";
import { ISponsorship } from "../models/sponsorshipDetails"


router.post("/create", async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
console.log(body,"body");

        const controller= new SponsorshipController();
      

        const response:ISponsorship= await controller.create(body);
        console.log(response,"response");
        res.status(200).json(successResponse("create Sponsorship", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in create Sponsorship", res.statusCode));
    }
});



router.patch("/edit/:id", async (req, res) => {
    try {
        const sponsorshipId = req.params.id;

        const body = req.body as ISponsorship;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.editSponsorship(body, sponsorshipId);
        res.status(200).json(successResponse("Sponsorship update", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in Sponsorship update", res.statusCode));
    }
});


router.get("/applied/user", async (req, res) => {
    try {
        const controller = new SponsorshipController();
        const sponsorshipId = req.query.sponsorshipId;
        const response:any= await controller.getAppliedUser(sponsorshipId);
        res.status(200).json(successResponse("getParticipantsList", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("getParticipantsList", res.statusCode));
    }
});





router.get("/by/partner/id", async (req, res) => {
    try {
        const controller = new SponsorshipController();
        const sponsorshipPartnerId = req.query.sponsorshipPartnerId;
        const response:any= await controller.getsponsorshipByPartnerId(sponsorshipPartnerId);
        res.status(200).json(successResponse("getParticipantsList", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("getParticipantsList", res.statusCode));
    }
});









router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new SponsorshipController();
       const user=res.locals.user
        const response: ISponsorship[] = await controller.getsponsorshipList(user);
        res.status(200).json(successResponse("getParticipantsList", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("getParticipantsList", res.statusCode));
    }
});

router.get("/byid", async (req, res) => {
    try {
        const sponsorshipId = req.query.sponsorshipId;
        const status = req.query.status;
        const controller = new SponsorshipController();
        const response: any = await controller.getsponsorshipInfo(sponsorshipId,status);
        res.status(200).json(successResponse("get Sponsorship by Id ", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in get Sponsorship by Id", res.statusCode));
    }
});



router.get("/search", async (req, res) => {
    try {
        const search = req.query.search;
    
        const controller = new SponsorshipController();
        const response: any = await controller.searchSponsorship(search);
        res.status(200).json(successResponse("get search Sponsorship  ", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in  search Sponsorship", res.statusCode));
    }
});

router.get("/search", async (req, res) => {
    try {
        const search = req.query.search;
    
        const controller = new SponsorshipController();
        const response: any = await controller.searchSponsorship(search);
        res.status(200).json(successResponse("get search Sponsorship  ", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in  search Sponsorship", res.statusCode));
    }
});


router.post("/activity", async (req, res) => {
    try{
        
        const userId:any =req.body.userId;
        const sponsorshipId=req.body.sponsorshipId;
       
         const status=req.body.status; 
         const hashtagcomment=req.body.sponsorshipComment;
        const hashtagcommentId=req.body.sponsorshipCommentId;
        const body=req.body;
        
        const controller=new SponsorshipController();
        const response:any =await controller.sponsorshipActivity(userId,sponsorshipId,  status,hashtagcomment,hashtagcommentId, body);
        res.status(200).json(successResponse("SponsorshipActivity",response,res.statusCode));
    }catch(error) {
    
        res.status(500).json(errorResponse("error in SponsorshipActivity", res.statusCode));
    }
})
router.get("/getActivity", async (req, res) => {
    try{
        
        const status:any =req.query.status;
        const userId=req.query.userId;
        const controller=new SponsorshipController();
        const response:any =await controller.getActivity(userId,status);
        res.status(200).json(successResponse("getFollowing",response,res.statusCode));
    }catch(error) {
       
        res.status(500).json(errorResponse("error in getFollowing", res.statusCode));
    }
})
router.get("/removeActivity", async (req, res) => {
    try{
        
        
        const status:any =req.query.status;
        const userId=req.query.userId;
        const removeUserId=req.query.removeUserId;
        const controller=new SponsorshipController();
        const response:any =await controller.RemoveActivity(userId,status,removeUserId);
        res.status(200).json(successResponse("getFollowing",response,res.statusCode));
    }catch(error) {
       
        res.status(500).json(errorResponse("error in getFollowing", res.statusCode));
    }
})

router.get("/readActivity", async (req, res) => {
    try{
        
        const status:any =req.query.status;
        const sponsorshipId=req.query.sponsorshipId;
        const controller=new SponsorshipController();
        const response:any =await controller.readActivity(sponsorshipId,status);
        res.status(200).json(successResponse("readActivity",response,res.statusCode));
    }catch(error) {
      
        res.status(500).json(errorResponse("error in readActivity", res.statusCode));
    }
})

router.post("/apply", async (req, res) => {
    try {
      
        
       const body=req.body
        const sponsorshipId = req.body.sponsorshipId; 
        const userId = req.body.userId;
         
        const controller = new SponsorshipController();
        const response: any = await controller.applySponsorship(sponsorshipId, userId,body);
        res.status(200).json(successResponse("applySponsorship ", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in applySponsorship", res.statusCode));
    }
});




router.post("/applySponsorship", async (req, res) => {
    try {
        const sponsorshipId = req.body.sponsorshipId; 
        const userId = req.body.userId; 
        const status = req.body.status; 
        const controller = new SponsorshipController();
        const response: any = await controller.applySponsorship(sponsorshipId,userId,status);
        res.status(200).json(successResponse("applySponsorship ", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in applySponsorship", res.statusCode));
    }
});
router.get("/filterSponsorship", async (req, res) => {
    try {
       
        const sort = req.query.sort;
        const type = req.query.type;
        const category = req.query.category;
        const subCategory = req.query.subCategory; 
         const subSubCategory = req.query.subSubCategory; 
         const limit = req.query.limit;
           const skip = req.query.skip;
           const search = req.query.search;
        const controller = new SponsorshipController();
        const response: any = await controller.filterSponsorship(type,sort, category, subCategory, subSubCategory, limit, skip, search);
        res.status(200).json(successResponse("filterSponsorship ", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error filterSponsorship", res.statusCode));
    }
});



router.patch("/feadBackSponsorship", async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const sponsorshipId = req.body.sponsorshipId;
        const reting = req.body.reting;
        const feadBackComment = req.body.userId;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.feadBackSponsorship(body,sponsorshipId, reting,feadBackComment);
        res.status(200).json(successResponse("feadBackSponsorship Sponsorship", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in feadBackSponsorship Sponsorship", res.statusCode));
    }
})





router.patch("/delete", async (req, res) => {
    try {
        const sponsorshipId = req.body.sponsorshipId;
        const userId = req.body.userId;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.deleteSponsorship(sponsorshipId, userId);
        res.status(200).json(successResponse("delete Sponsorship", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete Sponsorship", res.statusCode));
    }
})







router.get("/readActivity", async (req, res) => {
    try{
        
        const status:any =req.query.status;
        const sponsorshipId=req.query.sponsorshipId;
        const controller=new SponsorshipController();
        const response:any =await controller.readActivity(sponsorshipId,status);
        res.status(200).json(successResponse("readActivity",response,res.statusCode));
    }catch(error) {
      
        res.status(500).json(errorResponse("error in readActivity", res.statusCode));
    }
})























export default router;