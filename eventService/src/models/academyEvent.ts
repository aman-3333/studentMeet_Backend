import {Document, model, Schema,} from "mongoose";
import { ObjectId } from 'bson';

const AcademyEventModel = new Schema(
  {
    academyName:  { type: String },
    sportsName:{ type: String },
    academy_id:{ type:Schema.Types.ObjectId, ref: "sport" },
    sports_id:{ type:Schema.Types.ObjectId, ref: "sport" },
    coachId: { type:Schema.Types.ObjectId, ref: "userdetails" },
    secoudryCoachId: [{ type:Schema.Types.ObjectId, ref: "userdetails" }],
    achievements_id: [{ type:Schema.Types.ObjectId, ref: "userdetails" }],
    feesPerMonth: { type: Number },
    feesPerYear: { type: Number },
    feesDiscount: { type: Number },
    feesDiscountLastDate: { type: Number },
    description: { type: String },
    achievements: { type: String },
    picture: [{ type: String }],
    isActive:{type:Boolean,default:true},
    isBlocked:{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},

  },
  { timestamps: true }
);

 

export interface IAcademyEvent extends Document {
    academyName: String,
    sportsName:String ,
    academy_id:ObjectId,
    sports_id:ObjectId,
    coachId: ObjectId,
    secoudryCoachId: [ObjectId],
    achievements_id: [ObjectId],
      feesPerMonth: Number,
      feesPerYear: Number,
      feesDiscount: Number,
      feesDiscountLastDate: Number,
      description: String,
      achievements: String,
      picture: [String],
      isActive:Boolean,
      isBlocked:Boolean,
    isDeleted:Boolean,
}

// const academy =model("academy", AcademyEventModel);
export default model<IAcademyEvent>("academy_event", AcademyEventModel);

// module.exports = academy;
