import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const eventSchema = new Schema(
  {
    organizerId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    suborganizerId: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    eventFormId: [{ type: Schema.Types.ObjectId, ref: "eventform" }],
    eventPartnerId: [{ type: Schema.Types.ObjectId, ref: "eventPartner" }],
    participentId: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    eventGuideLines: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
    eventName: { type: String,required:true  },
    type: { type: String,required:true,default:"event",enum:["event","affilate"] },
    eventPartnerName: { type: String },
    eventBannerImage: [{ type: String }],
    eventDesription: { type: String },
    eventTermsAndCondition: { type: String },
    seatreamining:{ type: Number,default:0 },
    noOfParticipentBook:{ type: Number,default:0 },
    noOfDaysOrginaize:{ type: Number,default:0 },
    placeTo: { type: String },
    destination: { type: String },
    eventLikeCount: { type: Number,default:0 },
    eventFavoriteCount: { type: Number,default:0 },
    eventCommentCount:  { type: Number,default:0 },
    eventShareCount: { type: Number,default:0  },
    likeEvent: [
      { type: Schema.Types.ObjectId, ref: "userdetail" },
  ],
  eventFavorite: [
       { type: Schema.Types.ObjectId, ref: "userdetail" },
  ],
  eventcomment: [{
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
    eventTotalAmount: { type: Number, default: 0 },
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
    eventStartDateTime: { type: Date },
    eventEndDateTime: { type: Date },
    bulkEntriesPrice: [{
      noOfparticipent: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    }]
  },
  {
    timestamps: true,
  }
);

export interface IEvent extends Document {
  organizerId:ObjectId,
  suborganizerId: [ObjectId],
  eventFormId: [ObjectId],
  eventPartnerId: [ObjectId],
  category: ObjectId,
  subCategory: ObjectId,
  subSubCategory: ObjectId,
  participentId: ObjectId,
  eventGuideLines: ObjectId,
  eventName: String,
 
  type:  String ,
  eventPartnerName: String,
  eventBannerImage: [String],
  eventDesription: String,
  eventTermsAndCondition: String,
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
  eventLikeCount: Number,
  eventTotalAmount: Number,
  eventFavoriteCount: Number,
  eventCommentCount:  Number,
  eventShareCount: String,
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
  eventStartDateTime: Date,
  eventEndDateTime: Date,
  bulkEntriesPrice: [{
    noOfparticipent: Number,
    price: Number
  }]
}
// user

export default model<IEvent>("event", eventSchema);
