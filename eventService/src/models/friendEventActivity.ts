import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const friendeventactivitySchema = new Schema( 
  {
    userId:{type:Schema.Types.ObjectId,ref:"userdetail"},
   friendActivity:[{
    friendId:{type:Schema.Types.ObjectId,ref:"userdetail"},
    eventId:{type:Schema.Types.ObjectId,ref:"event"},
    Activity:{type:String}
   }]
  },
  {
    timestamps: true,
  }
);

export interface IFriendEventActivity extends Document {
        userId:ObjectId,
       friendActivity:[{
        friendId:ObjectId,
        eventId:ObjectId,
        Activity:String
       }]
      
}
// user

export default model<IFriendEventActivity>("friendeventactivity", friendeventactivitySchema);
