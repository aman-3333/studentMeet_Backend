import {Document, model, Schema,} from "mongoose";
import { ObjectId } from 'bson';

const academySportsModel = new Schema(
  {
    academyName:  { type: String },
    sportsName:{ type:Schema.Types.ObjectId, ref: "sport" },
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

 

export interface IAcademySports extends Document {
    academyName: String,
    sportsName:ObjectId,
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

// const academy =model("academy", academySportsModel);
export default model<IAcademySports>("academy_sport", academySportsModel);

// module.exports = academy;
