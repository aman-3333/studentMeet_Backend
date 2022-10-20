import {Document, model, ObjectId, Schema } from "mongoose";

const instituteSchema = new Schema(
  {
    instituteName: { type: String, required: true },
    instituteCategory: { type: String},
    institute_subdomain: { type: String,default:"abc"},
    instituteAddress: { type: String},
    instituteEmail: { type: String },
    institutePhone: { type: String }, //required: true
    instituteWebsite: { type: String },
    instituteCountry: { type: String },
    instituteStateId: { type: Schema.Types.ObjectId },
    instituteCityId: { type: Schema.Types.ObjectId},
    instituteZipcode: { type: String },
    instituteLogo: { type: String },
    instituteshortName: { type: String },
    picture: [{ type: String }],
    isActive: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId,ref:"Users"},
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);
export interface IInstitute extends Document {
  instituteName: { type: String, required: true },
  instituteCategory: { type: String},
  instituteAddress: String,
  instituteEmail: String,
  institutePhone: String, //required: true
  instituteWebsite: String,
  institute_subdomain: String,
  instituteCountry: String,
  instituteStateId: ObjectId,
  instituteCityId: ObjectId,
  instituteZipcode: String,
  instituteLogo: String,
  instituteshortName: String,
  picture: [String],
  isActive: Boolean,
  ownerId: ObjectId,
  isDeleted: Boolean
}
// user



export default model<IInstitute>("institute", instituteSchema);
