import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema(
  {
    amount: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: "userDetail" },
    donerId: { type: Schema.Types.ObjectId, ref: "userDetail" },
    postId: { type: Schema.Types.ObjectId, ref: "post" },
    paymentId: { type: String },
    status: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IMoneyDonation extends Document {
    amount: Number,
    userId: ObjectId,
    donerId: ObjectId,
    paymentId: String,
    status: String,
    isDeleted: Boolean,
}

export default model<IMoneyDonation>("moneyDonation", schema);
