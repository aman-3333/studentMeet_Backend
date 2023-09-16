import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
  sponsorOwnerId:{
        type:Schema.Types.ObjectId,
        ref:"Sponsor_partner"
      },
        fullName: {
          type: String,
          trim: true,
        },
        last_name: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          unique: true,
          trim: true,
          lowercase: true,
         
        },
        userType: {
          type: String,
          
        },
        is_email_verified: {
          type: Boolean,
          default: false,
        },
      password:{
        type: String,
      },
        country_code: {
          type: String,
        },
        contact: {
          type: Number,
        },
        designation: {
            type: String,
            trim: true,
          },

        profile_image:{
    type:String,
    
       },
       
        last_active_at: {
          type: Date,
        },
    isDeleted: { type: Boolean, default: false }

}, {
    timestamps: true
});

export interface ISponsorRepresentative extends Document {
  sponsorOwnerId:ObjectId,
    fullName: String,
    userType:String,
    email: String,
    is_email_verified: Boolean,
    country_code: String,
    password: String,
    contact: Number,
    designation:String,
    profile_image:String,
    last_active_at: Date,
    isDeleted: Boolean
}
// user

export default model<ISponsorRepresentative>("sponsor_representative", schema);
