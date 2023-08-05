import {Document, model, Schema} from "mongoose";
import { ObjectID } from 'bson';

const chatModel = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type:Schema.Types.ObjectId, ref: 'userdetail' }],
    latestMessage: {
      type:Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type:Schema.Types.ObjectId, ref: "userdetails" },
    isAlreadyFriend:{type:Boolean,default:false},
    friendList:[{ type:Schema.Types.ObjectId, ref: 'userdetail' }],
    rejectFriendRequest:[{ type:Schema.Types.ObjectId, ref: 'userdetail' }],
    blockList:[{ type:Schema.Types.ObjectId, ref: 'userdetail' }],
    isBlocked:{type:Boolean,default:false},
  },
  { timestamps: true }
);



export interface Chat extends Document {
  chatName: string;
  isGroupChat: Boolean;
  isAlreadyFriend: Boolean;
  isBlocked: Boolean;
  blockList:[ObjectID];
  friendList:[ObjectID],
  rejectFriendRequest:[ObjectID],
  userdetail: string[] ;
  latestMessage:string[] ;
  groupAdmin:ObjectID;
}

// const Chat =model("Chat", chatModel);
export default model("Chat", chatModel);

// module.exports = Chat;
