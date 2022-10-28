


import userActivity from "../models/userActivity";


import userModel from "../models/userDetails";
import FuzzySearch from 'fuzzy-search';
// var ObjectId = require('mongodb').ObjectId;
import Chat from "../models/chatModel";
import Message from "../models/messageModel";



export default class ChatController {
     // TODO  GEt ALL USER................................
    public async getAllUser(id: any, searchValue: any, senderId: any) {
        console.log("get all user");
        try {
            let allData: any = await userModel.find({ _id: { $ne: senderId } })
            console.log("allData",allData);
            
            if (searchValue) {
                const searcher = new FuzzySearch(
                    allData,
                    ["fullname"],
                    {
                        caseSensitive: false,
                    }
                );
                allData = searcher.search(searchValue);
            }

            return allData;
        }
        catch (error) {
            return error
        }
    }

    // TODO ACCESS CHAT................................

    public async acceptChat(chatId:any){
        let userInfo:any=await Chat.findByIdAndUpdate({_id:chatId},{$set:{isAlreadyFriend:true}})
        return userInfo
    }
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

            isChat = await userModel.populate(isChat, {
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
                // .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results: any) => {
                    results = await userModel.populate(results, {
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
                        .populate("sender")
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
                    message = await userModel.populate(message, {
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
                  
                //   var users = JSON.parse(users);
                //   var users=  JSON.parse(JSON.stringify(users))
                
                  console.log("users")
                  console.log(users,"users")
                  if (users.length < 1) {
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

public async blockperson(userId:any,blockId:any,chatId:any,status:any){
    let userInfo:any;
    if(status=="block"){
        userInfo=await Chat.findOneAndDelete({_id:chatId})
await userActivity.findOneAndUpdate({
    userId:userId
},{
    $push:{
        blockList:blockId
    }
})
await userActivity.findOneAndUpdate({
    userId:blockId
},{
    $push:{
        blockbyOther:userId
    }
})

}
if(status=="unblock"){
    userInfo=await Chat.findOneAndUpdate({chatId:chatId},{
        $push:{
           users:{$in:userId}
        }
    })
    await userActivity.findOneAndUpdate({
        userId:userId
    },{
        $pull:{
            blockList:blockId
        }
    })
    await userActivity.findOneAndUpdate({
        userId:blockId
    },{
        $pull:{
            blockbyOther:userId
        }
    })
    


}
}
public async leavegroup(userId:any,adminId:any,groupId:any){
    let userInfo:any;
    // if(adminId){
    //     userInfo =await Chat.find({_id:groupId
    //     },{
    //         $pull:{
    //             users:{$in:userId}
    //         }
    //     })
    // }
    userInfo =await Chat.findOneAndUpdate({_id:groupId
    },{
        $pull:{
            users:{$in:userId}
        }
    })
return userInfo

}

public async sendFriendRequest(sernderId:any,userId:any){

}

public async acceptFriendRequest(sernderId:any,userId:any){
    let userInfo:any=await Chat.findOne({})

}

public async rejectFriendRequest(userId:any,senderId:any){
    let userInfo:any=await userActivity.findByIdAndUpdate({userId:senderId},{
        $push:{
            rejectFriendRequest:senderId
        }
    })

    await userActivity.findByIdAndUpdate({userId:userId},{
        $push:{
            friendRequestRejectbyOther:senderId
        }
    })


    return userInfo

}





}











