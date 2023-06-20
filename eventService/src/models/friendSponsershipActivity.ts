import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const friendSponsershipactivitySchema = new Schema( 
  {
    userId:{type:Schema.Types.ObjectId,ref:"userdetail"},
   friendActivity:[{
    friendId:{type:Schema.Types.ObjectId,ref:"userdetail"},
    SponsershipId:{type:Schema.Types.ObjectId,ref:"Sponsership"},
    Activity:{type:String}
   }]
  },
  {
    timestamps: true,
  }
);

export interface IFriendSponsershipActivity extends Document {
        userId:ObjectId,
       friendActivity:[{
        friendId:ObjectId,
        SponsershipId:ObjectId,
        Activity:String
       }]
      
}
// user

export default model<IFriendSponsershipActivity>("friendSponsershipactivity", friendSponsershipactivitySchema);
