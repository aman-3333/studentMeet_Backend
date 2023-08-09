import {Document, model, Schema,} from "mongoose";
import { ObjectId } from 'bson';

const AchivementSchema = new Schema(
  {
    user_id: { type:Schema.Types.ObjectId, ref: "userdetails" },
    academy_id: { type:Schema.Types.ObjectId, ref: "userdetails" },
    achievements: [{
        achievements: { type: String },
        picture: [{ type: String }],
        description: { type: String },
        location:{ type: String },
        user_id: { type:Schema.Types.ObjectId, ref: "userdetails" },
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
    academy_id: ObjectId,
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


