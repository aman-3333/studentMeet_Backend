import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema(
  {
    starPerformerId: { type: Schema.Types.ObjectId, ref: "userdetails" },
    schoolId: { type: Schema.Types.ObjectId, ref: "schools" },
    performance_type: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IPerformer extends Document {
  starPerformerId: ObjectId;
  schoolId: ObjectId;
  performance_type: String;
  description: String;
  isActive: Boolean;
  isblueTick: Boolean;
  isDeleted: Boolean;
}

export default model<IPerformer>("starperformer", schema);
