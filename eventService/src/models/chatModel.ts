import {Document, model, Schema} from "mongoose";
import { ObjectID } from 'bson';

const chatModel = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type:Schema.Types.ObjectId, ref: 'Users' }],
    latestMessage: {
      type:Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type:Schema.Types.ObjectId, ref: "Users" },
    isAlreadyFriend:{type:Boolean,default:false}
  },
  { timestamps: true }
);



export interface Chat extends Document {
  chatName: string;
  isGroupChat: Boolean;
  isAlreadyFriend: Boolean;
  users: string[] ;
  latestMessage:string[] ;
  groupAdmin:ObjectID;
}

// const Chat =model("Chat", chatModel);
export default model("Chat", chatModel);

// module.exports = Chat;
