import express from "express";
import { IEvent } from "../models/event";
import {successResponse, errorResponse} from "../services/apiResponse"
import Hashtag, { IHashtag } from "../models/Hashtag";
import { ISubCategory } from "../models/Subcategory";
import { ISubSubCategory } from "../models/subSubCategory";
import { IPartner } from "../models/eventPartner";
import Category, { ICategory } from "../models/Category";
import  { IInstitute } from "../models/InstituteModel";
import  { IUserrole} from "../models/UserRole";
import { ICity } from "../models/City";
import { IState } from "../models/State";
import { IEventGuildLines } from "../models/CustomEventGuidlines";
import eventPartnerController from "../controllers/eventPartnerController";
import StateController from "../controllers/StateController";
import UserroleController from "../controllers/userRoleController"
import InstituteController from "../controllers/InstituteController";
import StarPerformerController from "../controllers/StarPerformerController"
import HashtagController from "../controllers/HashtagController";
import CityController from "../controllers/CityController";
import CategoryController from "../controllers/CategoryController";
import EventGuildLinesController from "../controllers/CustomEventGuildLines"
import ChatController from "../controllers/ChatController";
import Message from "../models/messageModel"
import userrole from "../models/userDetails"
import Chat from "../models/chatModel";
import { v4 as uuidv4 } from 'uuid';
uuidv4()
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
import eventController from "../controllers/eventController"
import AuthController from "../controllers/AuthController";
import { AnyAaaaRecord } from "dns";
//import AuthController from "../controllers/AuthController";
const router = express.Router();



// /////////////////////////////////////chat route///////////////////////////////////////////////////////////
router.get("/searchUser", async (req, res) => {
    try {
        const id:any=req.query.institute;
        let searchValue:any = req.query.searchValue;
        let senderId:any=req.query.senderId;
       
        const controller = new ChatController();
        const response = await controller.getAllUser(id,searchValue,senderId);
        res.status(200).json(successResponse("searchUser",response,res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in searchUser", res.statusCode));
    }
});




// TODO........ 2nd   access Chat

router.post("/accessChat",async(req:any,res:any)=>{
    try {
        const senderId =req.body.senderId;
    // const { userId,senderId } = req.body;
    const  userId = req.body.userId;
        const controller = new ChatController();
        const response = await controller.accessChat(userId,senderId);
        res.status(200).json(successResponse("accessChat",response,res.statusCode));
    }catch(error) {
        console.error("error in accessChat ", error);
        res.status(500).json(errorResponse("error in accessChat", res.statusCode));
    }
})


// TODO........ 3rd  fetch Chat

router.get("/fetchChat/:Id",async(req:any,res:any)=>{
    try {
        let senderId=req.params.Id;

        const controller = new ChatController();
        const response = await controller.fetchChat(senderId);
        res.status(200).json(successResponse("fetchChat",response,res.statusCode));
    }catch(error) {
        console.error("error in fetchChat ", error);
        res.status(500).json(errorResponse("error in fetchChat", res.statusCode));
    }
})
// TODO  4th  get All Messages

router.get("/getAllMessage/:chatId",async(req,res)=>{
try {
    let chatId=req.params.chatId ;

    const controller = new ChatController();
    const response = await controller.getALlMessage(chatId);
    res.status(200).json(successResponse("getAllMessage",response,res.statusCode));
}catch(error) {
    console.error("error in getAllMessage ", error);
    res.status(500).json(errorResponse("error in getAllMessage", res.statusCode));
}
})


// TODO 5th send Message...........................

router.post("/sendMessage/:Id",async(req,res)=>{
    try {
        let Id:any=req.params.Id ;
        const { content, chatId }:any = req.body;
        const controller = new ChatController();
        const response = await controller.sendMessage(Id,content,chatId);
        res.status(200).json(successResponse("sendMessage",response,res.statusCode));
    }catch(error) {
        console.error("error in sendMessage ", error);
        res.status(500).json(errorResponse("error in sendMessage", res.statusCode));
    }
})

// TODO  6th  Create-Group-chat...................................................

router.post("/create-group-chat/:senderId",async(req,res)=>{

    try{
        let senderId:any=req.params.senderId;
        const{users,name}:any=req.body;
        // console.log(req.body)
        const controller=new ChatController();
        const response= await controller.createGroupChat(senderId,users,name);
        res.status(200).json(successResponse("create-group-chat",response,res.statusCode));
    }catch(error) {
        console.error("error in create-group-chat ", error);
        res.status(500).json(errorResponse("error in create-group-chat", res.statusCode));
    }
})

// //todo 

router.post("/leavegroup",async(req,res)=>{

    try{
        const userId:any=req.body.userId;
        const adminId:any=req.body.adminId;
        const groupId:any=req.body.groupId;
       
        // console.log(req.body)
        const controller=new ChatController();
        const response= await controller.leavegroup(userId,adminId,groupId);
        res.status(200).json(successResponse("leavegroup",response,res.statusCode));
    }catch(error) {
        console.error("error in leavegroup ", error);
        res.status(500).json(errorResponse("error in leavegroup", res.statusCode));
    }
})

// !todo   7th  send message
router.post("/sendMessage/:Id",async(req,res)=>{
    try {
    const { content, chatId } = req.body;
    console.log("content",content , "chatId",chatId )
    const SenderId=req.params.Id;
    console.log("senderId",SenderId)
    // console.log(req.body)
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
    //   return res.send().Status(400);
    return res.status(401).send("invalid data passed !chat or !content")
    }
  
    var newMessage = {
      sender: SenderId,
      content: content,
      chat: chatId,
    };

// TODO OLD...start
      let message = await Message.create(newMessage);
       message = await  message.populate("sender").execPopulate()
      message = await message.populate("chat").execPopulate()
      message = await userrole.populate(message, {
        path: "chat.users",
        select: "fullname pic email",
      });
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      res.json(message)
 // !todo old end...

//  !  new code start...

// let message = await Message.create(newMessage)
//   console.log("newMessage",message);

//   let populatedMessage=await Message.find({_id:message._id}).populate("sender").populate("chat")

//   console.log(populatedMessage,"populatemessage")
//   await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
// res.send(populatedMessage)


// !   new code end.....


    } catch (error:any) {
      res.status(400).send(error.message);
      throw new Error(error.message);
    }
  });


// todo

// Todo 8th  Get:Message

router.get("/getAllMessage/:chatId",async(req,res)=>{
    console.log("get message")
try {
const messages = await Message.find({ chat: req.params.chatId })
.populate("sender", "fullname email")
.populate("chat");

res.send(messages)

} catch (error) {
res.status(400);
// throw new Error(error.message);
}
});


// !TODO delete many

router.patch("/delall",async(req,res)=>{
try{
    const all=['626f8c2d8bad662e68319faf',
    "627bbaa29fd2c463349c0abd",
        '627a0531640183570822ff15',
        '6278ffa49975303360b5bd4a'] 
    const del=await Message.updateMany( { _id: { $in:all } },
        { $set: { content: "new set update" } },
        {multi: true})

    res.send(del)
}
catch(e){
    res.send(e)
}
})

// todo  aggregator
router.get("/aggregate",async(req,res)=>{
    try{
          const data= await Message.aggregate(
            [
                {
                    '$match': {
                        'content': 'new set update'
                    }
                }, {
                    '$project': {
                        'content': 1, 
                        'chat': 1, 
                        'sender': 1
                    }
                }, {
                    '$lookup': {
                        'from': 'users', 
                        'localField': 'sender', 
                        'foreignField': '_id', 
                        'as': 'sender'
                    }
                }, {
                    '$unwind': {
                        'path': '$sender'
                    }
                }, {
                    '$lookup': {
                        'from': 'chats', 
                        'localField': 'chat', 
                        'foreignField': '_id', 
                        'as': 'chat'
                    }
                }, {
                    '$unwind': {
                        'path': '$chat'
                    }
                },
                {
                    '$lookup': {
                        'from': 'users', 
                        'localField': 'chat.users', 
                        'foreignField': '_id', 
                        'as': 'chat.users'
                      }
                }
                
            ]
          )
          res.send(data)
    }
    catch(error){
        res.send(error)
    }
})

// TODO test user

router.get("/find/:Id",async(req,res)=>{
    let id=req.params.Id;
    try{
        const data=await userrole.find({_id:id})
        console.log("data",data)
        res.send(data)
    }
    catch(e){
        res.send(e)
    }
})


























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
    console.log("photos",req.files);
    
   res.send({
       data: req.files,
       msg: 'Successfully uploaded ' + req.files.length + ' files!'
   })
})
 







