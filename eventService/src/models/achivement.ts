import { Document, model, Schema } from "mongoose";
import { ObjectId } from "bson";

const AchivementSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "userdetails" },
    academyId: { type: Schema.Types.ObjectId, ref: "academies" },
    schoolId: { type: Schema.Types.ObjectId, ref: "schools" },
    achievements: { type: String },
    picture: [{ type: String }],
    location: { type: String },
    academyUserId: [{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    city: { type: Schema.Types.ObjectId, ref: "cities" },
    state: { type: Schema.Types.ObjectId, ref: "states" },
    country: { type: Schema.Types.ObjectId, ref: "countries" },
    lat:{type:String},
    long:{type:String},
    tournament: { type: String },
    tournament_match: { type: String },
    dateTime: { type: Date },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    achivementLikeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    achivementCommentCount: { type: Number, default: 0 },
    achivementFavouriteCount: { type: Number, default: 0 },
    achivementLike: [
      {
        type: Schema.Types.ObjectId,
        ref: "userdetails",
      },
    ],
    achivementFavourite: [
      {
        type: Schema.Types.ObjectId,
        ref: "userdetails",
      },
    ],
    achivementComment: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        comment: { type: String },
        dateTime: { type: Date },
      },
    ],
    shareAchivement: [
      {
        achivement: { type: Schema.Types.ObjectId, ref: "posts" },
        userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        dateTime: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

export interface IAchivement extends Document {
  user_id: ObjectId;
  academyId: ObjectId;
  schoolId: ObjectId;
  achievements: String;
  picture: [String];
  description: String;
  location: String;
  academyUserId: [ObjectId];
  city: ObjectId;
  state: ObjectId;
  country: ObjectId;
  tournament: String;
  dateTime: Date;
  tournament_match: String;
  isActive: Boolean;
  isBlocked: Boolean;
  isDeleted: Boolean;
  achivementLikeCount: Number,
  shareCount: Number,
  achivementCommentCount: Number,
  achivementFavouriteCount: Number,
  achivementLike: [
    ObjectId,
  ],
  achivementFavourite: [
    ObjectId,
  ],
  achivementComment: [
    {
      userId: ObjectId,
      comment: { type: String },
      dateTime: { type: Date },
    },
  ],
  shareAchivement: [
    {
      achivement: ObjectId,
      userId: ObjectId,
      friendId: ObjectId,
      dateTime: { type: Date },
    },
  ],
}

export default model<IAchivement>("achivement", AchivementSchema);
