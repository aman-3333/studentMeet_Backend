import { Document, model, Schema } from "mongoose";

const schema = new Schema(
  {
    primary_email: {
      email: { type: String },
      visibility: {
        type: String,
        default: "Private",
        enum: ["Public", "Private"],
      },
    },

    primary_contact: {
      contact: { type: Number, trim: true },
      visibility: {
        type: String,
        default: "Private",
        enum: ["Public", "Private"],
      },
    },

    primary_address: [
      {
        address: { type: String },
        visibility: {
          type: String,
          default: "Private",
          enum: ["Public", "Private"],
        },
        isDeleted: { type: Boolean, default: false },
      },
    ],

    secondary_email: {
      email: { type: String },
      visibility: {
        type: String,
        enum: ["Public", "Private"],
      },
    },

    secondary_contact: {
      contact: { type: Number, trim: true },
      visibility: {
        type: String,
        enum: ["Public", "Private"],
      },
    },

    work_address: [
      {
        address: { type: String },
        visibility: {
          type: String,
          default: "Public",
          enum: ["Public", "Private"],
        },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    profile: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "publicprofile",
    },
  },
  {
    timestamps: true,
  }
);

export default model("publiccontact", schema);
