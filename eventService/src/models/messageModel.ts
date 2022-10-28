import {Document, model, Schema,ObjectId} from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "userdetail" },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    fromDelete: {type:Boolean,default:false},
    toDelete: {type:Boolean,default:false}
  },
  { timestamps: true }
);



export default model("Message", messageSchema);
// const Message = mongoose.model("Message", messageSchema);
// module.exports = Message;