////////////////////////////////////////////////////////////////////////////////////////////////























//////////////////////////////////////////////////////////////////



//////////////////auth//////////////////////////////////

router.post("/sendotp", async (req, res) => {
 
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.sendotp(body);
        res.status(200).json(successResponse("sendotp", response, res.statusCode));
    } catch (error) {
        console.error("error in sendotp", error);
        res.status(500).json(errorResponse("error in sendotp", res.statusCode));
    }
})
router.post("/sendotpbyapi", async (req, res) => {
 
    try {
        const body:any = req.body
        const controller = new AuthController();
        const response = await controller.sendotpByApi(body);
        res.status(200).json(successResponse("sendotpbyapi", response, res.statusCode));
    } catch (error) {
        console.error("error in sendotpbyapi", error);
        res.status(500).json(errorResponse("error in sendotpbyapi", res.statusCode));
    }
})


router.post("/verifyotpByApi", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response = await controller.verifyotpByApi(body);
        res.status(200).json(successResponse("verifyotpByApi", response, res.statusCode));
    } catch (error) {
        console.error("error in verifyotpByApi", error);
        res.status(500).json(errorResponse("error in verifyotpByApi", res.statusCode));
    }
})
router.post("/verifyotp", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response:any = await controller.verifyotp(body);
        res.status(200).json(successResponse("verifyotp", response, res.statusCode));
    } catch (error) {
        console.error("error in verifyotp", error);
        res.status(500).json(errorResponse("error in verifyotp", res.statusCode));
    }
})
router.patch("/editprofile", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response = await controller.editProfile(body);
        res.status(200).json(successResponse("editprofile", response, res.statusCode));
    } catch (error) {
        console.error("error in editProfile", error);
        res.status(500).json(errorResponse("error in editProfile", res.statusCode));
    }
})


router.get("/viewProfile", async (req, res) => {
    try {
        const userId = req.query.userId ;
        const controller = new AuthController();
        const response = await controller.viewProfile(userId);
        res.status(200).json(successResponse("viewProfile", response, res.statusCode));
    } catch (error) {
        console.error("error in viewProfile", error);
        res.status(500).json(errorResponse("error in viewProfile", res.statusCode));
    }
});






//////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////eventguildlines////////////////////////

