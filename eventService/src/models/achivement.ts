import { Document, model, Schema } from "mongoose";
import { ObjectId } from "bson";

const AchivementSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "userdetails" },
    academyId: { type: Schema.Types.ObjectId, ref: "academy" },
    achievements: { type: String },
    picture: [{ type: String }],
    location: { type: String },
    academyUserId: [{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    city: { type: Schema.Types.ObjectId, ref: "cities" },
    state: { type: Schema.Types.ObjectId, ref: "states" },
    country: { type: Schema.Types.ObjectId, ref: "countries" },
    tournament: { type: String },
    tournament_match: { type: String },
    dateTime: { type: Date },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export interface IAchivement extends Document {
  user_id: ObjectId;
  academyId: ObjectId;
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
}

export default model<IAchivement>("achivement", AchivementSchema);
