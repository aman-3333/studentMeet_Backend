import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const userSchema = new Schema(
  {
    facebookID: { type: String },
    googleID: { type: String },
    otp: { type: String },
    /////// Removed required and unique from email

    // email: { type: String, required: true, unique: true },

    userEmail: { type: String },
    ///// REmoved required from password

    password: { type: String },

    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date },
    verifyChanges: Schema.Types.Mixed,
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
      defult: "Male",
      enum: ["Female", "Other"],
    },
    parent_name: { type: String, trim: true },
    parent_contact: { type: Number, trim: true },
    fulladdress: { type: String, trim: true },
    about: { type: String, trim: true },
    profile_picture: { type: String },
    couponCollection: [{
      couponId: { type: Schema.Types.ObjectId },
      code: { type: String },
      assignBy: { type: Schema.Types.ObjectId },
    }],
    gcmid: { type: String },
    role: { type: String, default: "customer", enum: ['admin', 'vendor', 'customer', 'superAdmin'] },


    isSubscribed: { type: Boolean, default: true },
    video_user_id: { type: String },

    password_change: { type: Boolean, default: true },
    usertype: { type: String, default: "Other" },

    isDeleted: { type: Boolean, default: false },
    lastLoginDate: { type: Date },

    ///// Added unique and  required to username

    //username: { type: String},
    username: { type: String, },
    isBlacklist: { type: Boolean, default: false },
    parent_gender: { type: String },

    parent_country_code: { type: Number, trim: true }

  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  userEmail: String,
  googleID: String;
  fullname: string;
  firstname: string;
  lastname: string;
  couponCollection: [{
    couponId: ObjectId,
    code: String,
    assignBy: ObjectId
  }],
  contact: Number;
  country_code: Number;
  isVerified: Boolean;
  contact_verify: Boolean;
  isBlacklist: Boolean;
  otp: String;
  otpId: String;
  password: string;
  role: string;

  modified_on?: Date;
  token?: string;
  refreshToken?: string;
  institute: ObjectId;
  whatsapp_contact?: number;
  whatsapp_country_code?: Number;
  lastLoginDate?: Date;
  otherUserTypeName: string;
  username: string;

  isContactLogin: any;
  message: string
}
// user
//


export default model<IUser>("Users", userSchema);
