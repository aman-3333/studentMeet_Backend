import {Document, model,ObjectId, Schema} from "mongoose";
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
 academyLikeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    
   academyCommentCount: { type: Number, default: 0 },
   academyFavouriteCount: { type: Number, default: 0 },
   academyLike: [{
        type: Schema.Types.ObjectId, ref: "userdetails",
        
    }],
   academyFavourite: [{
        type: Schema.Types.ObjectId, ref: "userdetails",
        
    }],
   academyComment: [{
        userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        comment: { type: String },
        dateTime: { type: Date },
      
    }],
    sharePost: [{
      academy: { type: Schema.Types.ObjectId, ref: "posts" },
       userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        dateTime: { type: Date },
    }],
    
    isDeleted:{type:Boolean,default:false},

  },
  { timestamps: true }
);

 

export interface IAcademy extends Document {
  academyName: String,
    fullAddress: String,
    schoolId: ObjectId,
    instituteId: ObjectId,
    city: ObjectId,
    state: ObjectId,
    sports: [{
      sports:ObjectId,
      coachId: ObjectId,
      secoudryCoachId: [ObjectId],
      feesPerMonth: Number,
      feesPerYear: Number,
      feesDiscount: Number,
      feesDiscountLastDate: Number,
      description: String,
      achievements: String,
      picture: [String],
      isActive:Boolean,
      isBlocked:{type:Boolean,default:false},
  }],
 academyLikeCount: Number,
    shareCount: Number,
    
   academyCommentCount: Number,
   academyFavouriteCount: Number,
   academyLike: [ObjectId],
   academyFavourite: [ObjectId],
   academyComment: [{
        userId:ObjectId,
        comment: String,
        dateTime: Date,
      
    }],
    sharePost: [{
      academy: ObjectId,
       userId: ObjectId,
        friendId: ObjectId,
        dateTime: Date,
    }],
    isDeleted:Boolean,
}

// const academy =model("academy", academyModel);
export default model<IAcademy>("academy", academyModel);

// module.exports = academy;
