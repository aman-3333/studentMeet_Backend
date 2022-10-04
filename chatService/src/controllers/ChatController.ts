//npm libraries
import * as jwt from "jsonwebtoken";
import moment, { now } from "moment";
import async, { nextTick } from "async";
import bcrypt from "bcryptjs";
import mongoose, { ObjectId } from "mongoose";
//Edneed objects
import Users, { IUser } from "../models/Users";
import institute from "../models/institute.model";
import Userrole from "../models/userrole.model";

import * as constants from "../utils/Constants";
import nconf from "nconf";
import { mailer } from "../services/mailer";
import userrole from "../models/Users";
import FuzzySearch from 'fuzzy-search';
// var ObjectId = require('mongodb').ObjectId;
import Chat from "../models/chatModel";
import Message from "../models/messageModel";



export default class ChatController {


     // TODO  GEt ALL USER................................
    public async getAllUser(id: any, search: any, senderId: any) {
        console.log("get all user");
        try {
            let allData: any = await userrole.find({ institute: id }, {
                fullname: 1, email: 1, institute: 1
            }).find({ _id: { $ne: senderId } });
            if (search) {
                const searcher = new FuzzySearch(
                    allData,
                    ["fullname", "email", "institute"],
                    {
                        caseSensitive: false,
                    }
                );
                allData = searcher.search(search);
            }

            return allData;
        }
        catch (error) {
            return error
        }


    }

    // TODO ACCESS CHAT................................

    public async accessChat(userId: any, senderId: any) {
        console.log("access chat")
        try {
            if (!userId) {
                //   console.log("UserId param not sent with request");
                return ("UserId param not sent with request");
            }
            var isChat = await Chat.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: senderId } } },
                    { users: { $elemMatch: { $eq: userId } } },
                ],
            })
                .populate("users", "-password")
                .populate("latestMessage");
            console.log("is Chat 1", isChat, "\n")

            isChat = await userrole.populate(isChat, {
                path: "latestMessage.sender",
                select: "users",
            });
            //  res.send(isChat)
            console.log("isChat is 2:", isChat, "\n")

            if (isChat.length > 0) {
                // res.send(isChat[0]);
                return (isChat[0]);
            }
            else {
                var chatData: any = {
                    chatName: "sender",
                    isGroupChat: false,
                    users: [],
                };
                chatData.users.push(senderId);
                chatData.users.push(userId);
                console.log("chat-data", chatData)

                // !todo 
                const createdChat = await Chat.create(chatData);
                console.log("createdChat", createdChat, "\n")
                const FullChat = await Chat.findOne({ _id: createdChat._id })
               /*  .populate(
                    "users", "-password"
                ); */
                console.log("fullCHat", FullChat, "\n")
                //   res.status(200).json(FullChat);
                return FullChat;
            }
        }
        catch (error) {
            return error
        }
    }


    // TODO Fetch chat.....................................................
    public async fetchChat(senderId: any) {
        console.log("fetch chat")
        try {
            const data = await Chat.find({ users: { $elemMatch: { $eq: senderId } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results: any) => {
                    results = await userrole.populate(results, {
                        path: "latestMessage.sender",
                        select: "fullname  email",
                    });
                    console.log("results", results)
                    // res.status(200).send(results);
                    return results;
                });
            return data;
        } catch (error: any) {
            // res.status(400);
            // throw new Error(error.message);
            return error;
        }
    }


    // TODO   TO GET ALL MESSAGE...................
                public async getALlMessage(chatId:any){
                    console.log("get all message",chatId);
                    try{
                        const messages = await Message.find({ chat:chatId })
                        .populate("sender", "fullname email")
                        .populate("chat");
                        return messages;
                    }
                    catch(error){
                        return error;
                    }
                }
// TODO   SEND MESSAGE .................................

            public async sendMessage(Id:any,content:any,chatId:any){
                console.log("send message")
                if (!content || !chatId) {
                    console.log("Invalid data passed into request");
                  return ("invalid data passed !chat or !content")
                  }
                
                  var newMessage = {
                    sender: Id,
                    content: content,
                    chat: chatId,
                  };
              
                    let message = await Message.create(newMessage);
                     message = await  message.populate("sender").execPopulate()
                    message = await message.populate("chat").execPopulate()
                    message = await userrole.populate(message, {
                      path: "chat.users",
                      select: "fullname pic email",
                    });
                    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
                    return message;
            }

// TODO    Create-Group-Chat....................................................


            public async createGroupChat(senderId:any,users:any,name:any){
                console.log("senderId",senderId,"users",users,"name",name);
                try{
                if (!users || !name) {
                    return  "Please Fill all the feilds";
                  }
                  console.log("users")
                  
                  var users = JSON.parse(users);
                //   var users=  JSON.parse(JSON.stringify(users))
                
                  console.log("users")
                  console.log(users,"users")
                  if (users.length < 2) {
                      return "More than 2 users are required to form a group chat"
                  }
                  users.push(senderId);
                  const groupChat = await Chat.create({
                    chatName:name,
                    users: users,
                    isGroupChat: true,
                    groupAdmin:senderId,
                  });
                  console.log(groupChat,"group Chat is:")
                  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
                    .populate("users", "-password")
                    .populate("groupAdmin", "-password");
                    return fullGroupChat;
                }
                catch(error){
                    return error;
                }
            }
}












