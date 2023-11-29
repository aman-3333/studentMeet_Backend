import {Document, model, Schema,} from "mongoose";
import { ObjectId } from 'bson';

const AcademyTypSchema = new Schema(
  {
    user_id: { type:Schema.Types.ObjectId, ref: "userdetails" },
    academyTypeName: { type: String,index:true}, 
    isActive:{type:Boolean,default:true},
    isBlocked:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},

  },
  { timestamps: true }
);



export interface IAcademyType extends Document {
  
    user_id: ObjectId,
    academyTypeName: String,
   
    isActive:Boolean,
    isBlocked:Boolean,
    isDeleted:Boolean,

  
}


export default model<IAcademyType>("academyType", AcademyTypSchema);


