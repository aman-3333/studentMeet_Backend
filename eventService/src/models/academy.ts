import {Document, model,ObjectId, Schema} from "mongoose";
import { ObjectID } from 'bson';

const academyModel = new Schema(
  {
    academyName: { type: String, index:true},
    fullAddress: { type: String },
    schoolId: { type:Schema.Types.ObjectId, ref: "school" },
    lat:{ type: String },
    long:{ type: String },
    academyTypeId:{ type:Schema.Types.ObjectId, ref: "academyType" },
    academySubTypeId:{ type:Schema.Types.ObjectId, ref: "academySubType" },
   country: { type:Schema.Types.ObjectId, ref: "country" },
    city: { type:Schema.Types.ObjectId, ref: "city" },
    state: { type:Schema.Types.ObjectId, ref: "State" },
    instituteId: { type:Schema.Types.ObjectId, ref: "institute" },
    profile_picture:{ type: String },
    banner_image:[{ type: String }],
    sportsName:{ type: String },
 
      session:{ type: String },
      Morning:{ type: String },
      Evening:{ type: String },
      workingDays:{ type: String },
       
    contact_no: [{ type: Number }],
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
    
    followers:[{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    followersCount: { type: Number, default: 0 },
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
    lat:String,
    long:String,
    academyTypeId:ObjectId,
    academySubTypeId:ObjectId,
    schoolId: ObjectId,
    instituteId: ObjectId,
    city: ObjectId,
    state: ObjectId,
    profile_picture:String,
    banner_image:[String],
    followers:[{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    followersCount: { type: Number, default: 0 },

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
    sportsName:String ,
   
      session:String,
      Morning:String,
      Evening:String,
      workingDays:String,
       
          contact_no: [Number],
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

// const academy =model("academy", academyModel);
export default model<IAcademy>("academy", academyModel);

// module.exports = academy;
