import {Document, model, Schema,} from "mongoose";
import { ObjectId } from 'bson';

const AcademyTypSchema = new Schema(
  {
    user_id: { type:Schema.Types.ObjectId, ref: "userdetails" },
    academySubTypeName: { type: String,index:true},
    academyTypeId: { type:Schema.Types.ObjectId, ref: "academyType" },
    isActive:{type:Boolean,default:true},
    isBlocked:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},

  },
  { timestamps: true }
);



export interface IAcademySubType extends Document {
  
    user_id: ObjectId,
    academySubTypeName: String,
    academyTypeId: ObjectId,
    isActive:Boolean,
    isBlocked:Boolean,
    isDeleted:Boolean,

  
}


export default model<IAcademySubType>("AcademySubType", AcademyTypSchema);


