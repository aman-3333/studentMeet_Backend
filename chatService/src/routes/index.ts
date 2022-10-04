import express from "express";
import ChatController from "../controllers/ChatController";
// import { ILogin, IOtp } from "../models/Interfaces";

// import { getServerError, getGuid } from "../utils/Functions";
// import async from "async";
// import bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";
// // import { IUser } from "../models/Users";
// import nconf from "nconf";
// import { ObjectId } from "mongodb";
// !todo
import Users, { IUser } from "../models/Users";

import  userrole from "../models/Users";
import Chat from "../models/chatModel";

import Message from "../models/messageModel"

import { MongoClient, ObjectID } from 'mongodb';
import  FuzzySearch  from 'fuzzy-search';
import { createCipheriv } from "crypto";

const router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;

//Todo......... 1st   get User
router.get("/searchUser/:institute/:senderId", async (req, res) => {
    try {
        const id:any=req.params.institute;
        let search:any = req.query.search;
        let senderId:any=req.params.senderId;
        console.log(search,senderId)
        const controller = new ChatController();
        const response = await controller.getAllUser(id,search,senderId);
        console.log(response, "response")
        return res.send(response);
    } catch (error) {
        console.error("error in /createFeeStructure", error);
        return res.send(error);
    }
});

// TODO........ 2nd   access Chat

router.post("/accessChat/:Id",async(req:any,res:any)=>{
    try {
        const senderId:any=req.params.Id;
    // const { userId,senderId } = req.body;
    const { userId}:any = req.body;
        const controller = new ChatController();
        const response = await controller.accessChat(userId,senderId);
        console.log(response, "response")
        return res.send(response);
    } catch (error) {
        console.error("error in /createFeeStructure", error);
        return res.send(error);
    }
})


// TODO........ 3rd  fetch Chat

router.get("/fetchChat/:Id",async(req:any,res:any)=>{
    try {
        let senderId=req.params.Id;

        const controller = new ChatController();
        const response = await controller.fetchChat(senderId);
        console.log(response, "response")
        return res.send(response);
    } catch (error) {
        console.error("error in /createFeeStructure", error);
        return res.send(error);
    }
})

// TODO  4th  get All Messages

router.get("/getAllMessage/:chatId",async(req,res)=>{
try {
    let chatId=req.params.chatId ;

    const controller = new ChatController();
    const response = await controller.getALlMessage(chatId);
    console.log(response, "response")
    return res.send(response);
} catch (error) {
    console.error("error in /createFeeStructure", error);
    return res.send(error);
}
});


// TODO 5th send Message...........................

router.post("/sendMessage/:Id",async(req,res)=>{
    try {
        let Id:any=req.params.Id ;
        const { content, chatId }:any = req.body;
        const controller = new ChatController();
        const response = await controller.sendMessage(Id,content,chatId);
        console.log(response, "response")
        return res.send(response);
    } catch (error) {
        console.error("error in /createFeeStructure", error);
        return res.send(error);
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
        return res.send(response);
    }
    catch(error){
        return res.send(error);
    }
})

// //todo 



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



export default router;
