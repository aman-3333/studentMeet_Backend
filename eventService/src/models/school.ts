import {Document, model, ObjectId, Schema } from "mongoose";

const schoolSchema = new Schema(
  {
    schoolName: { type: String, required: true },
    schoolAddress: { type: String},
    schoolEmail: { type: String },
    schoolPhone: { type: String }, //required: true
    schoolWebsite: { type: String },
    schoolCountry: { type: String },
    schoolStateId: { type: Schema.Types.ObjectId },
    schoolCityId: { type: Schema.Types.ObjectId},
    schoolZipcode: { type: String },
    schoolLogo: { type: String },
    schoolshortName: { type: String },
    picture: [{ type: String }],
    isActive: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId,ref:"Users"},
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);
export interface ISchool extends Document {
  schoolName: { type: String, required: true },
  schoolCategory: { type: String},
  schoolAddress: String,
  schoolEmail: String,
  schoolPhone: String, //required: true
  schoolWebsite: String,
  school_subdomain: String,
  schoolCountry: String,
  schoolStateId: ObjectId,
  schoolCityId: ObjectId,
  schoolZipcode: String,
  schoolLogo: String,
  schoolshortName: String,
  picture: [String],
  isActive: Boolean,
  ownerId: ObjectId,
  isDeleted: Boolean
}
// user



export default model<ISchool>("school", schoolSchema);
