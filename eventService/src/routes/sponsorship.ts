import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";
import SponsorshipController from "../controllers/sponsorshipController";
import { ISponsorship } from "../models/sponser";


router.post("/createSponsorship", async (req, res) => {
    try {
        const body = req.body as ISponsorship;

        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.createSponsorship(body);
        res.status(200).json(successResponse("create Sponsorship", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in create Sponsorship", res.statusCode));
    }
});



router.patch("/editSponsorship/:id", async (req, res) => {
    try {
        const SponsorshipId = req.params.id;

        const body = req.body as ISponsorship;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.editSponsorship(body, SponsorshipId);
        res.status(200).json(successResponse("Sponsorship update", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in Sponsorship update", res.statusCode));
    }
});

router.get("/getallSponsorship", async (req, res) => {
    try {
        const controller = new SponsorshipController();
        const type = req.query.type;
        const response: ISponsorship[] = await controller.getSponsorshipSponsorshipScreen(type);
        res.status(200).json(successResponse("get Sponsorship", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get Sponsorship", res.statusCode));
    }
});
router.get("/getSponsorshipParticipants", async (req, res) => {
    try {
        const controller = new SponsorshipController();
        const SponsorshipId = req.query.SponsorshipId;
        const response: ISponsorship[] = await controller.getParticipantsList(SponsorshipId);
        res.status(200).json(successResponse("getParticipantsList", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("getParticipantsList", res.statusCode));
    }
});


router.get("/getSponsorshipByuserId", async (req, res) => {
    try {
        const controller = new SponsorshipController();
        const userId = req.query.userId;
        const response:any = await controller.getSponsorshipByUserId(userId);
        res.status(200).json(successResponse("get getSponsorshipbyuserId", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in get getSponsorshipbyuserId", res.statusCode));
    }
  
    
    
});
router.get("/getSponsorshipCreateByUser", async (req, res) => {
    try {
        const controller = new SponsorshipController();
        const userId = req.query.userId;
        const response:any = await controller.getSponsorshipCreateByUser(userId);
        res.status(200).json(successResponse("get SponsorshipCreateByUser", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in get SponsorshipCreateByUser", res.statusCode));
    }
});




router.get("/getSponsorshipinfobyid", async (req, res) => {
    try {
        const SponsorshipId = req.query.SponsorshipId;
        const status = req.query.status;
        const controller = new SponsorshipController();
        const response: any = await controller.getsponsorshipInfo(SponsorshipId,status);
        res.status(200).json(successResponse("get Sponsorship by Id ", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in get Sponsorship by Id", res.statusCode));
    }
});
router.get("/getFriendActivity", async (req, res) => {
    try {
        const userId = req.query.userId;
       
        const controller = new SponsorshipController();
        const response: any = await controller.getFriendActivity(userId);
        res.status(200).json(successResponse("getFriendActivity", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in getFriendActivity", res.statusCode));
    }
});

router.post("/SponsorshipActivity", async (req, res) => {
    try{
        
        const userId:any =req.body.userId;
        const SponsorshipId=req.body.SponsorshipId;
       
         const status=req.body.status; 
         const hashtagcomment=req.body.Sponsorshipcomment;
        const hashtagcommentId=req.body.SponsorshipcommentId;
        const body=req.body;
        const controller=new SponsorshipController();
        const response:any =await controller.SponsorshipActivity(userId,SponsorshipId,  status,hashtagcomment,hashtagcommentId, body);
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
        const SponsorshipId=req.query.SponsorshipId;
        const controller=new SponsorshipController();
        const response:any =await controller.readActivity(SponsorshipId,status);
        res.status(200).json(successResponse("readActivity",response,res.statusCode));
    }catch(error) {
      
        res.status(500).json(errorResponse("error in readActivity", res.statusCode));
    }
})
router.post("/SponsorshipCreateBYOrganizer", async (req, res) => {
    try {
        const body = req.body;
        const controller = new SponsorshipController();
        const response: any = await controller.SponsorshipCreateBYOrganizer(body);
        res.status(200).json(successResponse("SponsorshipCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in SponsorshipCreateBYOrganizer", res.statusCode));
    }
});
router.post("/SponsorshipOrganize", async (req, res) => {
    try {
      
        
        const body = req.body;
        const SponsorshipId = req.body.SponsorshipId; 
        const organizerId = req.body.organizerId;
         const formId = req.body.formId;
          const status = req.body.status;
        const controller = new SponsorshipController();
        const response: any = await controller.applyForSponsorshipOrganize(SponsorshipId, organizerId, formId, status);
        res.status(200).json(successResponse("SponsorshipCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in SponsorshipCreateBYOrganizer", res.statusCode));
    }
});




router.post("/applySponsorship", async (req, res) => {
    try {
        const SponsorshipId = req.body.SponsorshipId; 
        const userId = req.body.userId; 
        const status = req.body.status; 
        const controller = new SponsorshipController();
        const response: any = await controller.bookSponsorship(SponsorshipId,userId,status);
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
        const body = req.body;
        const SponsorshipId = req.body.SponsorshipId;
        const reting = req.body.reting;
        const feadBackComment = req.body.userId;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.feadBackSponsorship(body,SponsorshipId, reting,feadBackComment);
        res.status(200).json(successResponse("feadBackSponsorship Sponsorship", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in feadBackSponsorship Sponsorship", res.statusCode));
    }
})


router.post("/Sponsorshiporganizerteam", async (req, res) => {
    try {
        const organizerId = req.body.organizerId;
        const SponsorshipId = req.body.SponsorshipId;
        const suborganizerId = req.body.suborganizerId;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.createSponsorshipOrganizerTeam(organizerId,SponsorshipId,suborganizerId);
        res.status(200).json(successResponse("delete Sponsorship", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete Sponsorship", res.statusCode));
    }
})
router.patch("/deleteSponsorship/:id", async (req, res) => {
    try {
        const SponsorshipId = req.body.SponsorshipId;
        const userId = req.body.userId;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.deleteSponsorship(SponsorshipId, userId);
        res.status(200).json(successResponse("delete Sponsorship", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete Sponsorship", res.statusCode));
    }
})

router.patch("/deleteSponsorship/:id", async (req, res) => {
    try {
        const SponsorshipId = req.body.SponsorshipId;
        const userId = req.body.userId;
        const controller = new SponsorshipController();
        const response: ISponsorship = await controller.deleteSponsorship(SponsorshipId, userId);
        res.status(200).json(successResponse("delete Sponsorship", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete Sponsorship", res.statusCode));
    }
})





























export default router;