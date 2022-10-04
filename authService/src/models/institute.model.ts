import { Document, model, Schema } from "mongoose";

const instituteSchema = new Schema(
  {
   
    institute_name: { type: String, required: true },
    institute_category: { type: String},
    institute_address: { type: String },
    institute_email: { type: String },
    institute_phone: { type: String }, //required: true
    institute_website: { type: String },
    institute_country: { type: String },
    institute_state: { type: String },
    institute_city: { type: String },
    institute_zipcode: { type: String },
    institute_logo: { type: String },
  
    institute_short_name: { type: String },
   isDeleted:{type:Boolean,default:false}
  },
  {
    timestamps: true,
  }
);
export interface IInstitute extends Document {
  institute_name: String,
  institute_category: String,
  institute_address: String,
  institute_email: String,
  institute_phone: String, //required: true
  institute_website: String,
  institute_country: String,
  institute_state: String,
  institute_city: String,
  institute_zipcode: String,
  institute_logo: String,

  institute_short_name: String,
 isDeleted:Boolean
}
// user



export default model<IInstitute>("institutes", instituteSchema);
