import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const friendactivitySchema = new Schema( 
  {
    userId:{type:Schema.Types.ObjectId,ref:"userdetail"},
   friendActivity:[{
    friendId:{type:Schema.Types.ObjectId,ref:"userdetail"},
    postId:{type:Schema.Types.ObjectId,ref:"post"},
    Activity:{type:String},
    dateTime:{type:Date}
   }]
  },
  {
    timestamps: true,
  }
);

export interface IFriendActivity extends Document {
        userId:ObjectId,
       friendActivity:[{
        friendId:ObjectId,
        postId:ObjectId,
        Activity:String,
        dateTime:Date
       }]
      
}
// user

export default model<IFriendActivity>("friendactivity", friendactivitySchema);