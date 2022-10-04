import {Document, model, Schema} from "mongoose";

const instituteSchema = new Schema(
  {
    institute_subdomain: { type: String, unique: true },
    institute_name: { type: String, required: true },
    institute_category: { type: String, required: true },
    institute_locality: { type: String },
    institute_address: { type: String },
    institute_email: { type: String },
    institute_phone: { type: String }, //required: true
    institute_website: { type: String },
    institute_country: { type: String },
    institute_state: { type: String },
    institute_city: { type: String },
    institute_zipcode: { type: String },
    institute_logo: { type: String },
    institute_about: { type: String },
    institute_mission: { type: String },
    institute_owner_name: { type: String },
    institute_owner_designation: { type: String },
    institute_owner_profile_photo: { type: String },
    institute_owner_message: { type: String },
    institute_featured_banner: { type: String },
    institute_featured_headline: { type: String },
    institute_short_description: { type: String },
    totallike: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export default model("institutes", instituteSchema);
