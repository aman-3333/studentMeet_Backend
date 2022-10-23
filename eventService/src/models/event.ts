import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const eventSchema = new Schema(
  {
    organizerId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    suborganizerId: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    eventFormId: [{ type: Schema.Types.ObjectId, ref: "FormId" }],
    eventPartnerId: [{ type: Schema.Types.ObjectId, ref: "eventPartner" }],
    participentId: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    eventGuideLines: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
    eventName: { type: String },
    eventPartnerName: { type: String },
    eventBannerImage: [{ type: String }],
    eventDesription: { type: String },
    eventTermsAndCondition: { type: String },
    seatreamining:{ type: Number },
    placeTo: { type: String },
    destination: { type: String },
    eventLikeCount: { type: Number,default:0 },
    eventFavoriteCount: { type: Number,default:0 },
    eventCommentCount:  { type: Number,default:0 },
    eventShareCount: { type: Number,default:0  },
    likeEvent: [
      { type: Schema.Types.ObjectId, ref: "userDetails" },
  ],
  eventFavorite: [
       { type: Schema.Types.ObjectId, ref: "userDetails" },
  ],
  commentEvent: [{
      userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
      commentMessage:{ type: String },
      dateTime:{ type: Date },
  }],
  shareEvent: [{
     Hashtag: { type: Schema.Types.ObjectId, ref: "event" },
     userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
      friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
  }],
    advancedEventMoney: { type: Number },
    priceForParticipent: { type: Number },
    organizerTotalIncome: { type: Number },
    organizerIncomePerParticipent: { type: Number },
    eventTotalAmount: { type: Number },
    totalParticipent: { type: Number },
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
    eventStartDateTime: { type: Date },
    eventEndDateTime: { type: Date },
    bulkEntriesPrice: [{
      noOfparticipent: { type: Number },
      price: { type: Number }
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
  eventPartnerName: String,
  eventBannerImage: [String],
  eventDesription: String,
  eventTermsAndCondition: String,
  likeEvent: [{
    userId: ObjectId,
}],
favouriteEvent: [{
    userId: ObjectId,
}],
commentEvent: [{
    userId: ObjectId,
    commentMessage:String,
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
