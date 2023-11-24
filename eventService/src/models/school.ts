import {Document, model, ObjectId, Schema } from "mongoose";

const schoolSchema = new Schema(
  {
    schoolOwnerId:{ type: Schema.Types.ObjectId,ref:"school_owners" },
    schoolName: { type: String, required: true },
    address: { type: String},
    email: { type: String },
    contact: [String], 
    website: { type: String },
    country: { type: Schema.Types.ObjectId, ref: "countries" },
    city: { type: Schema.Types.ObjectId, ref: "cities" },
    state: { type: Schema.Types.ObjectId, ref: "States" },
    zipcode: { type: String },
    profilePicture: { type: String },
    bannerImage: [{ type: String }],
    shortschoolName: { type: String },
    schoolType: { type: String },
    schoolAssociateWith: { type: String },
    isActive: { type: Boolean, default: true },

    faculty: [{ type: Schema.Types.ObjectId,ref:"userdetails"}],
    isRegistrationOn: { type: Boolean, default: false },
    registrationLastDate: { type: Date },
    advancedRegistrationAmount: { type: Number, default: 0 },
    advancedRegistrationUser: [{ 
   userId:  { type: Schema.Types.ObjectId,ref:"userdetails"},
   registrationDateTime: { type: Date},
   amount: { type: Number, default: 0 },
   payment_id: { type: String },
   order_id: { type: String },
    }],

    infrastructure:[{
      type:{ type: String },
description: { type: String },
picture:[{ type: String }],
facility: { type: String },
    }],

    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere' }
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    followersCount: { type: Number, default: 0 },
    schoolLikeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    schoolCommentCount: { type: Number, default: 0 },
    schoolFavouriteCount: { type: Number, default: 0 },
    schoolLike: [
      {
        type: Schema.Types.ObjectId,
        ref: "userdetails",
      },
    ],
    schoolFavourite: [
      {
        type: Schema.Types.ObjectId,
        ref: "userdetails",
      },
    ],
    schoolComment: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        comment: { type: String },
        dateTime: { type: Date },
      },
    ],
    sharePost: [
      {
        school: { type: Schema.Types.ObjectId, ref: "posts" },
        userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        dateTime: { type: Date },
      },
    ],
    isVerify: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);
export interface ISchool extends Document {
  schoolName: String,
  address: String,
  email: String,
  contact: [String], //required: true
  website: String,
  zipcode:String,
  profilePicture: String,
  bannerImage: [String],
  shortschoolName: String,
  schoolType: String,
  schoolAssociateWith: String,
  schoolOwnerId:ObjectId,
  state :ObjectId,
  city :ObjectId,
  country: ObjectId,
  faculty: [ObjectId],
  followers: [ObjectId],
  infrastructure:[{
    type:String,
description: String,
picture:[String],
facility: String,
  }],
  followersCount: Number,
  schoolLikeCount: Number,
  shareCount: Number,
  schoolCommentCount: Number,
  schoolFavouriteCount: Number,
  lat: String,
  long: String,
  schoolLike: [
    ObjectId,
  ],
  schoolFavourite: [
    ObjectId,
  ],
  schoolComment: [
    {
      userId: ObjectId,
      comment: String,
      dateTime: Date,
    },
  ],
  sharePost: [
    {
      school: ObjectId,
      userId: ObjectId,
      friendId: ObjectId,
      dateTime: Date,
    },
  ],
  isActive: Boolean,
  isVerify: Boolean,
  isDeleted: Boolean,

  isRegistrationOn: Boolean,
  registrationLastDate: Date,
  advancedRegistrationAmount: Number,
  advancedRegistrationUser: [{ 
 userId:  ObjectId,
 registrationDateTime: Date,
 amount: Number,
 payment_id: String,
 order_id:String
  }],
}
// user



export default model<ISchool>("school", schoolSchema);
