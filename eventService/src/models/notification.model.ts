import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "userDetail" },
    notificationType: { type: String },
    content: { type: String },
    read: { type: Boolean, default: false },
    redirectionScreen: { type: String },
    is_publish: { type: Boolean, default: false },
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
    redirectionScreen: String,
    read: Boolean,
    is_publish:Boolean,
    isDeleted: Boolean,
}

export default model<INotification>("notification", schema);
