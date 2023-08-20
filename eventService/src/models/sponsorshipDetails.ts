import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const sponsorshipSchema = new Schema(
  {  
    
  sponsorshipPartnerId: { type: Schema.Types.ObjectId, ref: "sponsorPartner" },
  sponsorshipRepresentativeId: { type: Schema.Types.ObjectId, ref: "sponsorPartner" },
    participentId: [{ type: Schema.Types.ObjectId, ref: "userdetails" }],
  sponsorshipGuideLines: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
  sponsorshipName: { type: String,required:true  },
  sponsorshipBannerImage: [{ type: String }],
  sponsorshipProfileImage: { type: String },
  sponsorshipDesription: { type: String },
  sponsorshipTermsAndCondition: { type: String },
    seatreamining:{ type: Number,default:0 },
  sponsorshipLikeCount: { type: Number,default:0 },
  sponsorshipFavoriteCount: { type: Number,default:0 },
  sponsorshipCommentCount:  { type: Number,default:0 },
  sponsorshipShareCount: { type: Number,default:0  },
    likesponsor: [
      { type: Schema.Types.ObjectId, ref: "userdetails" },
  ],
sponsorshipFavorite: [
       { type: Schema.Types.ObjectId, ref: "userdetails" },
  ],
sponsorshipComment: [{
      userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
      comment:{ type: String },
      dateTime:{ type: Date },
  }],
  sharesponsor: [{
    sponsor: { type: Schema.Types.ObjectId, ref: "sponsor" },
     userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
      friendId: { type: Schema.Types.ObjectId, ref: "userdetails" },
  }],
  
    feadBacksponsor:[{
      reting: { type: Number, default: 0 },
      userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
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
  sponsorshipPartnerId: ObjectId,
  sponsorshipRepresentativeId: ObjectId,
    participentId: [ObjectId],
  sponsorshipGuideLines: ObjectId,
    category: ObjectId,
    SubCategory: ObjectId,
    subSubCategory: ObjectId,
  sponsorshipName: String,
  sponsorshipBannerImage: [String],
  sponsorshipProfileImage: String,
  sponsorshipDesription: String,
  sponsorshipTermsAndCondition: String,
    seatreamining:Number,
  sponsorshipLikeCount: Number,
  sponsorshipFavoriteCount: Number,
  sponsorshipCommentCount:  Number,
  sponsorshipShareCount: Number,
    likesponsor: [
      ObjectId,
  ],
sponsorshipFavorite: [
       ObjectId,
  ],
sponsorshipComment: [{
      userId: ObjectId,
      comment:String,
      dateTime:Date,
  }],
  sharesponsor: [{
    sponsorship: ObjectId,
     userId: ObjectId,
      friendId: ObjectId,
  }],
  
    feadBacksponsor:[{
      reting: Number,
      userId: ObjectId,
      feadBackComment: String
    }],
    
   
    isActive: Boolean,
   
    isDeleted: Boolean,
   
    registrationStartDateTime: Date,
    registrationEndDate: Date
 

}
// user

export default model<ISponsorship>("sponsorshipdetail",sponsorshipSchema);
