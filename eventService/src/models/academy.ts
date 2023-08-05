import {Document, model, Schema} from "mongoose";
import { ObjectID } from 'bson';

const academyModel = new Schema(
  {
    academyName: { type: String, index:true},
    fullAddress: { type: String },
    schoolId: { type:Schema.Types.ObjectId, ref: "school" },
    instituteId: { type:Schema.Types.ObjectId, ref: "institute" },
    city: { type:Schema.Types.ObjectId, ref: "city" },
    state: { type:Schema.Types.ObjectId, ref: "state" },
    sports: [{
      sports:{ type:Schema.Types.ObjectId, ref: "sport" },
      coachId: { type:Schema.Types.ObjectId, ref: "userdetails" },
      secoudryCoachId: [{ type:Schema.Types.ObjectId, ref: "userdetails" }],
      feesPerMonth: { type: Number },
      feesPerYear: { type: Number },
      feesDiscount: { type: Number },
      feesDiscountLastDate: { type: Number },
      description: { type: String },
      achievements: { type: String },
      picture: [{ type: String }],
      isActive:{type:Boolean,default:true},
      isBlocked:{type:Boolean,default:false},
  }],
   
    
    isDeleted:{type:Boolean,default:false},

  },
  { timestamps: true }
);

 

export interface IAcademy extends Document {
   academyName: String,
    fullAddress: String,
    schoolId: ObjectID,
    instituteId: ObjectID,
    coachId:ObjectID,
    secoudryCoachId: [ObjectID],
    city: ObjectID,
    state: ObjectID,
    sports: ObjectID,
    description: String,
    feesPerMonth: Number,
    feesPerYear: Number,
    feesDiscount: Number,
    feesDiscountLastDate: Number,
    achievements: String,
    picture: [String],
   isActive:Boolean,
    isBlocked:Boolean,
    isDeleted:Boolean,
}

// const academy =model("academy", academyModel);
export default model<IAcademy>("academy", academyModel);

// module.exports = academy;