router.post("/createEventGuildLines", async (req, res) => {
    try {
        const body = req.body;
        const controller = new EventGuildLinesController();
        const response = await controller.createEventGuildLines(body);
        res.status(200).json(successResponse("create EventGuildLines", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in create EventGuildLines", res.statusCode));
    }
});

router.patch("/EventGuildLines/:id", async (req, res) => {
    try {
        const EventGuildLinesId = req.params.id;
        const body = req.body as IEventGuildLines;
        const controller = new EventGuildLinesController();
        const response: IEventGuildLines = await controller.editEventGuildLines(body, EventGuildLinesId);
        res.status(200).json(successResponse("edit EventGuildLines", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit EventGuildLines", res.statusCode));
    }
});

router.get("/EventGuildLinesList", async (req, res) => {
    try {
        const controller = new EventGuildLinesController();
        const CategoryId=req.query.CategoryId
        const response: IEventGuildLines[] = await controller.getEventGuildLinesList(CategoryId);
        res.status(200).json(successResponse("EventGuildLines list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in EventGuildLines list", res.statusCode));
    }
});


router.get("/eventGuildLinesById", async (req, res) => {
    try {
        const EventGuildLinesId:any = req.query.EventGuildLinesId;
        const controller = new EventGuildLinesController();
        const response: any = await controller.getEventGuildLinesInfoById(EventGuildLinesId);
        res.status(200).json(successResponse("get EventGuildLines", response, res.statusCode));
    } catch (error) {
        console.error("error in EventGuildLines", error);
        res.status(500).json(errorResponse("error in get EventGuildLines", res.statusCode));
    }
});


router.get("/deleteEventGuildLines/:id", async (req, res) => {
    try {
        const EventGuildLinesId = req.params.id;
        const controller = new EventGuildLinesController();
        const response: IEventGuildLines = await controller.deleteEventGuildLines(EventGuildLinesId);
        res.status(200).json(successResponse("delete EventGuildLines", response, res.statusCode));

    } catch (error) {
        console.error("error in delete EventGuildLines", error);
        res.status(500).json(errorResponse("error in delete EventGuildLines", res.statusCode));
    }
})
//////////////////////////////////////////////////////////////////////////
router.post("/createevent", async (req, res) => {
    try {
        const body = req.body as IEvent;

        const controller = new eventController();
        const response: IEvent = await controller.createevent(body);
        res.status(200).json(successResponse("create event", response, res.statusCode));
    } catch (error) {
        console.error("error in create event", error);
        res.status(500).json(errorResponse("error in create event", res.statusCode));
    }
});



router.patch("/editevent/:id", async (req, res) => {
    try {
        const eventId = req.params.id;

        const body = req.body as IEvent;
        const controller = new eventController();
        const response: IEvent = await controller.editevent(body, eventId);
        res.status(200).json(successResponse("event update", response, res.statusCode));
    } catch (error) {
        console.error("error in event update", error);
        res.status(500).json(errorResponse("error in event update", res.statusCode));
    }
});

router.get("/getallevent", async (req, res) => {
    try {
        const controller = new eventController();
        const userId = req.body.userId;
        const response: IEvent[] = await controller.geteventEventScreen();
        res.status(200).json(successResponse("get event", response, res.statusCode));
    } catch (error) {
        console.error("error in get event", error);
        res.status(500).json(errorResponse("error in get event", res.statusCode));
    }
});

router.get("/geteventbyuserId", async (req, res) => {
    try {
        const controller = new eventController();
        const userId = req.query.userId;
        const response:any = await controller.geteventbyuserId(userId);
        res.status(200).json(successResponse("get geteventbyuserId", response, res.statusCode));
    } catch (error) {
        console.error("error in get geteventbyuserId", error);
        res.status(500).json(errorResponse("error in get geteventbyuserId", res.statusCode));
    }
});



router.get("/geteventinfobyid", async (req, res) => {
    try {
        const eventId = req.query.eventId;
        const status = req.query.status;
        const controller = new eventController();
        const response: any = await controller.geteventInfo(eventId,status);
        res.status(200).json(successResponse("get event by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get event by Id", error);
        res.status(500).json(errorResponse("error in get event by Id", res.statusCode));
    }
});
router.post("/eventActivity", async (req, res) => {
    try{
        
        const userId:any =req.body.userId;
        const eventId=req.body.eventId;
       
         const status=req.body.status; 
         const hashtagcomment=req.body.eventcomment;
        const hashtagcommentId=req.body.eventcommentId;
        const body=req.body;
        const controller=new eventController();
        const response:any =await controller.eventActivity(userId,eventId,  status,hashtagcomment,hashtagcommentId, body);
        res.status(200).json(successResponse("eventActivity",response,res.statusCode));
    }catch(error) {
        console.error("error in eventActivity ", error);
        res.status(500).json(errorResponse("error in eventActivity", res.statusCode));
    }
})
router.get("/readActivity", async (req, res) => {
    try{
        
        const status:any =req.query.status;
        const eventId=req.query.eventId;
        const controller=new eventController();
        const response:any =await controller.readActivity(eventId,status);
        res.status(200).json(successResponse("readActivity",response,res.statusCode));
    }catch(error) {
        console.error("error in readActivity ", error);
        res.status(500).json(errorResponse("error in readActivity", res.statusCode));
    }
})
router.post("/eventCreateBYOrganizer", async (req, res) => {
    try {
        const body = req.body;
        const controller = new eventController();
        const response: any = await controller.eventCreateBYOrganizer(body);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.post("/bookForEventOrganize", async (req, res) => {
    try {
        const body = req.body;
        const eventId = req.body.eventId; 
        const organizerId = req.body.organizerId;
         const formId = req.body.formId;
          const status = req.body.status;
        const controller = new eventController();
        const response: any = await controller.applyForEventOrganize(eventId, organizerId, formId, status);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});


router.post("/following", async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        const followingId = req.body.followingId;
      
        const controller = new eventController();
        const response: any = await controller.following(userId,followingId);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.post("/unfollowing", async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        const followingId = req.body.followingId;
      
        const controller = new eventController();
        const response: any = await controller.unfollowing(userId,followingId);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});

router.post("/bookEvent", async (req, res) => {
    try {
        const eventId = req.body.eventId; 
        const userId = req.body.userId; 
        const status = req.body.status; 
        const controller = new eventController();
        const response: any = await controller.bookEvent(eventId,userId,status);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.get("/filterEvent", async (req, res) => {
    try {
        console.log("req.query",req.query);
        const sort = req.query.sort;
        const type = req.query.type;
        const category = req.query.category;
        const subCategory = req.query.subCategory; 
         const subSubCategory = req.query.subSubCategory; 
         const limit = req.query.limit;
           const skip = req.query.skip;
           const search = req.query.search;
        const controller = new eventController();
        const response: any = await controller.filterEvent(type,sort, category, subCategory, subSubCategory, limit, skip, search);
        res.status(200).json(successResponse("filterEvent ", response, res.statusCode));
    } catch (error) {
        console.error("error in filterEvent", error);
        res.status(500).json(errorResponse("error filterEvent", res.statusCode));
    }
});



router.post("/eventorganizerteam", async (req, res) => {
    try {
        const organizerId = req.body.organizerId;
        const eventId = req.body.eventId;
        const suborganizerId = req.body.suborganizerId;
        const controller = new eventController();
        const response: IEvent = await controller.createEventOrganizerTeam(organizerId,eventId,suborganizerId);
        res.status(200).json(successResponse("delete event", response, res.statusCode));
    } catch (error) {
        console.error("error in delete event", error);
        res.status(500).json(errorResponse("error in delete event", res.statusCode));
    }
})
router.patch("/deleteevent/:id", async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.body.userId;
        const controller = new eventController();
        const response: IEvent = await controller.deleteevent(eventId, userId);
        res.status(200).json(successResponse("delete event", response, res.statusCode));
    } catch (error) {
        console.error("error in delete event", error);
        res.status(500).json(errorResponse("error in delete event", res.statusCode));
    }
})

router.patch("/deleteevent/:id", async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.body.userId;
        const controller = new eventController();
        const response: IEvent = await controller.deleteevent(eventId, userId);
        res.status(200).json(successResponse("delete event", response, res.statusCode));
    } catch (error) {
        console.error("error in delete event", error);
        res.status(500).json(errorResponse("error in delete event", res.statusCode));
    }
})

























//////////////////////////////////////////////////////////////////
// router.post("/Coupon", async (req, res) => {
//     try {
//         const body = req.body as ICoupon;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.CreateCoupon(body);
//         res.status(200).json(successResponse("create Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in create Coupon", res.statusCode));
//     }
// });
// router.post("/createCustomCoupon", async (req, res) => {
//     try {
//         const body = req.body as ICoupon;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.createCustomCoupon(body);
//         res.status(200).json(successResponse("create createCustomCoupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in createCustomCoupon", res.statusCode));
//     }
// });

// router.patch("/Coupon/:id", async (req, res) => {
//     try {
//         const CouponId = req.params.id;
//         const body = req.body as ICoupon;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.editCoupon(body, CouponId);
//         res.status(200).json(successResponse("edit Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in edit Coupon", res.statusCode));
//     }
// });
// router.patch("/pullCoupon", async (req, res) => {
//     try {

//         const coupon = req.body.coupon;
//         const userId = req.body.userId;
//         const controller = new CouponController();
//         const response = await controller.pullCoupon(coupon, userId);
//         res.status(200).json(successResponse("edit Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in edit Coupon", res.statusCode));
//     }
// });
// router.patch("/giftCoupon", async (req, res) => {
//     try {
//         const assignById = req.body.assignById;
//         const assignToId = req.body.assignToId;
//         const coupon = req.body.coupon;

//         const controller = new CouponController();
//         const response: any = await controller.couponGift(assignById, assignToId, coupon);
//         res.status(200).json(successResponse("couponGigt", response, res.statusCode));
//     } catch (error) {
//         console.error("error in couponGigt", error);
//         res.status(500).json(errorResponse("error in couponGigt", res.statusCode));
//     }
// });

// router.get("/CouponList", async (req, res) => {
//     try {
//         const controller = new CouponController();
//         const response: ICoupon[] = await controller.getCouponList();
//         res.status(200).json(successResponse("Coupon list", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in Coupon list", res.statusCode));
//     }
// });

// router.get("/findCoupon", async (req, res) => {
//     try {
//         const controller = new CouponController();
//         const categoryId = req.query.categoryId;
//         const search = req.query.search;
//         const response = await controller.findCoupon(categoryId, search);
//         res.status(200).json(successResponse("findCoupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in findCoupon", error);
//         res.status(500).json(errorResponse("error in findCoupon", res.statusCode));
//     }
// });


// router.get("/Coupon/:id", async (req, res) => {
//     try {
//         const CouponId: string = req.params.id;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.getCouponInfoById(CouponId);
//         res.status(200).json(successResponse("get Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in get Coupon", res.statusCode));
//     }
// });


// router.get("/deleteCoupon/:id", async (req, res) => {
//     try {
//         const CouponId = req.params.id;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.deleteCoupon(CouponId);
//         res.status(200).json(successResponse("delete Coupon", response, res.statusCode));

//     } catch (error) {
//         console.error("error in delete Coupon", error);
//         res.status(500).json(errorResponse("error in deleteCoupon", res.statusCode));
//     }
// })

// //**********Plan*************** */
// router.post("/Plan", async (req, res) => {
//     try {
//         const body = req.body;
//         const controller = new PlanController();
//         const response = await controller.createPlan(body);
//         res.status(200).json(successResponse("create shop", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Plan", error);
//         res.status(500).json(errorResponse("error in create shop", res.statusCode));
//     }
// });

// router.patch("/Plan/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const body = req.body;

//         const controller = new PlanController();
//         const response = await controller.editPlan(id, body);
//         res.status(200).json(successResponse("edit Plan", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in edit Plan", res.statusCode));
//     }
// });

// router.get("/Plan/PlanList", async (req, res) => {
//     try {
//         const controller = new PlanController();
//         const response: IPlan[] = await controller.getPlanList();
//         res.status(200).json(successResponse("Plan list", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in Plan list", res.statusCode));
//     }
// });

// router.post("/buyPlan", async (req, res) => {
//     try {
//         const coupon = req.body.coupon;
//         const planId = req.body.planId;
//         const eventPartnerId = req.body.eventPartnerId;
//         const planActivate = req.body.planActivate;
//         const controller = new PlanController();
//         const response = await controller.buyPlan(coupon, planId, eventPartnerId, planActivate);
//         res.status(200).json(successResponse("applyCoupon ", response, res.statusCode));
//     } catch (error) {
//         console.error("error in buyPlan", error);
//         res.status(500).json(errorResponse("error in applyCoupon", res.statusCode));
//     }
// });
// router.get("/getPlanInfoById/:id", async (req, res) => {
//     try {
//         const PlanId: string = req.params.id;
//         const controller = new PlanController();
//         const response: IPlan = await controller.getPlanInfoById(PlanId);
//         res.status(200).json(successResponse("get Plan", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in get Plan", res.statusCode));
//     }
// });


// router.get("/deletePlan/:id", async (req, res) => {
//     try {
//         const PlanId = req.params.id;
//         const controller = new PlanController();
//         const response: IPlan = await controller.deletePlan(PlanId);
//         res.status(200).json(successResponse("delete shop", response, res.statusCode));

//     } catch (error) {
//         console.error("error in delete shop", error);
//         res.status(500).json(errorResponse("error in delete shop", res.statusCode));
//     }
// })



// //**********Subscription*************** */
// router.post("/Subscription", async (req, res) => {
//     try {
//         const body = req.body as ISubscription;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.createSubscription(body);
//         res.status(200).json(successResponse("create Subscription", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in create Subscription", res.statusCode));
//     }
// });

// router.patch("/Subscription/:id", async (req, res) => {
//     try {
//         const SubscriptionId = req.params.id;
//         const body = req.body as ISubscription;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.editSubscription(body, SubscriptionId);
//         res.status(200).json(successResponse("edit Subscription", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in edit Subscription", res.statusCode));
//     }
// });



// router.get("/SubscriptionList", async (req, res) => {
//     try {
//         const controller = new SubscriptionController();
//         const response: ISubscription[] = await controller.getSubscriptionList();
//         res.status(200).json(successResponse("Subscription list", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in Subscription list", res.statusCode));
//     }
// });


// router.get("/Subscription/:id", async (req, res) => {
//     try {
//         const SubscriptionId: string = req.params.id;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.getSubscriptionInfoById(SubscriptionId);
//         res.status(200).json(successResponse("get Subscription", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in get Subscription", res.statusCode));
//     }
// });


// router.patch("/deleteSubscription/:id", async (req, res) => {
//     try {
//         const SubscriptionId = req.params.id;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.deleteSubscription(SubscriptionId);
//         res.status(200).json(successResponse("delete Subscription", response, res.statusCode));

//     } catch (error) {
//         console.error("error in delete Subscription", error);
//         res.status(500).json(errorResponse("error in delete Subscription", res.statusCode));
//     }
// })

router.post("/createCategory", async (req, res) => {
    try {
        const body = req.body as ICategory;
     
        const controller = new CategoryController();
        const response:ICategory = await controller.createCategory(body);
        res.status(200).json(successResponse("create category", response, res.statusCode));
    } catch(error) {
        console.error("error in create category", error);
        res.status(500).json(errorResponse("error in create category", res.statusCode));
    }
});

router.patch("/Category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        const body = req.body as ICategory;
        const controller = new CategoryController();
        const response: ICategory = await controller.editCategory(body, categoryId);
        res.status(200).json(successResponse("category update", response, res.statusCode));
    } catch(error) {
        console.error("error in category update", error);
        res.status(500).json(errorResponse("error in category update", res.statusCode));
    }
});

router.get("/categoryList", async (req, res) => {
    try {
        const controller = new CategoryController();
        const type = req.query.type;
        const response = await controller.getCategory(type);
        res.status(200).json(successResponse("get category", response, res.statusCode));
    } catch(error) {
        console.error("error in get category", error);
        res.status(500).json(errorResponse("error in get category", res.statusCode));
    }
});
router.get("/getCategoryCustomer", async (req, res) => {
    try {
        const controller = new CategoryController();

        const response: ICategory[] = await controller.getCategoryCustomer();
        res.status(200).json(successResponse("get category", response, res.statusCode));
    } catch (error) {
        console.error("error in get category", error);
        res.status(500).json(errorResponse("error in get category", res.statusCode));
    }
});

router.get("/categoryInfoById", async (req, res) => {
    try {
        const categoryId= req.query.categoryId;
        const userId=req.body.userId;
        const controller = new CategoryController();
        const response: any = await controller.getCategoryInfoById(categoryId);
        res.status(200).json(successResponse("get category by Id ", response, res.statusCode));
    } catch(error) {
        console.error("error in get category by Id", error);
        res.status(500).json(errorResponse("error in get category by Id", res.statusCode));
    }
});
router.patch("/deleteCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const controller = new CategoryController();
        const response: ICategory = await controller.deleteCategory(categoryId);
        res.status(200).json(successResponse("category update", response, res.statusCode));
    } catch(error) {
        console.error("error in category update", error);
        res.status(500).json(errorResponse("error in category update", res.statusCode));
    }
});
/////////////////////////////////////Institute////////////////////////////////////////////
router.post("/createInstitute", async (req, res) => {
    try {
        const body = req.body;
     
        const controller = new InstituteController();
        const response:IInstitute = await controller.createInstitute(body);
        res.status(200).json(successResponse("create Institute", response, res.statusCode));
    } catch(error) {
        console.error("error in create Institute", error);
        res.status(500).json(errorResponse("error in create Institute", res.statusCode));
    }
});
router.get("/searchInstitute", async (req, res) => {
    try {
        const controller = new InstituteController();
   const stateId =req.query.stateId
   const searchValue =req.query.searchValue
        const response: any = await controller.searchInstitute(stateId, searchValue);
        res.status(200).json(successResponse("get searchInstitute", response, res.statusCode));
    } catch (error) {
        console.error("error in get searchInstitute", error);
        res.status(500).json(errorResponse("error in get searchInstitute", res.statusCode));
    }
});

router.patch("/Institute/:id", async (req, res) => {
    try {
        const InstituteId = req.params.id;
        
        const body = req.body;
        const controller = new InstituteController();
        const response: IInstitute = await controller.editInstitute(body, InstituteId);
        res.status(200).json(successResponse("Institute update", response, res.statusCode));
    } catch(error) {
        console.error("error in Institute update", error);
        res.status(500).json(errorResponse("error in Institute update", res.statusCode));
    }
});

router.get("/InstituteList", async (req, res) => {
    try {
        const controller = new InstituteController();
        const stateId=req.query.stateId;
        const response: any= await controller.getInstitute(stateId);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch(error) {
        console.error("error in get Institute", error);
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});
router.get("/searchInstitute", async (req, res) => {
    try {
        const stateId=req.query.stateId;
        const searchValue=req.query.searchValue;
        const controller = new InstituteController();
  
        const response: any = await controller.searchInstitute(stateId, searchValue);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch(error) {
        console.error("error in get Institute", error);
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});

router.get("/getInstituteInfoById", async (req, res) => {
    try {
        const InstituteId: any= req.query.InstituteId;
        const userId=req.body.userId;
        const controller = new InstituteController();
        const response:any = await controller.getInstituteInfoById(InstituteId);
        res.status(200).json(successResponse("get Institute by Id ", response, res.statusCode));
    } catch(error) {
        console.error("error in get Institute by Id", error);
        res.status(500).json(errorResponse("error in get Institute by Id", res.statusCode));
    }
});
router.patch("/deleteInstitute/:id", async (req, res) => {
    try {
        const InstituteId = req.params.id;
        const controller = new InstituteController();
        const response: any = await controller.deleteInstitute(InstituteId);
        res.status(200).json(successResponse("Institute update", response, res.statusCode));
    } catch(error) {
        console.error("error in Institute update", error);
        res.status(500).json(errorResponse("error in Institute update", res.statusCode));
    }
});
//////////////////////////////////////////USERROLE/////////////////////////////////////////
router.post("/createUserrole", async (req, res) => {
    try {
        const body = req.body as IUserrole;
     
        const controller = new UserroleController();
        const response:IUserrole = await controller.createUserrole(body);
        res.status(200).json(successResponse("create Userrole", response, res.statusCode));
    } catch(error) {
        console.error("error in create Userrole", error);
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
        console.error("error in Userrole update", error);
        res.status(500).json(errorResponse("error in Userrole update", res.statusCode));
    }
});

router.get("/UserroleList", async (req, res) => {
    try {
        const controller = new UserroleController();
  
        const response: IUserrole[] = await controller.getUserrole();
        res.status(200).json(successResponse("get Userrole", response, res.statusCode));
    } catch(error) {
        console.error("error in get Userrole", error);
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
        console.error("error in get Userrole by Id", error);
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
        console.error("error in Userrole update", error);
        res.status(500).json(errorResponse("error in Userrole update", res.statusCode));
    }
});
/////////////////////////////////////Hashtag/////////////////////////////////////////

router.post("/createHashtag", async (req, res) => {
    try {
        const body = req.body as IHashtag;
     
        const controller = new HashtagController();
        const response:IHashtag = await controller.createHashtag(body);
        res.status(200).json(successResponse("create Hashtag", response, res.statusCode));
    } catch(error) {
        console.error("error in create Hashtag", error);
        res.status(500).json(errorResponse("error in create Hashtag", res.statusCode));
    }
});

router.patch("/createHashtag/:id", async (req, res) => {
    try {
        const HashtagId = req.params.id;
        
        const body = req.body as IHashtag;
        const controller = new HashtagController();
        const response: IHashtag = await controller.editHashtag(body, HashtagId);
        res.status(200).json(successResponse("Hashtag update", response, res.statusCode));
    } catch(error) {
        console.error("error in Hashtag update", error);
        res.status(500).json(errorResponse("error in Hashtag update", res.statusCode));
    }
});

router.get("/HashtagList", async (req, res) => {
    try {
        const controller = new HashtagController();
        const businessTypeId = req.query.businessTypeId;
        const response: IHashtag[] = await controller.getHashtagList();
        res.status(200).json(successResponse("get Hashtag", response, res.statusCode));
    } catch(error) {
        console.error("error in get Hashtag", error);
        res.status(500).json(errorResponse("error in get Hashtag", res.statusCode));
    }
});

router.get("/searchHashtag", async (req, res) => {
    try {
        const search=req.query.search;  
        const controller = new HashtagController();
        const businessTypeId = req.query.businessTypeId;
        const response: IHashtag[] = await controller.searchHashtag(search);
        res.status(200).json(successResponse("get Hashtag", response, res.statusCode));
    } catch(error) {
        console.error("error in get Hashtag", error);
        res.status(500).json(errorResponse("error in get Hashtag", res.statusCode));
    }
});
router.get("/hashtaginfobyid", async (req, res) => {
    try {
        const hashtagId: any= req.query.hashtagId;
        const userId=req.body.userId;
        const controller = new HashtagController();
        const response: IHashtag = await controller.getHashtagInfoById(hashtagId);
        res.status(200).json(successResponse("get Hashtag by Id ", response, res.statusCode));
    } catch(error) {
        console.error("error in get Hashtag by Id", error);
        res.status(500).json(errorResponse("error in get Hashtag by Id", res.statusCode));
    }
});

router.patch("/deleteHashtag/:id", async (req, res) => {
    try{
        const  HashtagId = req.body.HashtagId;
        const userId=req.body.userId;
        const controller=new HashtagController();
        const response:IHashtag =await controller.deleteHashtag(HashtagId,userId);
        res.status(200).json(successResponse("delete Hashtag",response,res.statusCode));
    }catch(error) {
        console.error("error in Hashtag ", error);
        res.status(500).json(errorResponse("error in delete Hashtag", res.statusCode));
    }
})

router.post("/HashtagActivity", async (req, res) => {
    try{
        
        const userId=req.body.userId;
        const HashtagId=req.body.HashtagId;
        const hashtagId=req.body.hashtagId; 
         const status=req.body.status; 
         const Hashtagcomment=req.body.Hashtagcomment;
        const HashtagcommentId=req.body.HashtagcommentId;
        const body=req.body;
        const controller=new HashtagController();
        const response:IHashtag =await controller.HashtagActivity(userId, HashtagId, status, Hashtagcomment, HashtagcommentId, body);
        res.status(200).json(successResponse("hashtagActivity",response,res.statusCode));
    }catch(error) {
        console.error("error in hashtagActivity ", error);
        res.status(500).json(errorResponse("error in hashtagActivity", res.statusCode));
    }
})


router.get("/readHashtagActivity", async (req, res) => {
    try{
        
        const status:any =req.query.status;
        const hashtagId=req.query.hashtagId;
        const controller=new HashtagController();
        const response:any =await controller.readHashtagActivity(hashtagId,status);
        res.status(200).json(successResponse("readActivity",response,res.statusCode));
    }catch(error) {
        console.error("error in readActivity ", error);
        res.status(500).json(errorResponse("error in readActivity", res.statusCode));
    }
})








//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/subCategory", async (req, res) => {
    try {
        const body = req.body as ISubCategory;

        const controller = new CategoryController();
        const response: ISubCategory = await controller.createSubCategory(body);
        res.status(200).json(successResponse("create subcategory", response, res.statusCode));
    } catch (error) {
        console.error("error in create subcategory", error);
        res.status(500).json(errorResponse("error in create subcategory", res.statusCode));
    }
});

router.patch("/subCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        const body = req.body as ISubCategory;
        const controller = new CategoryController();
        const response: ISubCategory = await controller.editSubCategory(body, categoryId);
        res.status(200).json(successResponse("subCategory update", response, res.statusCode));
    } catch (error) {
        console.error("error in subCategory update", error);
        res.status(500).json(errorResponse("error in subCategory update", res.statusCode));
    }
});

router.get("/subCategoryList", async (req, res) => {
    try {
        const controller = new CategoryController();
        const categoryId = req.query.categoryId
        const userId = req.body.userId;
        const response: ISubCategory[] = await controller.getSubCategory(categoryId);
        res.status(200).json(successResponse("get subCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in get subCategory", error);
        res.status(500).json(errorResponse("error in get subCategory", res.statusCode));
    }
});

router.get("/getAllSubCategory", async (req, res) => {
    try {
        const controller = new CategoryController();
        const userId = req.body.userId;
        const response: ISubCategory[] = await controller.getAllSubCategory();
        res.status(200).json(successResponse("get subCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in get subCategory", error);
        res.status(500).json(errorResponse("error in get subCategory", res.statusCode));
    }
});

router.get("/subCategoryinfobyid", async (req, res) => {
    try {
        const subCategoryId: any = req.query.subCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: any = await controller.getSubCategoryInfoById(subCategoryId);
        res.status(200).json(successResponse("get subCategory by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get subCategory by Id", error);
        res.status(500).json(errorResponse("error in get subCategory by Id", res.statusCode));
    }
});


router.patch("/subCategory/delete/:id", async (req, res) => {
    try {
        const subCategoryId = req.body.subCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubCategory = await controller.deleteSubCategory(subCategoryId, userId);
        res.status(200).json(successResponse("delete subCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in delete subCategory", error);
        res.status(500).json(errorResponse("error in delete subCategory", res.statusCode));
    }
})
router.post("/subSubCategory", async (req, res) => {
    try {
        const body = req.body as ISubSubCategory;

        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.createsubSubCategory(body);
        res.status(200).json(successResponse("create subSubCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in create subSubCategory", error);
        res.status(500).json(errorResponse("error in create subSubCategory", res.statusCode));
    }
});

router.patch("/subSubCategory/:id", async (req, res) => {
    try {
        const subSubCategoryId = req.params.id;

        const body = req.body as ISubSubCategory;
        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.editsubSubCategory(body, subSubCategoryId);
        res.status(200).json(successResponse("subSubCategory update", response, res.statusCode));
    } catch (error) {
        console.error("error in subSubCategory update", error);
        res.status(500).json(errorResponse("error in subSubCategory update", res.statusCode));
    }
});

router.get("/subSubCategoryList", async (req, res) => {
    try {
        const subCategoryId = req.query.subCategoryId;
        const controller = new CategoryController();

        const response: ISubSubCategory[] = await controller.getSubSubCategory(subCategoryId);
        res.status(200).json(successResponse("get subSubCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in get subSubCategory", error);
        res.status(500).json(errorResponse("error in get subSubCategory", res.statusCode));
    }
});


router.get("/subSubCategoryinfobyid", async (req, res) => {
    try {
        const subSubCategoryId: any = req.query.subSubCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: any = await controller.getCategorySubSubInfoById(subSubCategoryId);
        res.status(200).json(successResponse("get subSubCategory by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get subSubCategory by Id", error);
        res.status(500).json(errorResponse("error in get subSubCategory by Id", res.statusCode));
    }
});


router.patch("/subSubCategory/:id", async (req, res) => {
    try {
        const subSubCategoryId = req.body.subSubCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.deleteSubSubCategory(subSubCategoryId, userId);
        res.status(200).json(successResponse("delete subSubCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in delete subSubCategory", error);
        res.status(500).json(errorResponse("error in delete subSubCategory", res.statusCode));
    }
})
























//////////////////////////////////////////////////////////////////











///////////////////////////////////////////////////////////////////////////////////////////////////////////




router.post("/eventPartner/Registration", async (req, res) => {
    try {
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: any = await controller.createeventPartner(body);
        res.status(200).json(successResponse("create shop", response, res.statusCode));
    } catch (error) {
        console.error("error in Registration", error);
        res.status(500).json(errorResponse("error in create shop", res.statusCode));
    }
});

router.patch("/editeventPartner/:id", async (req, res) => {
    try {
        const eventPartnerId:any= req.params.id;
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.editeventPartner(body, eventPartnerId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/geteventPartnerShopByUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.geteventPartnerByUserId(userId);
        res.status(200).json(successResponse("get eventPartner shop", response, res.statusCode));
    } catch (error) {
        console.log("error while fetching eventPartner shop", error);
        res.status(500).json(errorResponse("error in fetching eventPartner shop", res.statusCode));
    }
});

router.post("/createCity", async (req, res) => {
    try {
        const body = req.body;
        const controller = new CityController();
        const response = await controller.createCity(body);
        res.status(200).json(successResponse("create City", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in create City", res.statusCode));
    }
});

router.patch("/City/:id", async (req, res) => {
    try {
        const CityId = req.params.id;
        const body = req.body as ICity;
        const controller = new CityController();
        const response: ICity = await controller.editCity(body, CityId);
        res.status(200).json(successResponse("edit City", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit City", res.statusCode));
    }
});

router.get("/CityList", async (req, res) => {
    try {
        const controller = new CityController();
        const stateId = req.query.stateId;
        const response: ICity[] = await controller.getCityList(stateId);
        res.status(200).json(successResponse("City list", response, res.statusCode));
    } catch (error) {
        console.error("error in City", error);
        res.status(500).json(errorResponse("error in City list", res.statusCode));
    }
});


router.get("/Cityinfobyid", async (req, res) => {
    try {
        const CityId: any = req.query.CityId;
        const controller = new CityController();
        const response: any = await controller.getCityInfoById(CityId);
        res.status(200).json(successResponse("getCity", response, res.statusCode));
    } catch (error) {
        console.error("error in getCity", error);
        res.status(500).json(errorResponse("error in getCity", res.statusCode));
    }
});


router.get("/deleteCity/:id", async (req, res) => {
    try {
        const CityId = req.params.id;
        const controller = new CityController();
        const response: ICity = await controller.deleteCity(CityId);
        res.status(200).json(successResponse("deleteCity", response, res.statusCode));

    } catch (error) {
        console.error("error in deleteCity", error);
        res.status(500).json(errorResponse("error in deleteCity", res.statusCode));
    }
})
//Agent
router.post("/createState", async (req, res) => {
    try {
        const body = req.body;
        const controller = new StateController();
        const response = await controller.createState(body);
        res.status(200).json(successResponse("create State", response, res.statusCode));
    } catch (error) {
        console.error("error in State", error);
        res.status(500).json(errorResponse("error in create State", res.statusCode));
    }
});
router.patch("/State/:id", async (req, res) => {
    try {
        const StateId = req.params.id;
        const body = req.body as IState;
        const controller = new StateController();
        const response: IState = await controller.editState(body, StateId);
        res.status(200).json(successResponse("edit State", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit State", res.statusCode));
    }
});

router.get("/StateList", async (req, res) => {
    try {
        const controller = new StateController();
        const response: IState[] = await controller.getStateList();
        res.status(200).json(successResponse("State list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in State list", res.statusCode));
    }
});


router.get("/StateInfobyid", async (req, res) => {
    try {
        const StateId = req.query.id;
        const controller = new StateController();
        const response: IState = await controller.getStateInfoById(StateId);
        res.status(200).json(successResponse("get State", response, res.statusCode));
    } catch (error) {
        console.error("error in State", error);
        res.status(500).json(errorResponse("error in get State", res.statusCode));
    }
});


router.get("/deleteState/:id", async (req, res) => {
    try {
        const StateId = req.params.id;
        const controller = new StateController();
        const response: IState = await controller.deleteState(StateId);
        res.status(200).json(successResponse("delete State", response, res.statusCode));

    } catch (error) {
        console.error("error in delete State", error);
        res.status(500).json(errorResponse("error in delete State", res.statusCode));
    }
})




/////////////////////////////////////////STAR PERFORMER////////////////////////

router.post("/createStarPerformer", async (req, res) => {
    try {
        const body = req.body;
        console.log("req.body",req.body);
        
        const controller = new StarPerformerController();
        const response = await controller.createStarPerformer(body);
        res.status(200).json(successResponse("create StarPerformer", response, res.statusCode));
    } catch (error) {
        console.error("error in StarPerformer", error);
        res.status(500).json(errorResponse("error in create StarPerformer", res.statusCode));
    }
});
router.patch("/StarPerformer/:id", async (req, res) => {
    try {
        const StarPerformerId = req.params.id;
        const body = req.body as any;
        const controller = new StarPerformerController();
        const response: any = await controller.editStarPerformer(body, StarPerformerId);
        res.status(200).json(successResponse("edit StarPerformer", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit StarPerformer", res.statusCode));
    }
});

router.get("/StarPerformerList", async (req, res) => {
    try {
        const controller = new StarPerformerController();
        const response: any[] = await controller.getStarPerformerList();
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});
router.get("/searchStarPerformer", async (req, res) => {
    try {
const searchValue=req.query.searchValue;
        const controller = new StarPerformerController();
        const response: any[] = await controller.searchStarPerformer(searchValue);
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});

router.get("/StarPerformerInfobyid", async (req, res) => {
    try {
        const StarPerformerId:any = req.query.id;
        const controller = new StarPerformerController();
        const response: any = await controller.getStarPerformerInfoById(StarPerformerId);
        res.status(200).json(successResponse("get StarPerformer", response, res.statusCode));
    } catch (error) {
        console.error("error in StarPerformer", error);
        res.status(500).json(errorResponse("error in get StarPerformer", res.statusCode));
    }
});


router.patch("/deleteStarPerformer", async (req, res) => {
    try {
        const StarPerformerId:any = req.body.StarPerformerId;
        const controller = new StarPerformerController();
        const response: any = await controller.deleteStarPerformer(StarPerformerId);
        res.status(200).json(successResponse("delete StarPerformer", response, res.statusCode));

    } catch (error) {
        console.error("error in delete StarPerformer", error);
        res.status(500).json(errorResponse("error in delete StarPerformer", res.statusCode));
    }
})

router.post("/createStarPerformerThought", async (req, res) => {
    try {
        const body = req.body;
        const controller = new StarPerformerController();
        const response = await controller.createStarPerformerThought(body);
        res.status(200).json(successResponse("create StarPerformer", response, res.statusCode));
    } catch (error) {
        console.error("error in StarPerformer", error);
        res.status(500).json(errorResponse("error in create StarPerformer", res.statusCode));
    }
});
router.patch("/editPerformerThought", async (req, res) => {
    try {
        
        const body = req.body as any;
        const controller = new StarPerformerController();
        const response: any = await controller.editStarPerformerThought(body);
        res.status(200).json(successResponse("edit StarPerformer", response, res.statusCode));
    } catch (error) {
        console.error("error in StarPerformer", error);
        res.status(500).json(errorResponse("error in edit StarPerformer", res.statusCode));
    }
});

router.get("/getStarPerformerListThought", async (req, res) => {
    try {
        const controller = new StarPerformerController();
        const response: any[] = await controller.getStarPerformerListThought();
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {
        console.error("error in getStarPerformerListThought", error);
        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});


router.get("/getStarPerformerThoughtById", async (req, res) => {
    try {
        const StarPerformerId:any = req.query.StarPerformerId;
        const controller = new StarPerformerController();
        const response: any = await controller.getStarPerformerThoughtById(StarPerformerId);
        res.status(200).json(successResponse("get StarPerformer", response, res.statusCode));
    } catch (error) {
        console.error("error in StarPerformer", error);
        res.status(500).json(errorResponse("error in get StarPerformer", res.statusCode));
    }
});


router.patch("/deleteStarPerformer", async (req, res) => {
    try {
        const StarPerformerId = req.body.StarPerformerId;
        const controller = new StarPerformerController();
        const response: any = await controller.deleteStarPerformerThought(StarPerformerId);
        res.status(200).json(successResponse("delete StarPerformer", response, res.statusCode));

    } catch (error) {
        console.error("error in deleteStarPerformerThought", error);
        res.status(500).json(errorResponse("error in deleteStarPerformerThought", res.statusCode));
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/logineventPartner", async (req, res) => {
    try {
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.logineventPartner(body);
        res.status(200).json(successResponse("logineventPartner", response, res.statusCode));
    } catch (error) {
        console.error("error in logineventPartner", error);
        res.status(500).json(errorResponse("error in logineventPartner", res.statusCode));
    }
});



router.patch("/eventPartnerActivate", async (req, res) => {
    try {
        const eventPartnerId = req.body.eventPartnerId;
        const status = req.body.status;
        const ownerId = req.body.ownerId;

        const planId = req.body.planId;

        const controller = new eventPartnerController();
        const response: IPartner = await controller.eventPartnerActivate(status, ownerId, planId, eventPartnerId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/geteventPartnerAdminPannel", async (req, res) => {
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
        const controller = new eventPartnerController();
        const response: any = await controller.geteventPartnerAdminPannel(latitude, longitude, area, status,
            categoryId, stateId, cityId, limit, skip, search);
        res.status(200).json(successResponse("shop list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in shop list", res.statusCode));
    }
});




router.get("/eventpartnerInfoById", async (req, res) => {
    try {
        const partnerId: any = req.query.partnerId;
        const controller = new eventPartnerController();
        const response: any = await controller.geteventPartnerInfoById(partnerId);
        res.status(200).json(successResponse("get shop", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in get shop", res.statusCode));
    }
});


router.get("/deleteShop/:id", async (req, res) => {
    try {
        const shopId = req.params.id;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.deleteeventPartner(shopId);
        res.status(200).json(successResponse("delete shop", response, res.statusCode));

    } catch (error) {
        console.error("error in delete shop", error);
        res.status(500).json(errorResponse("error in delete shop", res.statusCode));
    }
})







export default router;
