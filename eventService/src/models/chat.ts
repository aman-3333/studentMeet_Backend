import {Document, model, Schema} from "mongoose";
import { ObjectID } from 'bson';

const chatModel = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type:Schema.Types.ObjectId, ref: 'userDetails' }],
    latestMessage: {
      type:Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type:Schema.Types.ObjectId, ref: "userDetails" },
    isAlreadyFriend:{type:Boolean,default:false},
    friendList:[{ type:Schema.Types.ObjectId, ref: 'userDetails' }],
    rejectFriendRequest:[{ type:Schema.Types.ObjectId, ref: 'userDetails' }],
    blockList:[{ type:Schema.Types.ObjectId, ref: 'userDetails' }],
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
  userDetails: string[] ;
  latestMessage:string[] ;
  groupAdmin:ObjectID;
}

// const Chat =model("Chat", chatModel);
export default model("Chat", chatModel);

// module.exports = Chat;
