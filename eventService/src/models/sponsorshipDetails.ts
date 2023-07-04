import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const sponsorshipSchema = new Schema(
  {  
    organizerId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    suborganizerId: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
  sponsorshipFormId: [ {type: Schema.Types.ObjectId, ref: "sponsorPartner" }],
  sponsorshipPartnerId: { type: Schema.Types.ObjectId, ref: "sponsorPartner" },
    participentId: [{ type: Schema.Types.ObjectId, ref: "userdeta " }],
  sponsorshipGuideLines: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
  sponsorshipName: { type: String,required:true  },
    type: { type: String,required:true,default:"sponsor",enum:["sponsor","affilate"] },
  sponsorshipPartnerName: { type: String },
  sponsorshipBannerImage: [{ type: String }],
  sponsorshipDesription: { type: String },
  sponsorshipTermsAndCondition: { type: String },
    seatreamining:{ type: Number,default:0 },
  sponsorshipLikeCount: { type: Number,default:0 },
  sponsorshipFavoriteCount: { type: Number,default:0 },
  sponsorshipCommentCount:  { type: Number,default:0 },
  sponsorshipShareCount: { type: Number,default:0  },
    likesponsor: [
      { type: Schema.Types.ObjectId, ref: "userdetail" },
  ],
sponsorshipFavorite: [
       { type: Schema.Types.ObjectId, ref: "userdetail" },
  ],
sponsorshipComment: [{
      userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
      comment:{ type: String },
      dateTime:{ type: Date },
  }],
  sharesponsor: [{
    sponsor: { type: Schema.Types.ObjectId, ref: "sponsor" },
     userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
      friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
  }],
  
    feadBacksponsor:[{
      reting: { type: Number, default: 0 },
      userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
      feadBackComment: { type: String }
    }],
    
   
    isActive: { type: Boolean, default: false },
   
    isDeleted: { type: Boolean, default: false },
   
    registrationStartDateTime: { type: Date },
    registrationEndDate: { type: Date },
  

  
  },
  {
    timestamps: true,
  }
);

export interface ISponsorship extends Document {
  organizerId: ObjectId,
  suborganizerId: [ObjectId],
sponsorshipFormId: [ObjectId],
sponsorshipPartnerId: ObjectId,
  participentId: [ObjectId],
sponsorshipGuideLines:ObjectId,
  category:ObjectId,
  SubCategory: ObjectId,
  subSubCategory: ObjectId,
sponsorshipName:String,
  type: String,
sponsorshipPartnerName: String,
sponsorshipBannerImage: [String],
sponsorshipDesription: String,
sponsorshipTermsAndCondition: String,
  seatreamining:Number,
sponsorshipLikeCount: Number,
sponsorshipFavoriteCount: Number,
sponsorshipCommentCount:  Number,
sponsorshipShareCount:Number,
  likesponsor: [
   ObjectId,
],
sponsorshipFavorite: [
    ObjectId,
],
sponsorshipComment: [{
    userId:ObjectId,
    comment:String,
    dateTime:Date,
}],
sharesponsor: [{
  sponsor: ObjectId,
   userId:ObjectId,
    friendId:ObjectId,
}],

  feadBacksponsor:[{
    reting: Number,
    userId:ObjectId,
    feadBackComment: String
  }],
  
 
  isActive: Boolean,
 
  isDeleted: Boolean,
 
  registrationStartDateTime: Date,
  registrationEndDate: Date,

}
// user

export default model<ISponsorship>("sponsorshipdetail",sponsorshipSchema);
