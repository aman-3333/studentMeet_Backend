import {Document, model, Schema,} from "mongoose";
import { ObjectId } from 'bson';

const AchivementSchema = new Schema(
  {
    user_id: { type:Schema.Types.ObjectId, ref: "userdetails" },
    academyId: { type:Schema.Types.ObjectId, ref: "academy" },
    achievements: [{
        achievements: { type: String },
        picture: [{ type: String }],
        description: { type: String },
        location:{ type: String },
        user_id: { type:Schema.Types.ObjectId, ref: "userdetails" },
        city: { type:Schema.Types.ObjectId, ref: "city" },
        state: { type:Schema.Types.ObjectId, ref: "state" },
        country: { type:Schema.Types.ObjectId, ref: "country" },
      tournament:{ type: String }
    }],
    isActive:{type:Boolean,default:true},
    isBlocked:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},

  },
  { timestamps: true }
);



export interface IAchivement extends Document {
  
    user_id: ObjectId,
    academyId: ObjectId,
    achievements: [{
        achievements: String,
        picture: [String],
        description: String,
        location:String,
        user_id: ObjectId,
        tournament:String
    }],
    isActive:Boolean,
    isBlocked:Boolean,
    isDeleted:Boolean,

  
}


export default model<IAchivement>("achivement", AchivementSchema);


