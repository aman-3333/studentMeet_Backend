import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const userSchema = new Schema(
  {
    facebookID: { type: String },
    googleID: { type: String },
    otp: { type: String },
    email: { type: String },
    password: { type: String},
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date },
    resetToken: { type: String },
    resetShortToken: { type: String },
    resetExpires: { type: Date },
    fullname: { type: String },
    contact: { type: Number, trim: true },
    country_code: { type: Number, trim: true,default:91 },
    whatsapp_contact: { type: Number, trim: true },
    whatsapp_country_code: { type: Number, trim: true },
    contact_verify: { type: Boolean, default: false },
    whatsapp_contact_verify: { type: Boolean, default: false },
    dob: { type: Date },
    gender: {
      type: String,
      defult: "Other",
      enum: ["Male", "Female", "Other"],
    },
    parent_name: { type: String, trim: true },
    parent_contact: { type: Number, trim: true },
    fulladdress: { type: String, trim: true },
    about: { type: String, trim: true },
    profile_picture: { type: String },
    gcmid: { type: String },
  
    activeRole: { type: Schema.Types.ObjectId, ref: "role" },
    ipAddress:{ type: String },
    modelName:{ type: String },
    manufacturer:{ type: String },
    maxMemorybigint:{ type: Number, trim: true },
    freeMemory:{ type: Number, trim: true },
    osVersion:{ type: Number, trim: true },
    networkCarrier:{ type: String },
    dimension:{ type: String },
    institute: { type: Schema.Types.ObjectId, ref: "institute" },
    isSubscribed: { type: Boolean, default: true },
    video_user_id: { type: String },
    admission_no: { type: String },
    password_change: { type: Boolean, default: true },
    usertype: { type: String, default: "Other" },
    otherUserTypeName: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    lastLoginDate: { type: Date },
    email_verify: { type: Boolean, default: false },
  isStarPerformer:{ type: Boolean, default: false },
    

    parent_gender: { type: String },
    parent_email: { type: String },
    parent_country_code: { type: Number, trim: true }
   
  },
  {
    timestamps: true,
  }
);




export default model ("userdetail", userSchema);
