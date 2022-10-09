import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const userSchema = new Schema(
  {
    facebookID: { type: String },
    googleID: { type: String },
    otp: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date },
    resetToken: { type: String },
    resetShortToken: { type: String },
    resetExpires: { type: Date },
    fullname: { type: String },
    contact: { type: Number, trim: true },
    country_code: { type: Number, trim: true },
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
  
    username: { type: String, required: true, unique: true, trim: true },

    parent_gender: { type: String },
    parent_email: { type: String },
    parent_country_code: { type: Number, trim: true }
   
  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  email: string;
  googleID: String;
  fullname: string;
  firstname: string;
  lastname: string;
  contact: Number;
  country_code: Number;
  isVerified: Boolean;
  contact_verify: Boolean;
  otp: String;
  otpId: String;
  password: string;
  role: string;
  institute: ObjectId;
  modified_on?: Date;
  token?: string;
  refreshToken?: string;
  userRoles?: string[];
  whatsapp_contact?: number;
  whatsapp_country_code?: Number;
  lastLoginDate?: Date;
  otherUserTypeName: string;
  username: string;
  institute_domain: any;
  isContactLogin: any;
  message: string;
  activeRole:ObjectId;
  _id:ObjectId;
  user_role:any
}
// user

export default model<IUser>("Users", userSchema);
