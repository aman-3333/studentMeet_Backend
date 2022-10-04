import { Document, model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    //here role is userType from User . So it's not role assign its a userType..
    role: {
      type: String,
      default: "Other",
      enum: ["InstituteOwner", "Student", "Teacher", "Other"],
    },
    otherUserTypeName: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    like: [{ type: Schema.Types.ObjectId, ref: "user" }],
    follower: [{ type: Schema.Types.ObjectId, ref: "user" }],
    following: [{ type: Schema.Types.ObjectId, ref: "user" }],
    username: { type: String, required: true, unique: true },
    public_profile_picture: { type: String, default: null },
    public_profile_banner: { type: String, default: null },
    short_intro: { type: String, default: null },
    website: { type: String, default: null },
    facebook: { type: String, default: null },
    linkedin: { type: String, default: null },
    instagram: { type: String, default: null },
    twitter: { type: String, default: null },
    youtube: { type: String, default: null },
    level_taught: { type: String, default: null },
    teaching_mode: { type: String, default: null },
    taught_subject: { type: String, default: null },
    skills: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model("publicprofile", schema);
