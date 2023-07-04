

import {successResponse, errorResponse} from "../services/apiResponse"
import Hashtag, { IHashtag } from "../models/Hashtag";
import { ISubCategory } from "../models/subcategory";
import { ISubSubCategory } from "../models/subSubCategory";
import { IPartner } from "../models/sponsorPartner";
import Category, { ICategory } from "../models/category";
import express, { Application } from "express";
const app: Application = express();
import SponsorsPartnerController from "../controllers/sponsorsPartnerController";


import HashtagController from "../controllers/HashtagController";
import SponsorshipGuildLinesController from "../controllers/guideLines"

import { v4 as uuidv4 } from 'uuid';
uuidv4()
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
import SponsorshipController from "../controllers/sponsorshipController"
import AuthController from "../controllers/AuthController";
import { AnyAaaaRecord } from "dns";
import PaymentController from "../controllers/PaymentController";
//import AuthController from "../controllers/AuthController";
const router = express.Router();



// /////////////////////////////////////chat route///////////////////////////////////////////////////////////



























/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const s31 = new aws.S3({
    accessKeyId: "AKIAT7AWQUCXUTJXNU7S",
    secretAccessKey: "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",
})


let storage = multer.memoryStorage({
    destination: function (req: any, file: any, callback: any) {
        callback(null, '')
    }
})

let upload = multer({ storage }).single('galleryImage')







var s3 = new aws.S3({
  
   accessKeyId: "AKIAT7AWQUCXUTJXNU7S",
   secretAccessKey: "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",

   Bucket: "backendservicestudentmeet"
})
var upload1 = multer({
   storage: multerS3({
       s3: s3,
       bucket:"backendservicestudentmeet",
       metadata: function (req:any, file:any, cb:any) {
           cb(null, { fieldName: file.fieldname });
       },
       key: function (req:any, file:any, cb:any) {
           cb(null, Date.now().toString())
       }
   })
})
 
//Uploading single File to aws s3 bucket
router.post('/upload', upload1.single('file'), function (req:any, res:any ){
   res.send({
       data: req.files,
       msg: 'Successfully uploaded ' + req.files + ' files!'
   })
})
 
//Uploading Multiple Files to aws s3 bucket
router.post('/uploadfile', upload1.array('file', 50), function (req:any, res:any) {
   
    
   res.send({
       data: req.files,
       msg: 'Successfully uploaded ' + req.files.length + ' files!'
   })
})
 







////////////////////////////////////////////////////////////////////////////////////////////////























//////////////////////////////////////////////////////////////////



//////////////////auth//////////////////////////////////









//////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////Sponsorshipguildlines////////////////////////


//////////////////////////////////////////////////////////////////////////




































































///////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////razorpay/////////////////////////////////
router.post("/checkoutPayment", async (req, res) => {
    try {
      const bookSponsorshipId = req.body.bookSponsorshipId;
      const controller = new PaymentController();
      const response:any = await controller.createbookSponsorship(bookSponsorshipId);
      res.status(200).json(successResponse("createorder", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in createorder", res.statusCode));
    }
});
router.post("/paymentCapture", async (req, res) => {
    try {
      const data = req.body;
      const controller = new PaymentController();
      const response:any = await controller.paymentCallback(data);
      res.status(200).json(successResponse("paymentCallback", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in paymentCallback", res.statusCode));
    }
});
// //////////////////////////////////////////////post//////////////////////////////////////////////////




export default router;
