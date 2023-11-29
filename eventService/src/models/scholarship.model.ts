import {Document, model, ObjectId, Schema } from "mongoose";

const schoolSchema = new Schema(
  {
    schoolId:{ type: Schema.Types.ObjectId,ref:"schools" },
    name: { type: String, required: true },
    description: { type: String},
    deadline: { type: Date },
    award_amount: { type: Number },
    criteria: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);


export interface IScholarship extends Document {
    schoolId:ObjectId,
    name: String,
    description: String,
    deadline: Date,
    award_amount: Number,
    criteria: String,
    isActive: Boolean,
    isDeleted: Boolean
}




export default model<IScholarship>("school_scholarship", schoolSchema);
