import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";

import ChatController from "../controllers/ChatController";
import Message from "../models/messageModel"
import userrole from "../models/userDetails"
import Chat from "../models/chat";

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
router.get("/getFriendRequest", async (req, res) => {
    try {
       
        let userId:any=req.query.userId;
       
        const controller = new ChatController();
        const response = await controller.getFriendRequest(userId);
        res.status(200).json(successResponse("getFriendRequest",response,res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in getFriendRequest", res.statusCode));
    }
});

router.get("/getallfriend", async (req, res) => {
    try {
     
       
        let user:any=req.query.user;
       
        const controller = new ChatController();
        const response = await controller.getFriend(user);
        res.status(200).json(successResponse("getAllFriend",response,res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in getAllFriend", res.statusCode));
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
    
        res.status(500).json(errorResponse("error in accessChat", res.statusCode));
    }
})
router.post("/sendFriendRequest",async(req:any,res:any)=>{
    try {
        const senderId =req.body.senderId;
    // const { userId,senderId } = req.body;
    const  userId = req.body.userId;
        const controller = new ChatController();
        const response = await controller.sendFriendRequest(senderId,userId);
        res.status(200).json(successResponse("sendFriendRequest",response,res.statusCode));
    }catch(error) {
    
        res.status(500).json(errorResponse("error in sendFriendRequest", res.statusCode));
    }
})
router.post("/cancelSendRequest",async(req:any,res:any)=>{
    try {
        const senderId =req.body.senderId;
    // const { userId,senderId } = req.body;
    const  userId = req.body.userId;
        const controller = new ChatController();
        const response = await controller.cancelSendFriendRequest(senderId,userId);
        res.status(200).json(successResponse("cancelSendRequest",response,res.statusCode));
    }catch(error) {

        res.status(500).json(errorResponse("error in cancelSendRequest", res.statusCode));
    }
})
router.post("/acceptRequest",async(req:any,res:any)=>{
    try {
        const friendId =req.body.friendId;
    // const { userId,friendId } = req.body;
    const  userId = req.body.userId;
        const controller = new ChatController();
        const response = await controller.acceptFriendRequest(friendId,userId);
        res.status(200).json(successResponse("acceptRequest",response,res.statusCode));
    }catch(error) {

        res.status(500).json(errorResponse("error in acceptRequest", res.statusCode));
    }
})
router.post("/rejectRequest",async(req:any,res:any)=>{
    try {
        const friendId =req.body.friendId;
    // const { userId,friendId } = req.body;
    const  userId = req.body.userId;
        const controller = new ChatController();
        const response = await controller.rejectFriendRequest(friendId,userId);
        res.status(200).json(successResponse("rejectRequest",response,res.statusCode));
    }catch(error) {

        res.status(500).json(errorResponse("error in rejectRequest", res.statusCode));
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
      
        res.status(500).json(errorResponse("error in sendMessage", res.statusCode));
    }
})


router.post("/blockpersonActivity",async(req,res)=>{
    try {
       const userId=req.body.userId;
       const blockId=req.body.blockId;
       const chatId=req.body.chatId;
       const status=req.body.status;
        const controller = new ChatController();
        const response = await controller.blockperson(userId,blockId,chatId,status);
        res.status(200).json(successResponse("sendMessage",response,res.statusCode));
    }catch(error) {
   
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
  
        res.status(500).json(errorResponse("error in leavegroup", res.statusCode));
    }
})

// !todo   7th  send message
router.post("/sendMessage/:Id",async(req,res)=>{
    try {
    const { content, chatId } = req.body;
   
    const SenderId=req.params.Id;
  
    // console.log(req.body)
    if (!content || !chatId) {
      
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
       
        res.send(data)
    }
    catch(e){
        res.send(e)
    }
})


export default router;