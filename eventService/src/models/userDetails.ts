import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";
import Jwt  from "jsonwebtoken";


 let sessionSecret='base64:Olvke97cjrcZg4ZYv2nlXxHTLNIs2XWFw9oVuH/OH5E=';
let  sessionExpiration=  60 * 60 * 24 * 365;
 let saltRounds= process.env.SALT_ROUNDS || 12;

const userSchema = new Schema(
  {
    fullname: { type: String,index:1 },
    user_name:{type:String,unique:true},
    achievement_id:{type:Schema.Types.ObjectId,ref:"achievement"},
    academy_id:{type:Schema.Types.ObjectId,ref:"achievement"},
    bank_details:{type:Schema.Types.ObjectId,ref:"achievement"},
    
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
    fulladdress: { type: String, trim: true },
    profile_picture: { type: String },
    signature: { type: String },
    institute: { type: Schema.Types.ObjectId, ref: "institute" },
    isSubscribed: { type: Boolean, default: true },
    password_change: { type: Boolean, default: true },
    usertype: { type: String, default: "normel" },
    roleId:{type:Number,default:0},
    lastLoginDate: { type: Date },
    email_verify: { type: Boolean, default: false },
    isStarPerformer:{ type: Boolean, default: false },
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
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model ("userdetail", userSchema);
