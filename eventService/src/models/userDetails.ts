import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";
import Jwt  from "jsonwebtoken";


 let sessionSecret='base64:Olvke97cjrcZg4ZYv2nlXxHTLNIs2XWFw9oVuH/OH5E=';
let  sessionExpiration=  60 * 60 * 24 * 365;
 let saltRounds= process.env.SALT_ROUNDS || 12;

const userSchema = new Schema(
  {
    fullName: { type: String,index:1,default:"" },
    userName:{type:String,unique:true,default:""},
    experienceMonth:{type:Number,default:0},
    experienceYear:{type:Number,default:0},
    isBankDetailComplete:{ type: Boolean, default: false },
    experties:{ type: String ,default:""},
    experience:{ type: String ,default:""},
    playFor:[{ type: String ,default:""}],
    stages:[{ type:Schema.Types.ObjectId,ref:"stages"}],
    profectionDomain:{type:Schema.Types.ObjectId,ref:"academyType"},
    profection:{type:Schema.Types.ObjectId,ref:"academySubType"},
    academy_id:{type:Schema.Types.ObjectId,ref:"academy"},
    institute: { type: Schema.Types.ObjectId, ref: "institute" },
    school: { type: Schema.Types.ObjectId, ref: "school" },
    sports:{ type: Schema.Types.ObjectId, ref: "sport" },
    about:{ type: String ,default:""},
    contact: { type: Number, trim: true,default:0 },
    country_code: { type: Number, trim: true,default:0 },
    whatsapp_contact: { type: Number, trim: true,default:0 },
    whatsapp_country_code: { type: Number, trim: true ,default:0},
    contact_verify: { type: Boolean, default: false },
    whatsapp_contact_verify: { type: Boolean, default: false },
    dob: { type: Date },
    gender: {
      type: String,
      defult: "Other",
      enum: ["Male", "Female", "Other"],
    },
    fulladdress: { type: String, trim: true },
    profile_picture: { type: String ,default:""},
    signature: { type: String ,default:""},
    isSubscribed: { type: Boolean, default: true },
    password_change: { type: Boolean, default: true },
    usertype: { type: String, default: "normel" },
    roleId:{type:Number,default:0},
    lastLoginDate: { type: Date },
    email_verify: { type: Boolean, default: false },
    isStarPerformer:{ type: Boolean, default: false },
    facebookID: { type: String ,default:""},
    googleID: { type: String ,default:""},
    otp: { type: String ,default:""},
    email: { type: String ,default:""},  
    password: { type: String},
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String ,default:""},
    verifyShortToken: { type: String ,default:""},
    verifyExpires: { type: Date },
    resetToken: { type: String ,default:""},
    resetShortToken: { type: String ,default:""},
    resetExpires: { type: Date },
    isProfilePublic:{ type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model ("userdetail", userSchema);
