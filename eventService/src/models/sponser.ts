import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const sponsorshipSchema = new Schema(
  {
    organizerId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    suborganizerId: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
  sponsorshipFormId: [{ type: Schema.Types.ObjectId, ref: "eventform" }],
  sponsorshipPartnerId: [{ type: Schema.Types.ObjectId, ref: "eventPartner" }],
    participentId: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
  sponsorshipGuideLines: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
  sponsorshipName: { type: String,required:true  },
    type: { type: String,required:true,default:"event",enum:["event","affilate"] },
  sponsorshipPartnerName: { type: String },
  sponsorshipBannerImage: [{ type: String }],
  sponsorshipDesription: { type: String },
  sponsorshipTermsAndCondition: { type: String },
    seatreamining:{ type: Number,default:0 },
    noOfParticipentBook:{ type: Number,default:0 },
    noOfDaysOrginaize:{ type: Number,default:0 },
    placeTo: { type: String },
    destination: { type: String },
  sponsorshipLikeCount: { type: Number,default:0 },
  sponsorshipFavoriteCount: { type: Number,default:0 },
  sponsorshipCommentCount:  { type: Number,default:0 },
  sponsorshipShareCount: { type: Number,default:0  },
    likeEvent: [
      { type: Schema.Types.ObjectId, ref: "userdetail" },
  ],
sponsorshipFavorite: [
       { type: Schema.Types.ObjectId, ref: "userdetail" },
  ],
sponsorshipcomment: [{
      userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
      comment:{ type: String },
      dateTime:{ type: Date },
  }],
  shareEvent: [{
     Hashtag: { type: Schema.Types.ObjectId, ref: "event" },
     userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
      friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
  }],
    advancedEventMoney: Number,
    priceForParticipent: { type: Number, default: 0 },
    organizerTotalIncome: { type: Number, default: 0 },
    organizerIncomePerParticipent: { type: Number, default: 0 },
  sponsorshipTotalAmount: { type: Number, default: 0 },
    feadBackEvent:[{
      reting: { type: Number, default: 0 },
      userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
      feadBackComment: { type: String }
    }],
    totalParticipent: { type: Number, default: 0 },
    remainingSeat: { type: Number, default: 0 },
    isSeatfull: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isBookEventPaid: { type: Boolean, default: false },
    isOrganized: { type: Boolean, default: false },
    isAdvancedMoneyRefundable: { type: Boolean, default: false },
    isAdvancedMoneyRefundToOrganizer: { type: Boolean, default: false },
    isAdvancedMoneySubmited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isEventVerified: { type: Boolean, default: false },
    isCreateByOrganizer: { type: Boolean, default: false },
    AdvancedMoneyRefundableDateUpTo: { type: Date },
    registrationStartDateTime: { type: Date },
    registrationEndDate: { type: Date },
    affilateOrginaizeStartDateTime: { type: Date },
    affilateOrginaizeEndDateTime: { type: Date },
  sponsorshipStartDateTime: { type: Date },
  sponsorshipEndDateTime: { type: Date },
    bulkEntriesPrice: [{
      noOfparticipent: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    }]
  },
  {
    timestamps: true,
  }
);

export interface ISponsorship extends Document {
  organizerId:ObjectId,
  suborganizerId: [ObjectId],
sponsorshipFormId: [ObjectId],
sponsorshipPartnerId: [ObjectId],
  category: ObjectId,
  subCategory: ObjectId,
  subSubCategory: ObjectId,
  participentId: ObjectId,
sponsorshipGuideLines: ObjectId,
sponsorshipName: String,
 
  type:  String ,
sponsorshipPartnerName: String,
sponsorshipBannerImage: [String],
sponsorshipDesription: String,
sponsorshipTermsAndCondition: String,
  feadBackEvent:[{
    reting: Number,
    userId: ObjectId,
    feadBackComment: String
  }],
  likeEvent: [{
    userId: ObjectId,
}],
favouriteEvent: [{
    userId: ObjectId,
}],
eventcomment: [{
    userId: ObjectId,
    comment:String,
    dateTime:Date,
}],
shareEvent: [{
   userId: ObjectId,
    friendId: ObjectId,
}],
  placeTo: String,
  destination: String,
sponsorshipLikeCount: Number,
sponsorshipTotalAmount: Number,
sponsorshipFavoriteCount: Number,
sponsorshipCommentCount:  Number,
sponsorshipShareCount: String,
  advancedEventMoney: Number,
  priceForParticipent: Number,
  organizerTotalIncome: Number,
  organizerIncomePerParticipent: Number,
  totalParticipent: Number,
  noOfParticipentBook: Number,
  remainingSeat: Number,
  isSeatfull: Boolean,
  isActive: Boolean,
  isDeleted: Boolean,
  isBookEventPaid: Boolean,
  isEventVerified: Boolean
  isOrganized: Boolean,
  isCreateByOrganizer: Boolean,
  isAdvancedMoneyRefundToOrganizer: Boolean,
  isAdvancedMoneySubmited: Boolean,
  isAdvancedMoneyRefundable: Boolean,
  AdvancedMoneyRefundableDateUpTo: Date,
  affilateOrginaizeStartDateTime: Date,
  affilateOrginaizeEndDateTime: Date,
  registrationEndDate: Date,
  registrationStartDateTime: Date,
sponsorshipStartDateTime: Date,
sponsorshipEndDateTime: Date,
  bulkEntriesPrice: [{
    noOfparticipent: Number,
    price: Number
  }]
}
// user

export default model<ISponsorship>("sponsorship",sponsorshipSchema);
