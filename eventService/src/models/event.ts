import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const eventSchema = new Schema(
  {
    organizerId: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    eventFormId: { type: Schema.Types.ObjectId,ref:"FormId" },
    eventPartnerId: { type: Schema.Types.ObjectId, ref: "eventPartner" },
    participentId: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
    eventName: { type: String },
    eventImage: { type: String },
    eventDesription: { type: String },
    eventTermsAndCondition: { type: String },
    placeTo: { type: String },
    destination: { type: String },
    advancedEventMoney: { type: Number },
    priceForParticipent: { type: Number },
    organizerTotalIncome:{ type: Number },
    organizerIncomePerParticipent: { type: Number },
    totalParticipent: { type: Number },
    isActive: { type: Boolean, default: false },
    isBookEventPaid: { type: Boolean, default: false },
    isOrganized: { type: Boolean, default: false },
    isAdvancedMoneyRefundable : { type: Boolean, default: false },
    isAdvancedMoneyRefundToOrganizer : { type: Boolean, default: false },
    isAdvancedMoneySubmited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    AdvancedMoneyRefundableDateUpTo: { type: Date }, 
    registrationStartDateTime:{ type: Date }, 
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
  organizerId: ObjectId,
  eventFormId: ObjectId,
  eventPartnerId: ObjectId,
  category: ObjectId,
  subCategory: ObjectId,
  subSubCategory: ObjectId,
  participentId: ObjectId,
  eventName: String,
  eventImage: String,
  eventDesription: String,
  eventTermsAndCondition:String,
  placeTo: String,
  destination: String,
  advancedEventMoney: Number,
  priceForParticipent: Number,
  organizerTotalIncome:Number,
  organizerIncomePerParticipent:Number,
  totalParticipent: Number,
  isActive: Boolean,
  isDeleted: Boolean,
  isBookEventPaid: Boolean,
  isOrganized: Boolean,
  isAdvancedMoneyRefundToOrganizer : Boolean,
    isAdvancedMoneySubmited: Boolean,
 isAdvancedMoneyRefundable : Boolean,
  AdvancedMoneyRefundableDateUpTo:Date, 
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
