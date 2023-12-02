import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema(
  {
    amount: { type: Number },
    ownerId: { type: Schema.Types.ObjectId, ref: "userdetails" },
    senderId: { type: Schema.Types.ObjectId, ref: "userdetails" },
    orderId: { type: String },
    postId: { type: Schema.Types.ObjectId, ref: "posts" },
    achivemntId: { type: Schema.Types.ObjectId, ref: "achivements" },
    type: { type: String },
    paymentId: { type: String },
    status: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IServicePurchase extends Document {
    amount: Number,
    ownerId: ObjectId,
    senderId: ObjectId,
    paymentId: String,
    status: String,
    isDeleted: Boolean,
}

export default model<IServicePurchase>("service_purchase", schema);
