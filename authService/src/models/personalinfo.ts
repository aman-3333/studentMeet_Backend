import { Document, model, Schema } from "mongoose";

const schema = new Schema(
  {
    about: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    current_employer: { type: String, default: null },
    experience: { type: String, default: null },
    location_country: { type: String, default: null },
    location_city: { type: String, default: null },
    profile: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "publicprofile",
    },
    experiences: [
      {
        experience_from: { type: String },
        experience_to: { type: String },
        experience_in: { type: String },
        school: { type: String },
        about_ex: { type: String },
        isworking: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    awards: [
      {
        award_date: { type: String },
        award_name: { type: String },
        award_by: { type: String },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    professional_affiliations: [
      {
        affiliation_date: { type: String },
        affiliation_name: { type: String },
        affiliation_about: { type: String },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    education: [
      {
        education_from: { type: String },
        education_to: { type: String },
        education_name: { type: String },
        education_organisation: { type: String },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    certificates: [
      {
        certificate_from: { type: String },
        certificate_to: { type: String },
        certificate_name: { type: String },
        certificate_by: { type: String },
        certificate_about: { type: String },
        notExpire: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    interests_hobbies: [
      { name: { type: String }, isDeleted: { type: Boolean, default: false } },
    ],
    languages: [
      {
        language_name: { type: String },
        language_expertise: {
          type: String,

          enum: ["Beginner", "Proficient", "Expert"],
        },
        language_read: { type: String, default: null, enum: ["Read", null] },
        language_write: { type: String, default: null, enum: ["Write", null] },
        language_speak: { type: String, default: null, enum: ["Speak", null] },
        isDeleted: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("personalinfo", schema);
