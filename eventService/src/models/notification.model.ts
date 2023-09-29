import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema(
  {
   
    recipientUserId: { type: Schema.Types.ObjectId, ref: "userDetail" },
    senderUserId: { type: Schema.Types.ObjectId, ref: "userDetail" },
    notificationType: { type: String },
    content: { type: String },
    read: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);





export interface INotification extends Document {
    recipientUserId: ObjectId,
    senderUserId: ObjectId,
    notificationType: String,
    content: String,
    read: Boolean,
    isDeleted: Boolean,
}

export default model<INotification>("notification", schema);
